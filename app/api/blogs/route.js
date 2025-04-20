import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

const db = await dbConnect();
// Get by blogs info
export async function GET(req) {
    const result = await db.collection(collectionNames.blogsCollection).find().toArray();
    return NextResponse.json(result);
};

// Post api
export async function POST(req) {
    const blog = await req.json();
    const result = await db.collection(collectionNames.blogsCollection).insertOne(blog);
    return NextResponse.json(result);
};