import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const db = await dbConnect();

export async function GET(req, { params }) {
    const p = await params;
    const query = { _id: new ObjectId(p.id) };
    const result = await db.collection(collectionNames.courseCollection).findOne(query);
    return NextResponse.json(result);
};

export async function PATCH(req, { params }) {
    const photo = await req.json();
    // console.log(userInfo)
    const p = await params;
    const filter = { _id: new ObjectId(p.id) };
    const options = { upsert: true };
    const updateUser = {
        $set: {
            photo: photo.photo
        },
    };
    const result = await db.collection(collectionNames.courseCollection).updateOne(filter, updateUser, options);;
    return NextResponse.json(result);
};