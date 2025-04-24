import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const db = await dbConnect();

export async function GET(req, { params }) {
    const p = await params;
    const query = { _id: new ObjectId(p.id) };
    const result = await db.collection(collectionNames.messageCollection).findOne(query);
    return NextResponse.json(result);
};

export async function PATCH(req, { params }) {
    const messageInfo = await req.json();
    const p = await params;
    const filter = { _id: new ObjectId(p.id) };
    const options = { upsert: true };
    const updateUser = {
        $set: {
            reply: messageInfo.reply,
        },
    };
    const result = await db.collection(collectionNames.messageCollection).updateOne(filter, updateUser, options);;
    return NextResponse.json(result);
};