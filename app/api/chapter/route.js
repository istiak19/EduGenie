import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const db = await dbConnect();
        const { searchParams } = new URL(req.url);
        const courseId = searchParams.get("courseId");

        let chapters = [];
        if (courseId) {
            chapters = await db
                .collection(collectionNames.chapterCollection)
                .find({ courseId })
                .sort({ createdAt: 1 })
                .toArray();
        } else {
            chapters = await db
                .collection(collectionNames.chapterCollection)
                .find()
                .sort({ createdAt: 1 })
                .toArray();
        }

        return NextResponse.json(chapters, { status: 200 });
    } catch (error) {
        console.error("GET error:", error);
        return NextResponse.json(
            { message: "Failed to fetch chapters" },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        const db = await dbConnect();
        const chapterInfo = await req.json();

        const result = await db
            .collection(collectionNames.chapterCollection)
            .insertOne({
                ...chapterInfo,
                createdAt: new Date()
            });

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error("POST error:", error);
        return NextResponse.json(
            { message: "Failed to create chapter" },
            { status: 500 }
        );
    }
}