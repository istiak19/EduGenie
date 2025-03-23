"use client";

import { GeneratorCourseLayout_AI } from "@/aiModel/aiModel";

const Generator = () => {
    const handleForm = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const category = form.get('category');
        const topic = form.get('topic');
        const level = form.get('level');
        const duration = form.get('duration');
        const noOfChapters = form.get('noOfChapters');
        const BASIC_PROMPT = `Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration:`
        const USER_INPUT_PROMPT = `Category: ${category}, Topic: ${topic}, Level: ${level}, Duration: ${duration} hours, NoOf Chapters: ${noOfChapters}, in JSON format`;
        const FINAL_PROMPT = `${BASIC_PROMPT} ${USER_INPUT_PROMPT}`;
        console.log(FINAL_PROMPT);
        const result = await GeneratorCourseLayout_AI.sendMessage(FINAL_PROMPT);
        console.log(result.response.text())
        console.log(JSON.parse(result.response.text()))
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Generate a Course Tutorial</h2>
            <form className="space-y-4" onSubmit={handleForm}>
                <select name="category" className="w-full p-2 border rounded" required>
                    <option value="Programming">Programming</option>
                </select>

                <select name="topic" className="w-full p-2 border rounded" required>
                    <option value="Python">Python</option>
                </select>

                <select name="level" className="w-full p-2 border rounded" required>
                    <option value="Basic">Basic</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>

                <input
                    type="text"
                    name="duration"
                    placeholder="Duration (e.g., 1 hour)"
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="number"
                    name="noOfChapters"
                    placeholder="Number of Chapters"
                    className="w-full p-2 border rounded"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Generate JSON
                </button>
            </form>
        </div>
    );
};

export default Generator;