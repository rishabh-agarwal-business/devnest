import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/httpErrors";
import { UserSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

/**
 * POST /api/users/email
 * Fetch a user by email
 * @param {Request} request - The request object containing the email in the body
 * @returns {NextResponse} - JSON response with user data or error
 */
export async function POST(request: Request) {
    const { email } = await request.json(); // Get the email from the request body

    try {
        const validData = UserSchema.partial().safeParse({ email }); // Validate the email

        // If the validation fails, throw a ValidationError
        if (!validData.success) throw new ValidationError(validData.error.flatten().fieldErrors);

        // If validation passes, return the email
        const user = await User.findOne({ email }); // Find a user with the given email

        if (!user) throw new NotFoundError("User"); // If no user found, throw an error

        // If user is found, return the user data
        return NextResponse.json({
            success: true,
            data: user, // Return the user
        }, { status: 200 });
    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}