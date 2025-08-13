import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { ForbiddenError } from "@/lib/httpErrors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextRequest, NextResponse } from "next/server";

// Fetching all accounts
export async function GET() {
    try {
        await dbConnect(); // Ensure database connection is established

        const accounts = await Account.find(); // Fetch all accounts from the database

        // Return the fetched accounts
        return NextResponse.json({
            success: true,
            data: accounts
        }, { status: 200 });

    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}

// Creating a new account
export async function POST(request: NextRequest) {
    try {
        await dbConnect(); // Ensure database connection is established
        const body = await request.json(); // Parse the request body

        const validData = AccountSchema.parse(body); // Validate the request body

        // Check if user already exists
        const existingAccount = await Account.findOne({
            provider: validData.provider,
            providerAccountId: validData.providerAccountId
        });

        // Check if provider already exists
        if (existingAccount) throw new ForbiddenError('An account with same provider already exists.')

        // Create a new account
        const newAccount = await Account.create(validData);

        // Return the newly created account
        return NextResponse.json({
            success: true,
            data: newAccount
        }, { status: 201 });

    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}