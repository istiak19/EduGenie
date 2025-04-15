import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, tel, message } = body;

   const result = await dbConnect(collectionNames.messageCollection).insertOne({
      firstName,
      lastName,
      email,
      tel,
      message,
      createdAt: new Date(),
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error saving contact:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
