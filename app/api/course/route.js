import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

const db = await dbConnect();
// Get by course info
export async function GET(req) {
    const result = await db.collection(collectionNames.courseCollection).find().toArray();
    return NextResponse.json(result);
};

// Post api
export async function POST(req) {
    const courseInfo = await req.json();
    const result = await db.collection(collectionNames.courseCollection).insertOne(courseInfo);
    return NextResponse.json(result);
};