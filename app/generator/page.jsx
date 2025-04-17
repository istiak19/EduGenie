"use client";

import { GeneratorCourseLayout_AI } from "@/aiModel/aiModel";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Generator = () => {
    const router = useRouter();

    const handleForm = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const category = form.get('category');
        const topic = form.get('topic');
        const level = form.get('level');
        const duration = form.get('duration');
        const noOfChapters = form.get('noOfChapters');
        // const info = { category, topic, level, duration, noOfChapters };
        // console.log(info);
        const BASIC_PROMPT = `Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration:`
        const USER_INPUT_PROMPT = `Category: ${category}, Topic: ${topic}, Level: ${level}, Duration: ${duration} hours, NoOf Chapters: ${noOfChapters}, in JSON format`;
        const FINAL_PROMPT = `${BASIC_PROMPT} ${USER_INPUT_PROMPT}`;
        console.log(FINAL_PROMPT);
        const result = await GeneratorCourseLayout_AI.sendMessage(FINAL_PROMPT);
        console.log(result.response.text());
        const courseInfo = JSON.parse(result.response.text());
        // console.log(courseInfo)
        const res = await fetch('https://genie-one-xi.vercel.app/api/course', {
            method: 'POST',
            body: JSON.stringify(courseInfo)
        })
        const response = await res.json();
        // console.log(response);
        if (response.insertedId) {
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Your course generate successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            router.push("/courses");
        }
    };

    return (
        <div className="bg-white shadow-xl mx-auto p-8 sm:p-12 border border-gray-100 rounded-3xl max-w-4xl my-10">
            <h2 className="mb-12 font-semibold text-gray-800 text-3xl sm:text-4xl text-center">🚀 Create Your Course</h2>
            <div className="relative flex justify-between items-center mb-12">
                <div className="top-1/2 absolute bg-gray-200 w-full h-1"></div>
                {["📘 Course Information", "🎓 Learning Path", "⚙️ Settings"].map((step, index) => (
                    <div key={index} className="z-10 relative flex flex-col items-center">
                        <div className="bg-teal-600 shadow-lg p-4 rounded-full text-white">
                            <span className="text-xl">{step.split(" ")[0]}</span>
                        </div>
                        <p className="mt-2 text-gray-500 text-sm">{step.split(" ")[1]}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleForm} className="gap-10 grid grid-cols-1 md:grid-cols-2">
                <div className="space-y-8">
                    <div className="flex flex-col">
                        <label className="block font-semibold text-gray-700 text-lg">📘 Course Category</label>
                        <select
                            name="category"
                            // value={formData.category}
                            // onChange={handleChange}
                            required
                            className="p-4 border border-gray-300 focus:border-teal-600 rounded-xl focus:ring-2 focus:ring-teal-500 w-full transition duration-300 ease-in-out"
                        >
                            <option value="Programming">Programming</option>
                            <option value="Design">Design</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="block font-semibold text-gray-700 text-lg">🎓 Course Topic</label>
                        <select
                            name="topic"
                            // value={formData.topic}
                            // onChange={handleChange}
                            required
                            className="p-4 border border-gray-300 focus:border-teal-600 rounded-xl focus:ring-2 focus:ring-teal-500 w-full transition duration-300 ease-in-out"
                        >
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

                    <div className="flex flex-col">
                        <label className="block font-semibold text-gray-700 text-lg">🎓 Difficulty Level</label>
                        <select
                            name="level"
                            // value={formData.level}
                            // onChange={handleChange}
                            className="p-4 border border-gray-300 focus:border-teal-600 rounded-xl focus:ring-2 focus:ring-teal-500 w-full transition duration-300 ease-in-out"
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="flex flex-col">
                        <label className="block font-semibold text-gray-700 text-lg">⏳ Course Duration</label>
                        <input
                            type="text"
                            name="duration"
                            // value={formData.duration}
                            // onChange={handleChange}
                            className="p-4 border border-gray-300 focus:border-teal-600 rounded-xl focus:ring-2 focus:ring-teal-500 w-full transition duration-300 ease-in-out"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="block font-semibold text-gray-700 text-lg">📚 No of Chapters</label>
                        <input
                            type="number"
                            name="noOfChapters"
                            // value={formData.noOfChapters}
                            // onChange={handleChange}
                            className="p-4 border border-gray-300 focus:border-teal-600 rounded-xl focus:ring-2 focus:ring-teal-500 w-full transition duration-300 ease-in-out"
                        />
                    </div>
                </div>

                <div className="flex justify-center col-span-2 mt-8">
                    <button
                        type="submit"
                        className="bg-teal-600 hover:bg-teal-700 shadow-lg px-6 py-3 rounded-lg font-medium text-white hover:scale-105 transition-transform transform"
                    >
                        🎯 Create Course Generator
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Generator;