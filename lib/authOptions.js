import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { login } from "@/app/actions/auth/login";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: { email: {}, password: {} },
            async authorize(credentials, req) {
                const user = await login(credentials);
                return user || null;
                // return credentials
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async signIn({ user, account, profile, email, credentials }) {
            console.log('callback--->', { user, account, profile, email, credentials });
            return true;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true
}