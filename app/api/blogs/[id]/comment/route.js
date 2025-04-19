import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { userEmail, comment, commenter } = await req.json();
    const blogId = params.id;

    const db = await dbConnect(collectionNames.blogsCollection);

    const newComment = {
      commenter,
      userEmail,
      comment,
      createdAt: new Date(),
    };

    await db.updateOne(
      { _id: new ObjectId(blogId) },
      { $push: { comments: newComment } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add comment" },
      { status: 500 }
    );
  }
}