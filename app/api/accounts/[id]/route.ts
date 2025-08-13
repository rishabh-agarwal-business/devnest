import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/httpErrors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

/**
 * GET /api/accounts/[id]
 * Fetch a account by ID
 * @param {Request} _ - The request object (not used here)
 * @param {Object} params - The parameters from the request URL
 * @returns {NextResponse} - JSON response with account data or error
 */
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
    // Get the account ID from the params
    const { id } = await params;

    if (!id) throw new NotFoundError('Account'); // If the ID is not provided, throw a 404 error

    // Simulate fetching account data from a database
    try {
        await dbConnect(); // Ensure the database connection is established
        const account = await Account.findById(id); // Replace with actual database query

        if (!account) throw new NotFoundError('Account'); // If account not found, throw a 404 error

        return NextResponse.json({
            success: true,
            data: account
        }, { status: 200 });
    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}

/**
 * DELETE /api/accounts/[id]
 * Delete a account by ID
 * @param {Request} _ - The request object (not used here)
 * @param {Object} params - The parameters from the request URL
 * @returns {NextResponse} - JSON response indicating success or error
 */
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    // Get the account ID from the params
    const { id } = await params;

    if (!id) throw new NotFoundError('Account'); // If the ID is not provided, throw a 404 error

    try {
        await dbConnect(); // Ensure the database connection is established
        const account = await Account.findByIdAndDelete(id); // Replace with actual database query

        if (!account) throw new NotFoundError('Account'); // If account not found, throw a 404 error

        return NextResponse.json({
            success: true,
            data: account,
            message: 'Account deleted successfully'
        }, { status: 204 });
    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}

/**
 * PUT /api/accounts/[id]
 * Update a account by ID
 * @param {Request} _ - The request object (not used here)
 * @param {Object} params - The parameters from the request URL
 * @returns {NextResponse} - JSON response with updated account data or error
 */
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id) throw new NotFoundError('Account'); // If the ID is not provided, throw a 404 error

    try {
        await dbConnect(); // Ensure the database connection is established
        const body = await request.json(); // Parse the request body
        // Validate the request body against the AccountSchema
        const validData = AccountSchema.partial().safeParse(body);

        // If validation fails, throw a ValidationError with field errors
        if (!validData.success) throw new ValidationError(validData.error.flatten().fieldErrors);

        const account = await Account.findByIdAndUpdate(id, validData, { new: true }); // Replace with actual database query

        if (!account) throw new NotFoundError('Account'); // If account not found, throw a 404 error

        return NextResponse.json({
            success: true,
            data: account
        }, { status: 200 });
    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}