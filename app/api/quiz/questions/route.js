"use server"
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

const db = await dbConnect();

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    try {
        const questions = await db.collection(collectionNames.quizCollection).aggregate([
            { $match: { category } },
            { $sample: { size: 10 } }
        ]).toArray();

        return NextResponse.json(questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
