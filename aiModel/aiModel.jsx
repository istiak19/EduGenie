const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
// console.log('API Key:', apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const GeneratorCourseLayout_AI = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {
                    text: `Generate A Course Tutorial on Following
  detail With field as Course Name, Description,
  Along with Chapter Name, about, Duration:
  Category: 'Programming', Topic: Python,
  Level:Basic, Duration:1 hours, NoOf
  Chapters:5 , in JSON format`,
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: `{
              "Course Name": "Python Fundamentals for Beginners",
              "Description": "A comprehensive introductory course to Python programming...",
              "Category": "Programming",
              "Topic": "Python",
              "Level": "Basic",
              "Duration": "5 hours",
              "NoOfChapters": 5,
              "Chapters": [...]
            }`,
                },
            ],
        },
    ],
});

export const GeneratorChapterContent_AI = model.startChat({
    history: [
        {
            role: "user",
            parts: [
                {
                    text: `Explain the concept in Detail on Topic: Python Basic,
  Chapter:Variables and Data Types, in JSON Format with list of array
  with field as title, explanation on give chapter in detail , Code
  Example(Code field in <precode> format) if applicable`,
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: `{
    "title": "Python Basics: Variables and Data Types",
    "chapters": [
      {
        "title": "Introduction to Variables",
        "explanation": "Variables are used to store data...",
        "code": "<precode>name = \\"Alice\\"\\nage = 30</precode>"
      },
      {
        "title": "Naming Variables",
        "explanation": "Rules for naming...",
        "code": "<precode>valid_name = 123</precode>"
      }
    ]
  }`,
                },
            ],
        },
    ],
});