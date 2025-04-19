import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// Get by blogs info
export async function PATCH(req, { params }) {
    const approvalStatus = await req.json();
    const p = await params;
    const filter = { _id: new ObjectId(p.id) };
    const options = { upsert: true };
    const updateBlog = {
        $set: {
            approval: approvalStatus.approval
        },
    };
    const result = await dbConnect(collectionNames.blogsCollection).updateOne(filter, updateBlog, options);;
    return NextResponse.json(result);
};

export async function DELETE(req, { params }) {
    const p = await params;
    const filter = { _id: new ObjectId(p.id) };
    const result = await dbConnect(collectionNames.blogsCollection).deleteOne(filter);
    return NextResponse.json(result);
};