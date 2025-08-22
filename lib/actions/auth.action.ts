"user server";

import { AuthCredentials } from "@/types/action";
import { ActionResponse, ErrorResponse } from "@/types/global";

import { RegisterSchema } from "@/lib/validation";
import User from "@/database/user.model";
import Account from "@/database/account.model";

import action from "../handlers/action";
import { signIn } from "@/auth";
import handleError from "../handlers/error";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export async function registerWithCredentials(params: AuthCredentials): Promise<ActionResponse> {
    const validResult = await action({ params, schema: RegisterSchema }) // Validate the input parameters against the schema
    console.log(validResult)
    if (validResult instanceof Error) return handleError(validResult) as ErrorResponse; // If validation fails, handle the error and return an ErrorResponse

    const { name, username, email, password } = validResult.params!; // Destructure the valid result (not used here, but can be used for further processing)

    const session = await mongoose.startSession(); // Start a new MongoDB session for the transaction
    console.log(session)
    session.startTransaction(); // Begin the transaction

    try {
        const existingUser = await User.findOne({ email }).session(session); // Check if a user with the provided email already exists
        if (existingUser) throw new Error("User with this email already exists"); // If a user exists, throw an error

        const existingUsername = await User.findOne({ username }).session(session); // Check if a user with the provided username already exists
        if (existingUsername) throw new Error("Username already exists"); // If a username exists, throw an error

        const hashedPassword = await bcrypt.hash(password, 12); // Hash the password using bcrypt with a salt rounds of 10

        const [newUser] = await User.create([{ username, name, email }], { session }); // Create a new user in the database
        if (!newUser) throw new Error("Failed to create user"); // If user creation fails, throw an error

        await Account.create([{ // Create a new account associated with the user
            userId: newUser._id,
            name,
            provider: "credentials",
            providerAccountId: email,
            password: hashedPassword,
        }], { session }); // If account creation fails, throw an error

        await session.commitTransaction(); // Commit the transaction if everything is successful

        await signIn("credentials", { email, password, redirect: false }); // Sign in the user using the credentials provider

        return { success: true }; // If everything is successful, return a success response
    } catch (error) {
        await session.abortTransaction(); // If an error occurs, abort the transaction
        return handleError(error) as ErrorResponse; // Handle the error and return an ErrorResponse
    } finally {
        await session.endSession(); // End the session regardless of success or failure
    }
}