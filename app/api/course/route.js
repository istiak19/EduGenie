import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

// Get by course info
export async function GET(req) {
    const result = await dbConnect(collectionNames.courseCollection).find().toArray();
    return NextResponse.json(result);
};

// Post api
export async function POST(req) {
    const courseInfo = await req.json();
    const result = await dbConnect(collectionNames.courseCollection).insertOne(courseInfo);
    return NextResponse.json(result);
};