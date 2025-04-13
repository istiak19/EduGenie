import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

// Get by course info
export async function GET(req) {
    const result = await dbConnect(collectionNames.blogsCollection).find().toArray();
    return NextResponse.json(result);
};

// Post api
export async function POST(req) {
    const blog = await req.json();
    const result = await dbConnect(collectionNames.blogsCollection).insertOne(blog);
    return NextResponse.json(result);
};