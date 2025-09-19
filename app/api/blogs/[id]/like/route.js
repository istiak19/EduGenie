import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const blogId = params;
  const { userEmail } = await req.json();

  const db = await dbConnect();
  const collection = db.collection(collectionNames.blogsCollection);

  const blog = await collection.findOne({ _id: new ObjectId(blogId.id) });

  const update = blog.likes?.includes(userEmail)
    ? { $pull: { likes: userEmail } }
    : { $addToSet: { likes: userEmail } };

  await collection.updateOne({ _id: new ObjectId(blogId) }, update);
  return NextResponse.json({ success: true });
}