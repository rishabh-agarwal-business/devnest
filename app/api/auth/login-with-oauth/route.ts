import Account from "@/database/account.model";
import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/httpErrors";
import dbConnect from "@/lib/mongoose";
import { LoginOAuthSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(request: Request) { // Handles POST requests for OAuth login
    const { provider, providerAccountId, user } = await request.json(); // Extracts provider, account ID, and user from the request body

    await dbConnect(); // Connects to the database

    const session = await mongoose.startSession(); // Starts a new Mongoose session
    session.startTransaction(); // Begins a transaction for the session

    try {
        const validatedData = LoginOAuthSchema.safeParse({
            provider,
            providerAccountId,
            user,
        }); // Validates the incoming data against the LoginOAuthSchema

        if (!validatedData.success) { // Checks if the validation failed
            throw new ValidationError(validatedData.error.flatten().fieldErrors); // Throws a ValidationError if validation fails
        }

        const { name, username, email, image } = user; // Destructures user data

        const slugifyUsername = slugify(username, {
            lower: true,
            strict: true,
            trim: true,
        }); //  Generates a slug from the username

        let existingUser = await User.findOne({ email }).session(session); // Checks if a user with the same email already exists

        if (!existingUser) {
            [existingUser] = await User.create(
                [{ name, username: slugifyUsername, email, image }], // Creates a new user if no existing user is found
                { session } // Creates a new user if no existing user is found
            );
        } else {
            const updatedData: { name?: string; image?: string } = {};

            if (existingUser.name !== name) updatedData.name = name; // Updates the user's name if it has changed
            if (existingUser.image !== image) updatedData.image = image; // Updates the user's image if it has changed

            if (Object.keys(updatedData).length > 0) { // Checks if there are any fields to update
                await User.updateOne({ _id: existingUser._id }, // Updates the existing user's data if there are changes
                    { $set: updatedData }).session(session); // Sets the updated fields
            }
        }

        const existingAccount = await Account.findOne({ // Checks if an account with the same provider and providerAccountId already exists
            userId: existingUser._id,
            provider,
            providerAccountId,
        }).session(session); // Uses the session for the query

        if (!existingAccount) { // Checks if no existing account is found
            await Account.create([ // Creates a new account if no existing account is found 
                {
                    userId: existingUser._id,
                    name,
                    image,
                    provider,
                    providerAccountId,
                },
            ], { session }); // Creates a new account with the user's ID, name, image, provider, and providerAccountId
        }
        await session.commitTransaction(); // Commits the transaction if everything is successful
        return NextResponse.json({ success: true, message: 'Login successful' }); // Returns a success response if the login is successful
    } catch (error: unknown) {
        await session.abortTransaction(); // Aborts the transaction if an error occurs
        return handleError(error, 'api') as APIErrorResponse; // Handles the error and returns an API error response
    } finally { // Ensures cleanup after the try-catch block
        session.endSession(); // Ends the session
    }
}