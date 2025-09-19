"use server";

import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// Database connect
const db = await dbConnect();

// ✅ Get All User Results
export async function GET(req) {
  try {
    const result = await db.collection(collectionNames.resultCollections).find().toArray();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching results:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

// ✅ Submit Quiz
export async function POST(req) {
  try {
    const body = await req.json();
    const { email, category, answers } = body;

    // Validation check
    if (!email || !category || !answers) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    let score = 0;
    const resultDetails = [];

    // Loop through each answer and check correctness
    for (let ans of answers) {
      const question = await db.collection(collectionNames.quizCollection).findOne({
        _id: new ObjectId(ans.questionId),
      });

      if (!question) continue;

      // 🛠️ Important Fix: use correctAnswer field
      const correct =
        question.correctAnswer?.trim().toLowerCase() ===
        ans.userAnswer?.trim().toLowerCase();

      if (correct) score++;

      resultDetails.push({
        questionId: ans.questionId,
        userAnswer: ans.userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect: correct,
      });
    }

    // Final User Result Object
    const userResults = {
      userEmail: email,
      category,
      score,
      total: answers.length,
      answers: resultDetails,
      createdAt: new Date(),
    };

    // Insert user result into database
    const res = await db.collection(collectionNames.resultCollections).insertOne(userResults);

    // Success Response
    return NextResponse.json({
      insertedId: res.insertedId.toString(),
      score,
    });

  } catch (error) {
    console.error("Error submitting result:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
