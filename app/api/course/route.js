import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
    const result = await dbConnect(collectionNames.courseCollection).find().toArray();
    return NextResponse.json(result);
};
export async function POST(req) {
    const courseInfo = await req.json();
    const result = await dbConnect(collectionNames.courseCollection).insertOne(courseInfo);
    return NextResponse.json(result);
};