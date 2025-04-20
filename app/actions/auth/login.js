"use server";

import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { compare } from "bcryptjs";

export const login = async (payload) => {
    const { email, password } = payload;
    const db = await dbConnect();

    const userCollection = await db.collection(collectionNames.userCollection);
    const user = await userCollection.findOne({ email });

    if (!user) return null;

    const isPasswordOk = await compare(password, user.password);
    if (!isPasswordOk) return null;

    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo || null,
    };
};