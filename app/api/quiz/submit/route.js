"use server";
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const db = await dbConnect();

export async function GET(req) {
  const result = await db.collection(collectionNames.resultCollections).find().toArray();
  return NextResponse.json(result);
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, category, answers } = body;

    if (!email || !category || !answers) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    let score = 0;
    const resultDetails = [];

    for (let ans of answers) {
      const question = await db.collection(collectionNames.quizCollection).findOne({
        _id: new ObjectId(ans.questionId),
      });

      if (!question) continue;

      const correct =
        question.answer?.trim().toLowerCase() ===
        ans.userAnswer?.trim().toLowerCase();

      if (correct) score++;

      resultDetails.push({
        questionId: ans.questionId,
        userAnswer: ans.userAnswer,
        correctAnswer: question.answer,
        isCorrect: correct,
      });
    }
    // user result 
    const userResults = {
      userEmail: email,
      category,
      score,
      total: answers.length,
      answers: resultDetails,
      createdAt: new Date(),
    };

    const res = await db.collection(collectionNames.resultCollections).insertOne(userResults);

    return NextResponse.json({
      insertedId: res.insertedId.toString(),
      score,
    });
  } catch (error) {
    console.error("Error submitting result:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
