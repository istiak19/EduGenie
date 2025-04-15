import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const p = await params;
    const query = { _id: new ObjectId(p.id) };
    const result = await dbConnect(collectionNames.courseCollection).findOne(query);
    return NextResponse.json(result);
};