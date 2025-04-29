"use client";

import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

// Topics Map
const courseTopics = {
    Programming: ["Python", "JavaScript", "React", "Node.js", "Machine Learning", "Web Development", "Data Science", "Artificial Intelligence", "Blockchain", "Cybersecurity"],
    Health: ["Mental Health", "Fitness", "Nutrition", "First Aid", "Wellness", "Yoga", "Physical Therapy"],
    Creative: ["UI/UX", "Graphic Design", "Photography", "Illustration", "Video Editing"],
    Marketing: ["Digital Marketing", "SEO", "Social Media Marketing", "Content Marketing", "Email Marketing"],
    Design: ["Web Design", "Product Design", "Graphic Design", "Interior Design", "UX/UI Design"],
    Business: ["Entrepreneurship", "Leadership", "Project Management", "Business Strategy", "Startup", "Marketing for Business"],
};

const QuizAddForm = () => {
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');

    const [formData, setFormData] = useState({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
    });

    const handleOptionChange = (index, value) => {
        const newOptions = [...formData.options];
        newOptions[index] = value;
        setFormData({ ...formData, options: newOptions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCategory || !selectedTopic) {
            toast.error("Please select category and topic first!");
            return;
        }

        const quizData = {
            ...formData,
            category: selectedCategory,
            topic: selectedTopic,
        };

        setLoading(true);

        const res = await fetch('/api/quiz/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quizData),
        });

        const data = await res.json();
        if (res.ok) {
            setFormData({
                question: '',
                options: ['', '', '', ''],
                correctAnswer: '',
            });
            setSelectedCategory('');
            setSelectedTopic('');
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Quiz added successfully!",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            toast.error(data.message || "Failed to add quiz");
        }
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 md:px-6">
            <ToastContainer />
            <div className="bg-white shadow-lg rounded-xl p-6 md:p-10 border border-gray-200">
                <h2 className="text-lg md:text-2xl font-bold mb-6 text-center text-teal-800">
                    Add New Quiz
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Select Main Category */}
                    <div>
                        <label htmlFor="category" className="block font-medium mb-1">Select Category</label>
                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setSelectedTopic('');
                            }}
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                            required
                        >
                            <option value="">Select Category</option>
                            {Object.keys(courseTopics).map((category, idx) => (
                                <option key={idx} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Select Topic */}
                    {selectedCategory && (
                        <div>
                            <label htmlFor="topic" className="block font-medium mb-1">Select Topic</label>
                            <select
                                id="topic"
                                value={selectedTopic}
                                onChange={(e) => setSelectedTopic(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                                required
                            >
                                <option value="">Select Topic</option>
                                {courseTopics[selectedCategory].map((topic, idx) => (
                                    <option key={idx} value={topic}>
                                        {topic}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Question Input */}
                    {selectedTopic && (
                        <>
                            <div>
                                <label htmlFor="question" className="block font-medium mb-1">Question</label>
                                <input
                                    id="question"
                                    type="text"
                                    placeholder="Enter your quiz question"
                                    value={formData.question}
                                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    required
                                />
                            </div>

                            {/* Options Input */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {formData.options.map((option, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        placeholder={`Option ${index + 1}`}
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        required
                                    />
                                ))}
                            </div>

                            {/* Correct Answer Select */}
                            {formData.options.every(option => option.trim() !== '') && (
                                <div>
                                    <label htmlFor="correctAnswer" className="block font-medium mb-1">Correct Answer</label>
                                    <select
                                        id="correctAnswer"
                                        value={formData.correctAnswer}
                                        onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        required
                                    >
                                        <option value="">Select Correct Answer</option>
                                        {formData.options.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </>
                    )}

                    {/* Submit Button */}
                    {selectedTopic && (
                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full md:w-auto px-6 py-2 text-white rounded font-medium transition duration-200 ${loading
                                    ? "bg-teal-300 cursor-not-allowed"
                                    : "bg-teal-600 hover:bg-teal-700 cursor-pointer"
                                    }`}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <span className="loading loading-infinity loading-sm text-white"></span>
                                        <span className="ml-2">Adding...</span>
                                    </div>
                                ) : (
                                    "Add Quiz"
                                )}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default QuizAddForm;