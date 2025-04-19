import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { login } from "@/app/actions/auth/login";
<<<<<<< HEAD
=======
import dbConnect, { collectionNames } from "./dbConnect";
>>>>>>> 3032cfcd5ff7718122ba1456c4d8ac992a5b9526

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: { email: {}, password: {} },
<<<<<<< HEAD
            async authorize(credentials, req) {
                const user = await login(credentials);
                return user || null;
                // return credentials
=======
            async authorize(credentials) {
                const user = await login(credentials);
                return user || null;
>>>>>>> 3032cfcd5ff7718122ba1456c4d8ac992a5b9526
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
<<<<<<< HEAD
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
=======
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },

        async session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token.role;
            return session;
        },

        async signIn({ user, account }) {
            if (account?.provider !== "credentials") {
                const db = dbConnect(collectionNames.userCollection);

                const existingUser = await db.findOne({ providerAccountId: account.providerAccountId });

                if (!existingUser) {
                    const newUser = {
                        provider: account.provider,
                        providerAccountId: account.providerAccountId,
                        email: user.email,
                        name: user.name,
                        photo: user.image,
                        role: "student"
                    };
                    await db.insertOne(newUser);
                    user.role = newUser.role;
                } else {
                    user.role = existingUser.role || "student";
                }

                user.id = existingUser?._id?.toString();
            }

>>>>>>> 3032cfcd5ff7718122ba1456c4d8ac992a5b9526
            return true;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true
<<<<<<< HEAD
}
=======
};
>>>>>>> 3032cfcd5ff7718122ba1456c4d8ac992a5b9526
