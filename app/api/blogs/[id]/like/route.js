import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const blogId = params?.id; // ✅ no await here
  const { userEmail } = await req.json();

  const db = await dbConnect(collectionNames.blogsCollection);
  const blog = await db.findOne({ _id: new ObjectId(blogId) });

  const update = blog.likes?.includes(userEmail)
    ? { $pull: { likes: userEmail } }
    : { $addToSet: { likes: userEmail } };

  await db.updateOne({ _id: new ObjectId(blogId) }, update);

  return NextResponse.json({ success: true });
}