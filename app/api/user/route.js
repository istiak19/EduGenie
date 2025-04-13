import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

// Get by course info
export async function GET(req) {
    const result = await dbConnect(collectionNames.userCollection).find().toArray();
    return NextResponse.json(result);
};