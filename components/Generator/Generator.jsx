"use client";

import { GeneratorCourseLayout_AI } from "@/aiModel/aiModel";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const Generator = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [formData, setFormData] = useState({
        category: "",
        level: "",
        topic: "",
        noOfChapters: "",
        duration: "",
    });

    const courseTopics = {
        Programming: ["Python", "JavaScript", "React", "Node.js", "Machine Learning", "Web Development", "Data Science", "Artificial Intelligence", "Blockchain", "Cybersecurity"],
        Health: ["Mental Health", "Fitness", "Nutrition", "First Aid", "Wellness", "Yoga", "Physical Therapy"],
        Creative: ["UI/UX", "Graphic Design", "Photography", "Illustration", "Video Editing"],
        Marketing: ["Digital Marketing", "SEO", "Social Media Marketing", "Content Marketing", "Email Marketing"],
        Design: ["Web Design", "Product Design", "Graphic Design", "Interior Design", "UX/UI Design"],
        Business: ["Entrepreneurship", "Leadership", "Project Management", "Business Strategy", "Startup", "Marketing for Business"],
    };

    const categories = Object.keys(courseTopics);

    const handleCategorySelect = (cat) => {
        setSelectedCategory(cat);
        setFormData({ ...formData, category: cat, topic: "" });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "noOfChapters" || name === "duration") {
            if (!/^\d*$/.test(value)) return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleNext = () => {
        if (step === 1 && !formData.category) return;
        if (step === 2 && (!formData.level || !formData.topic)) return;
        if (step === 3 && (!formData.noOfChapters || !formData.duration)) return;
        setStep((prev) => prev + 1);
    };

    const handlePrevious = () => {
        setStep((prev) => prev - 1);
    };

    const handleGenerate = async () => {
        console.clear();
        const BASIC_PROMPT = `Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration:`;
        const USER_INPUT_PROMPT = `Category: ${formData?.category}, Topic: ${formData?.topic}, Level: ${formData?.level}, Duration: ${formData?.duration} hours, NoOf Chapters: ${formData?.noOfChapters}, in JSON format.`;
        const FINAL_PROMPT = `${BASIC_PROMPT} ${USER_INPUT_PROMPT}`;

        try {
            setIsGenerating(true);
            const result = await GeneratorCourseLayout_AI.sendMessage(FINAL_PROMPT);
            const responseText = await result.response.text();
            const courseInfo = JSON.parse(responseText);
            const info = {
                'Course Name': courseInfo["Course Name"],
                'Description': courseInfo["Description"],
                'Category': courseInfo["Category"],
                'Topic': courseInfo["Topic"],
                'Level': courseInfo["Level"],
                'Duration': courseInfo["Duration"],
                'NoOfChapters': courseInfo["NoOfChapters"],
                'Chapters': courseInfo["Chapters"],
                email: session?.user?.email
            };
            const res = await fetch("/api/course", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(info),
            });
            const response = await res.json();
            if (response.insertedId) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Course Generated Successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                router.push("/courses");
            }
        } catch (error) {
            console.error("Generation error:", error);
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Something went wrong while generating the course.",
            });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow-lg border border-teal-300">
            <h1 className="text-3xl font-semibold text-center text-teal-600">Create Your Course</h1>

            {step === 1 && (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-teal-600 text-center">Select Course Category</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategorySelect(cat)}
                                className={`px-2 py-5 border-2 rounded-xl cursor-pointer transition-all duration-500 ease-in-out transform ${selectedCategory === cat
                                    ? "bg-teal-100 border-teal-600 scale-105 shadow-xl"
                                    : "bg-gray-50 border-gray-300 hover:bg-teal-50 hover:border-teal-500"
                                    }`}
                            >
                                <h3 className="text-xl text-center text-teal-600">{cat}</h3>
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleNext}
                        disabled={!formData.category}
                        className="w-full cursor-pointer bg-teal-600 text-white py-3 rounded-lg mt-6 font-semibold hover:bg-teal-700 disabled:bg-gray-400 transition-all duration-300"
                    >
                        Next
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="level" className="block text-lg font-medium text-teal-700 mb-1">
                                Select Difficulty Level
                            </label>
                            <select
                                id="level"
                                name="level"
                                onChange={handleChange}
                                value={formData.level}
                                className="w-full border-2 p-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                required
                            >
                                <option value="">Select Difficulty</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="topic" className="block text-lg font-medium text-teal-700 mb-1">
                                Select Course Topic
                            </label>
                            <select
                                id="topic"
                                name="topic"
                                onChange={handleChange}
                                value={formData.topic}
                                className="w-full border-2 p-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                required
                            >
                                <option value="">Select Course Topic</option>
                                {selectedCategory &&
                                    courseTopics[selectedCategory].map((topic) => (
                                        <option key={topic} value={topic}>
                                            {topic}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            onClick={handlePrevious}
                            className="bg-gray-500 text-white py-3 px-6 rounded-lg cursor-pointer font-semibold hover:bg-gray-600"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!formData.level || !formData.topic}
                            className="bg-teal-600 text-white py-3 px-6 rounded-lg cursor-pointer font-semibold hover:bg-teal-700"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="noOfChapters" className="block text-lg font-medium text-teal-700 mb-1">
                                Number of Chapters
                            </label>
                            <input
                                id="noOfChapters"
                                type="text"
                                name="noOfChapters"
                                value={formData.noOfChapters}
                                onChange={handleChange}
                                placeholder="Enter number of chapters"
                                className="w-full border-2 p-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="duration" className="block text-lg font-medium text-teal-700 mb-1">
                                Course Duration (in hours)
                            </label>
                            <input
                                id="duration"
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="Enter course duration in hours"
                                className="w-full border-2 p-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            onClick={handlePrevious}
                            className="bg-gray-500 text-white py-3 px-6 rounded-lg cursor-pointer font-semibold hover:bg-gray-600"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleGenerate}
                            className="bg-green-600 text-white py-3 px-6 rounded-lg cursor-pointer font-semibold hover:bg-green-700"
                        >
                            {isGenerating ? "⏳ Generating..." : "Generate Course"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Generator;