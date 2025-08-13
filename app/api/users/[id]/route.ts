import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/httpErrors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

/**
 * GET /api/users/[id]
 * Fetch a user by ID
 * @param {Request} _ - The request object (not used here)
 * @param {Object} params - The parameters from the request URL
 * @returns {NextResponse} - JSON response with user data or error
 */
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
    // Get the user ID from the params
    const { id } = await params;

    if (!id) throw new NotFoundError('User'); // If the ID is not provided, throw a 404 error

    // Simulate fetching user data from a database
    try {
        await dbConnect(); // Ensure the database connection is established
        const user = await User.findById(id); // Replace with actual database query

        if (!user) throw new NotFoundError('User'); // If user not found, throw a 404 error

        return NextResponse.json({
            success: true,
            data: user
        }, { status: 200 });
    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}

/**
 * DELETE /api/users/[id]
 * Delete a user by ID
 * @param {Request} _ - The request object (not used here)
 * @param {Object} params - The parameters from the request URL
 * @returns {NextResponse} - JSON response indicating success or error
 */
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    // Get the user ID from the params
    const { id } = await params;

    if (!id) throw new NotFoundError('User'); // If the ID is not provided, throw a 404 error

    try {
        await dbConnect(); // Ensure the database connection is established
        const user = await User.findByIdAndDelete(id); // Replace with actual database query

        if (!user) throw new NotFoundError('User'); // If user not found, throw a 404 error

        return NextResponse.json({
            success: true,
            data: user,
            message: 'User deleted successfully'
        }, { status: 204 });
    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}

/**
 * PUT /api/users/[id]
 * Update a user by ID
 * @param {Request} _ - The request object (not used here)
 * @param {Object} params - The parameters from the request URL
 * @returns {NextResponse} - JSON response with updated user data or error
 */
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id) throw new NotFoundError('User'); // If the ID is not provided, throw a 404 error

    try {
        await dbConnect(); // Ensure the database connection is established
        const body = await request.json(); // Parse the request body
        // Validate the request body against the UserSchema
        const validData = UserSchema.partial().parse(body);

        const user = await User.findByIdAndUpdate(id, {
            $set: {
                ...validData,
                updatedAt: new Date()
            }
        }, { new: true }); // Replace with actual database query

        if (!user) throw new NotFoundError('User'); // If user not found, throw a 404 error

        return NextResponse.json({
            success: true,
            data: user
        }, { status: 200 });
    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}