import { NextResponse } from "next/server";
import { ErrorTypes, RequestError, ValidationError } from "../httpErrors";
import { ZodError } from "zod/v3";

export type ResponseType = 'api' | 'server';

const formatResponse = (
    responseType: ResponseType,
    status: number,
    message: string,
    errors?: ErrorTypes
) => {
    const responseContent = {
        success: false,
        error: {
            message,
            details: errors,
        }
    };

    return responseType === 'api'
        ? NextResponse.json(responseContent, { status })
        : { status, ...responseContent };
}

const handleError = (error: unknown, responseType: ResponseType = 'server') => {
    if (error instanceof RequestError) {
        return formatResponse(
            responseType,
            error.statusCode,
            error.message,
            error.errors
        );
    }

    if (error instanceof ZodError) {
        const validationError = new ValidationError(error.flatten().fieldErrors as ErrorTypes);
        return formatResponse(
            responseType,
            validationError.statusCode,
            validationError.message,
            validationError.errors
        );
    }

    if (error instanceof Error) {
        return formatResponse(
            responseType,
            500,
            error.message
        );
    }

    return formatResponse(responseType, 500, 'An unexpected error occurred');
};

export default handleError;