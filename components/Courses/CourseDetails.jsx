"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MdOutlineMenuBook } from "react-icons/md";
import Loading from "@/components/Loading/Loading";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const CourseDetails = () => {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(`/api/course/${id}`);
                const data = await res.json();
                setCourse(data);
            } catch (err) {
                setError("Failed to load course.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCourse();
        }
    }, [id]);

    if (loading) return <div className="py-10"><Loading /></div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
    if (!course) return null;

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
            {/* Header */}
            <div className="text-center space-y-3 mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-teal-700">
                    {course?.["Course Name"]}{" "}
                    <MdOutlineMenuBook className="inline-block text-yellow-400" size={28} />
                </h1>
                <p className="text-gray-600 text-base md:text-lg">{course?.Description}</p>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
                <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm md:text-base">
                    {course?.Topic}
                </span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm md:text-base">
                    {course?.Level}
                </span>
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm md:text-base">
                    {course?.Duration}
                </span>
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm md:text-base">
                    {course?.NoOfChapters} Chapters
                </span>
            </div>

            {/* Chapters */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Course Chapters</h2>
                <div className="space-y-4">
                    {course?.Chapters?.map((chapter, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                            <h3 className="text-lg font-bold text-teal-700">{index + 1}. {chapter?.["Chapter Name"]}</h3>
                            <p className="text-gray-600 mt-1">{chapter?.About}</p>
                            <p className="text-sm text-gray-500 mt-2"><strong>Duration:</strong> {chapter?.Duration}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <Link href='/courses' className="btn border-none bg-teal-500 hover:bg-teal-700 text-white rounded-md mt-8"><FaArrowLeft /> Back to Course</Link>
            </div>
        </div>
    );
};

export default CourseDetails;