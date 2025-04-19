import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { login } from "@/app/actions/auth/login";
import dbConnect, { collectionNames } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await login(credentials);
        return user || null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
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
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        const db = await dbConnect();
        const usersCollection = db.collection(collectionNames.userCollection);

        const existingUser = await usersCollection.findOne({
          providerAccountId: account.providerAccountId,
        });

        if (!existingUser) {
          const newUser = {
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            email: user.email,
            name: user.name,
            photo: user.image,
            role: "student",
          };
          const result = await usersCollection.insertOne(newUser);
          user.id = result.insertedId.toString();
          user.role = newUser.role;
        } else {
          user.id = existingUser._id.toString();
          user.role = existingUser.role || "student";
        }
      }

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};
