"use client";

import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const QuizAddForm = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        category: 'web-development',
    });

    const handleOptionChange = (index, value) => {
        const newOptions = [...formData.options];
        newOptions[index] = value;
        setFormData({ ...formData, options: newOptions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch('/api/quiz/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (res.ok) {
            setFormData({
                question: '',
                options: ['', '', '', ''],
                correctAnswer: '',
                category: 'web-development',
            });
            Swal.fire({
                position: "top-end",
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
        <div className="max-w-4xl mx-auto py-8">
            <ToastContainer />
            <div className="bg-white shadow-lg rounded-xl p-6 md:p-10 border border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-teal-800">
                    Add New Quiz
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Select Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                            required
                        >
                            <option>Category</option>
                            <option value="Python">Python</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="React">React</option>
                            <option value="UI/UX">UI/UX</option>
                            <option value="Node.js">Node.js</option>
                            <option value="Machine Learning">Machine Learning</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            <option value="Blockchain">Blockchain</option>
                            <option value="Cybersecurity">Cybersecurity</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Question</label>
                        <input
                            type="text"
                            placeholder="Enter your quiz question"
                            value={formData.question}
                            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.options.map((option, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                                required
                            />
                        ))}
                    </div>

                    {formData.options.every(option => option.trim() !== '') && (
                        <div>
                            <label className="block font-medium mb-1">Correct Answer</label>
                            <select
                                value={formData.correctAnswer}
                                onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                                required
                            >
                                <option value="">Select Correct Answer</option>
                                {formData.options.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    )}

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
                                <span className="loading loading-infinity loading-sm text-white"></span>
                            ) : (
                                "Add Quiz"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QuizAddForm;