import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const db = await dbConnect();

export async function GET(req, { params }) {
    const p = await params;
    const query = { _id: new ObjectId(p.id) };
    const result = await db.collection(collectionNames.userCollection).findOne(query);
    return NextResponse.json(result);
};

export async function PATCH(req, { params }) {
    const userInfo = await req.json();
    // console.log(userInfo)
    const p = await params;
    const filter = { _id: new ObjectId(p.id) };
    const options = { upsert: true };
    const updateUser = {
        $set: {
          name:userInfo.name,
          photo:userInfo.photo
        },
      };
    const result = await db.collection(collectionNames.userCollection).updateOne(filter, updateUser, options);;
    return NextResponse.json(result);
};