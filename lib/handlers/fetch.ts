import { ActionResponse } from "@/types/global";
import logger from "../logger";
import handleError from "./error";
import { RequestError } from "../httpErrors";
import { config } from "zod";

export interface FetchOptions extends RequestInit {
    timeout?: number;
}

// This function checks if the provided error is an instance of Error.
function isError(error: unknown): error is Error { // type guard to check if error is an Error
    return error instanceof Error; // returns true if error is an instance of Error
}

// This function fetches data from a given URL with optional timeout and custom headers.
export async function fetchHandler<T>(url: string, options: FetchOptions = {}): Promise<ActionResponse<T>> { // generic type T for response data
    const { timeout = 5000, headers: customHeaders = {}, ...restOptions } = options; // default timeout of 5000ms
    const controller = new AbortController(); // create an AbortController to handle timeouts
    const id = setTimeout(() => controller.abort(), timeout); // set a timeout to abort the request

    const defaultHeaders: HeadersInit = { // default headers for the request
        "Content-Type": "application/json", // default content type
        Accept: "application/json", // accept JSON responses
    }

    const headers: HeadersInit = {
        ...defaultHeaders, // merge default headers with custom headers
        ...customHeaders, // spread custom headers if provided
    }

    const config: RequestInit = {
        ...restOptions, // spread any other options provided
        headers, // use the merged headers
        signal: controller.signal, // attach the abort signal to the request
    }

    try {
        const response = await fetch(url, config); // make the fetch request with the provided URL and options
        clearTimeout(id); // clear the timeout if the request completes successfully

        if (!response.ok) {
            throw new RequestError(response.status, `HTTP error: ${response.status}`); // throw an error if the response is not ok
        }

        return await response.json(); // parse and return the JSON response

    } catch (err) {
        console.log(err)
        const error = isError(err) ? err : new Error("An unknown error occurred"); // check if error is an instance of Error

        if (error.name === "AbortError") {
            logger.warn(`Request to ${url} timed out after ${timeout}ms`); // log a warning if the request was aborted due to timeout
        } else {
            logger.error(`Error fetching ${url}: ${error.message}`); // log any other errors
        }

        return handleError(error) as ActionResponse<T>; // handle the error and return an ActionResponse
    }
}