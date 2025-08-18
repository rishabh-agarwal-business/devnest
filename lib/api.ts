import { IUser } from "@/database/user.model";
import { fetchHandler } from "./handlers/fetch";
import { IAccount } from "@/database/account.model";
import { LoginOAuthParams } from "@/types/action";
import ROUTES from "@/constants/routes";

// This file defines the API endpoints for the application.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

// The API object contains methods for interacting with the backend.
export const api = {
    auth: { // This section defines the API endpoints for authentication.
        oAuthLogin: ({ user, provider, providerAccountId }: LoginOAuthParams) => {
            return fetchHandler(`${API_BASE_URL}/auth/${ROUTES.LOGIN_WITH_OAUTH}`, { // Handles OAuth login
                method: 'POST', // Use POST method to send data,
                body: JSON.stringify({ // Send user data in the request body
                    user,
                    provider,
                    providerAccountId,
                }), // Convert the data to JSON format
            });
        }
    },

    users: {
        getAll: () => fetchHandler(`${API_BASE_URL}/users`),
        getById: (id: string) => fetchHandler(`${API_BASE_URL}/users/${id}`),
        getByEmail: (email: string) => fetchHandler(`${API_BASE_URL}/users/email`, { // get user by email
            method: "POST",
            body: JSON.stringify({ email }), // Send email in the request body
        }),
        create: (user: Partial<IUser>) => fetchHandler(`${API_BASE_URL}/users`, { // create a new user
            method: "POST",
            body: JSON.stringify(user), // Send user data in the request body
        }),
        update: (id: string, user: Partial<IUser>) => fetchHandler(`${API_BASE_URL}/users/${id}`, { // update an existing user
            method: 'PUT',
            body: JSON.stringify(user), // Send updated user data in the request body
        }),
        delete: (id: string) => fetchHandler(`${API_BASE_URL}/users/${id}`, { // delete a user by ID
            method: 'DELETE', // Use DELETE method to remove the user
        })
    }, // users endpoint

    // This section defines the API endpoints for user accounts.
    accounts: {
        getAll: () => fetchHandler(`${API_BASE_URL}/accounts`),
        getById: (id: string) => fetchHandler(`${API_BASE_URL}/accounts/${id}`),
        getByProvider: (providerAccountId: string) => fetchHandler(`${API_BASE_URL}/accounts/provider`, { // get account by email
            method: "POST",
            body: JSON.stringify({ providerAccountId }), // Send providerAccountId in the request body
        }),
        create: (account: Partial<IAccount>) => fetchHandler(`${API_BASE_URL}/accounts`, { // create a new account
            method: "POST",
            body: JSON.stringify(account), // Send account data in the request body
        }),
        update: (id: string, account: Partial<IAccount>) => fetchHandler(`${API_BASE_URL}/accounts/${id}`, { // update an existing user
            method: 'PUT',
            body: JSON.stringify(account), // Send updated account data in the request body
        }),
        delete: (id: string) => fetchHandler(`${API_BASE_URL}/accounts/${id}`, { // delete a account by ID
            method: 'DELETE', // Use DELETE method to remove the account
        })
    }
}