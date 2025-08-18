import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { api } from "./lib/api";
import { ActionResponse, AuthType } from "./types/global";
import { IAccountDoc } from "./database/account.model";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub, Google],
    callbacks: { // Callbacks for NextAuth
        async session({ session, token }) { // Handles session management
            if (token) {
                session.user.id = token.sub as string; // Sets user ID in the session
            }
            return session; // Returns the updated session
        },
        async jwt({ token, user, account }) { // Handles JWT token creation
            if (account) {
                const { data: existingAccount, success } = (await api.accounts.getByProvider( // Gets account by provider
                    account.type === 'credentials' ? // Gets account by email for credentials
                        token.email! : // Gets account by email for credentials
                        account.providerAccountId // Gets account by provider
                )) as ActionResponse<IAccountDoc>;

                if (!success || !existingAccount) return token; // Returns token if account not found

                const userId = existingAccount.userId; // Gets user ID from the account

                if (userId) token.sub = userId.toString(); // Sets user ID in the token
            }

            return token; // Returns the updated token
        },
        async signIn({ user, profile, account }) { // Handles login with OAuth providers
            if (account?.type === 'credentials') return true; // Allows login with credentials
            if (!account || !user) return false; // Returns false if account or user is not defined

            const userInfo = { // Constructs user information object
                name: user.name!,
                email: user.email!,
                image: user.image!,
                username: account.provider === 'github' ? // Sets username based on GitHub login
                    (profile?.login as string) : // Sets username based on GitHub login
                    (user.name?.toLowerCase() as string), // Sets username based on provider
            };

            const { success } = (await api.auth.oAuthLogin({
                user: userInfo,
                provider: account.provider as AuthType, // Sets provider type
                providerAccountId: account.providerAccountId,
            })) as ActionResponse; // Calls the API to log in with OAuth

            if (!success) return false;

            return true; // Returns true if login is successful
        },
    }
})