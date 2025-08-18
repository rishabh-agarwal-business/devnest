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