const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
console.log('API Key:', apiKey);

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
                { text: "Generate A Course Tutorial on Following\ndetail With field as Course Name, Description,\nAlong with Chapter Name, about, Duration:\nCategory: 'Programming', Topic: Python,\nLevel:Basic, Duration:l hours, NoOf\nChapters:5 , in JSON format" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"Course Name\": \"Python Fundamentals for Beginners\",\n  \"Description\": \"A comprehensive introductory course to Python programming, designed for individuals with little to no prior programming experience. Learn the core concepts of Python, including data types, control flow, functions, and object-oriented programming basics. By the end of this course, you'll be able to write simple Python programs and have a solid foundation for further learning.\",\n  \"Category\": \"Programming\",\n  \"Topic\": \"Python\",\n  \"Level\": \"Basic\",\n  \"Duration\": \"5 hours\",\n  \"NoOfChapters\": 5,\n  \"Chapters\": [\n    {\n      \"Chapter Name\": \"Chapter 1: Introduction to Python\",\n      \"About\": \"This chapter introduces the Python programming language, its history, and its uses. You'll learn how to install Python and set up your development environment.  We'll also cover the basics of using the Python interpreter and writing your first 'Hello, World!' program.\",\n      \"Duration\": \"1 hour\"\n    },\n    {\n      \"Chapter Name\": \"Chapter 2: Data Types and Variables\",\n      \"About\": \"This chapter dives into the fundamental data types in Python, including integers, floats, strings, and booleans. You'll learn how to declare and use variables, and understand the concept of data type conversion.  We'll also cover basic input and output operations using the `input()` and `print()` functions.\",\n      \"Duration\": \"1 hour\"\n    },\n    {\n      \"Chapter Name\": \"Chapter 3: Control Flow - Conditionals and Loops\",\n      \"About\": \"This chapter explores control flow statements, including `if`, `elif`, and `else` for conditional execution. You'll learn how to use `for` and `while` loops to iterate over sequences and repeat code blocks.  We'll cover practical examples of using these statements to solve simple programming problems.\",\n      \"Duration\": \"1 hour\"\n    },\n    {\n      \"Chapter Name\": \"Chapter 4: Functions\",\n      \"About\": \"This chapter introduces the concept of functions in Python. You'll learn how to define your own functions, pass arguments, and return values.  We'll also cover the importance of code reusability and modularity through functions.  We'll look at built-in functions and how to create custom functions.\",\n      \"Duration\": \"1 hour\"\n    },\n    {\n      \"Chapter Name\": \"Chapter 5: Lists and Basic Object-Oriented Concepts\",\n      \"About\": \"This chapter introduces lists, a fundamental data structure in Python, and some basics of object-oriented programming. You'll learn how to create and manipulate lists, including adding, removing, and accessing elements.  We'll then introduce the core concepts of object-oriented programming like classes and objects in simple terms to lay the groundwork for more advanced learning.\",\n      \"Duration\": \"1 hour\"\n    }\n  ]\n}\n```\n" },
            ],
        },
    ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());