export interface LoginOAuthParams {
    provider: "google" | "github"; // OAuth provider type
    providerAccountId: string; // Unique identifier for the account with the provider
    user: {
        name: string; // User's full name
        username: string; // User's username
        email: string; // User's email address
        image?: string; // Optional URL to the user's profile image
    };
}

export interface AuthCredentials {
    name: string; // User's full name
    username: string; // User's username
    email: string; // User's email address
    password: string; // User's password
}

export interface CreateQuestionParams {
    title: string; // Title of the question
    content: string; // Content/body of the question
    tags: string[]; // Optional array of tags associated with the question
}