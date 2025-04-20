import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

// Get by course info
export async function GET(req) {
    const db = await dbConnect();
    const result = await db.collection(collectionNames.userCollection).find().toArray();
    return NextResponse.json(result);
};