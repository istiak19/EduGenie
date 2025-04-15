"use server";
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { hash } from "bcryptjs";

export const register = async (payload) => {
    const userCollection = await dbConnect(collectionNames.userCollection);
    const user = await userCollection.findOne({ email: payload.email });
    const hashedPassword = await hash(payload.password, 10);
    if (!user) {
        const result = await userCollection.insertOne({
            ...payload,
            password: hashedPassword,
        });
        // const { _id } = result;
        return { success: true, _id: result.insertedId.toString() };
    }
    return null;
};