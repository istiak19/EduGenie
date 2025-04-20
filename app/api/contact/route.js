import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

const db = await dbConnect();

export async function GET(req) {
  const result = await db.collection(collectionNames.messageCollection).find().toArray();
  return NextResponse.json(result);
};


export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, tel, message } = body;

    const result = await db.collection(collectionNames.messageCollection).insertOne({
      firstName,
      lastName,
      email,
      tel,
      message,
      createdAt: new Date(),
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
