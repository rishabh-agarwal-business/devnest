import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/httpErrors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextRequest, NextResponse } from "next/server";

// Fetching all users
export async function GET() {
    try {
        await dbConnect();

        const users = await User.find();

        return NextResponse.json({
            success: true,
            data: users
        }, { status: 200 });

    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}

// Creating a new user
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();

        const validData = UserSchema.safeParse(body);
        if (!validData.success) {
            throw new ValidationError(validData.error.flatten().fieldErrors);
        }

        const { email, username } = validData.data;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error("Email already exists.");

        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) throw new Error("Username already exists.");

        // Create a new user
        const newUser = await User.create(validData.data);

        return NextResponse.json({
            success: true,
            data: newUser
        }, { status: 201 });

    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}