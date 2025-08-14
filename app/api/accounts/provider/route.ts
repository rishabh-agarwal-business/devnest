import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/httpErrors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

/**
 * POST /api/accounts/provider
 * Fetch a account by provider
 * @param {Request} request - The request object containing the provider in the body
 * @returns {NextResponse} - JSON response with account data or error
 */
export async function POST(request: Request) {
    const { providerAccountId } = await request.json(); // Get the providerAccountId from the request body

    try {
        await dbConnect();
        const validData = AccountSchema.partial().safeParse({ providerAccountId }); // Validate the provider

        // If the validation fails, throw a ValidationError
        if (!validData.success) throw new ValidationError(validData.error.flatten().fieldErrors);

        // If validation passes, return the provider
        const account = await Account.findOne({ providerAccountId }); // Find a account with the given provider

        if (!account) throw new NotFoundError("Account"); // If no account found, throw an error

        // If account is found, return the account data
        return NextResponse.json({
            success: true,
            data: account, // Return the account
        }, { status: 200 });
    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}