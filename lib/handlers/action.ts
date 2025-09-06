"user server";

import { ZodError, ZodSchema } from "zod";
import { UnauthorizedError, ValidationError } from "../httpErrors";
import { Session } from "next-auth";
import { auth } from "@/auth";
import dbConnect from "../mongoose";

type ActionOptions<T> = {
    params?: T;
    schema?: ZodSchema<T>;
    authorize?: boolean;
}

// 1. Checking wether the schema and params are provided and validating them using Zod.
// 2. If validation fails, it returns a ValidationError with field errors.
// 3. If authorization is required, it checks for a valid session.
// 4. If the session is not found, it returns an UnauthorizedError.
// 5. Finally, it connects to the database and returns the validated parameters and session.
// 6. This function can be used in API routes or server actions to handle validation and authorization in a consistent manner.

async function action<T>({ // generic type T for action parameters
    params,
    schema,
    authorize = false
}: ActionOptions<T> = {
    }) {
    if (schema && params) { // validate the parameters against the schema
        try {
            schema.parse(params); // parse the parameters using the schema
        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) { // check if error is a ZodError
                return new ValidationError(error.flatten().fieldErrors as Record<string, string[]>); // return a ValidationError with field errors 
            } else {
                throw new Error('Schema validation failed'); // throw a generic error if it's not a ZodError
            }
        }
    }

    let session: Session | null = null; // initialize session as null
    if (authorize) { // check if authorization is required
        session = await auth(); // get the session using the auth function

        if (!session) { // if session is not found
            return new UnauthorizedError(); // return an Unauthorized error
        }
    }

    await dbConnect(); // connect to the database
    return { params, session }; // return the parameters and session
}

export default action; // export the action function