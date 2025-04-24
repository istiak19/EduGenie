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

// GET: Retrieve all messages
// export async function GET() {
//   try {
//     const messages = await dbConnect(collectionNames.messageCollection).find().sort({ createdAt: -1 }).toArray();

//     return NextResponse.json(messages);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
//   }
// }
