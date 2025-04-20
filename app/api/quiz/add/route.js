"use server"
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

const db = await dbConnect();

export async function POST(req) {
    try {
        const body = await req.json();
        const { question,options,correctAnswer,category } = body;
        const quiz = { question,options,correctAnswer,category };
        console.log(quiz);
        const result = await db.collection(collectionNames.quizCollection).insertOne(quiz);
        return NextResponse.json(result)

    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}