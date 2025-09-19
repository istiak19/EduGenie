"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaChartBar, FaClock, FaBookOpen, FaPlayCircle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Loading from "@/components/Loading/Loading";
import Link from "next/link";
import Image from "next/image";
import { GeneratorChapterContent_AI } from "@/aiModel/aiModel";
import { getVideos } from "@/aiModel/youtube";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const image_key = process.env.NEXT_PUBLIC_IMAGE_KEY;

const CourseDetails = () => {
    const [chapters, setChapters] = useState([]);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [spinner, setSpinner] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();

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

    const fetchChapters = async () => {
        try {
            const res = await fetch('/api/chapter');
            const data = await res.json();
            setChapters(data);
        } catch (err) {
            setError("Failed to load Chapters.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchCourse();
            fetchChapters();
        }
    }, [id]);

    const matchChapters = chapters.filter(ch => ch?.courseId === course?._id);

    const onFilesSelected = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${image_key}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                alert("Image Upload Failed");
                return;
            }
            const result = await response.json();
            const photo = result.data.url;
            const updateRes = await fetch(`/api/course/${course._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ photo }),
            });

            const updated = await updateRes.json();
            if (updated.modifiedCount > 0) fetchCourse();
        } catch (err) {
            console.error("Upload failed", err);
        }
    };

    const saveChapterContentToDB = async (chapterContent) => {
        try {
            const response = await fetch('/api/chapter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(chapterContent),
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Failed to save chapter:', error);
        }
    };

    const handleGenerateChapterContent = async () => {
        const chapters = course?.Chapters;
        if (!chapters || chapters.length === 0) return;
        setSpinner(true);
        for (let index = 0; index < chapters.length; index++) {
            const chapter = chapters[index];
            const courseName = course?.["Course Name"];
            const chapterName = chapter?.["Chapter Name"];
            const prompt = `Explain the concept in detail on Topic: '${courseName}', Chapter: '${chapterName}', in JSON format with fields as title, detailed description, and code example (code field in <precode> format) if applicable.`;
            try {
                const result = await GeneratorChapterContent_AI.sendMessage(prompt);
                const videos = await getVideos(`${courseName}:${chapterName}`);
                const videoId = videos[0]?.id?.videoId;

                const res = result?.response?.text();
                const cleanJson = res.replace(/```json|```/g, '').trim();
                const parsed = JSON.parse(cleanJson);
                const chapterContent = {
                    courseId: course._id,
                    courseName,
                    chapterName,
                    videoId,
                    Category: course.Category,
                    Topic: course.Topic,
                    ...parsed
                };
                await saveChapterContentToDB(chapterContent);
            } catch (e) {
                console.log(`Error in chapter ${index + 1}:`, e);
            }
        }
        setSpinner(false);
        Swal.fire({
            position: "top",
            icon: "success",
            title: "Chapters generated successfully!",
            showConfirmButton: false,
            timer: 1500
        });
        fetchChapters();
    };

    if (loading)
        return <div className="py-10"><Loading /></div>;

    if (error)
        return <div className="text-center py-10 text-red-500">{error}</div>;

    if (!course) return null;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header */}
            <motion.div
                className="flex flex-col md:flex-row items-center gap-8 bg-white border rounded-xl shadow p-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold text-teal-700">{course?.["Course Name"]}</h1>
                    <p className="text-gray-600 text-base text-justify">{course?.Description}</p>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="w-full h-56 md:h-72 relative overflow-hidden rounded-md shadow-lg">
                        <label htmlFor="image" className="block w-full h-full relative cursor-pointer">
                            {course?.photo ? (
                                <Image src={course?.photo} alt="Course Image" fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-lg border border-dashed border-teal-200">
                                    Click To Upload Course Image
                                </div>
                            )}
                            <input
                                type="file"
                                name="image"
                                id="image"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={onFilesSelected}
                            />
                        </label>
                    </div>
                </div>
            </motion.div>

            {/* Meta Info */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6 bg-teal-50 p-6 rounded-lg shadow-md border border-dashed border-teal-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <InfoCard
                    icon={<FaChartBar />}
                    label="Skill Level"
                    value={course?.Level}
                    className="flex flex-col items-center justify-center text-center"
                />
                <InfoCard
                    icon={<FaClock />}
                    label="Duration"
                    value={course?.Duration}
                    className="flex flex-col items-center justify-center text-center"
                />
                <InfoCard
                    icon={<FaBookOpen />}
                    label="Chapters"
                    value={`${course?.NoOfChapters} Chapters`}
                    className="flex flex-col items-center justify-center text-center"
                />
                <InfoCard
                    icon={<FaPlayCircle />}
                    label="Video Included?"
                    value="Yes"
                    className="flex flex-col items-center justify-center text-center"
                />
            </motion.div>

            {/* Chapters */}
            <motion.div
                className="mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Course Chapters</h2>
                <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        staggerChildren: 0.2,
                        duration: 1,
                    }}
                >
                    {course?.Chapters?.map((chapter, index) => (
                        <motion.div
                            key={index}
                            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <h3 className="text-lg font-bold text-teal-700">
                                {index + 1}. {chapter?.["Chapter Name"]}
                            </h3>
                            <p className="text-gray-600 mt-1 text-justify text-sm md:text-base font-medium leading-relaxed">
                                About: <span className="text-teal-600 text-sm md:text-base font-light">{chapter?.About || chapter?.about}</span>
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                <strong>Duration:</strong> {chapter?.Duration}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
                className="flex flex-col md:flex-row justify-between items-center gap-4 mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <Link
                    href="/courses"
                    className="bg-teal-500 hover:bg-teal-700 text-white rounded-md flex items-center gap-2 px-4 py-2 transition"
                >
                    <FaArrowLeft /> Back to Courses
                </Link>
                {
                    matchChapters?.length > 0 ? (
                        <Link
                            href={`/chapters/${course?._id}`}
                            className="bg-teal-500 hover:bg-teal-700 text-white rounded-md flex items-center gap-2 px-4 py-2 transition"
                        >
                            Chapter Details <FaArrowRight />
                        </Link>
                    ) : (
                        <motion.button
                            onClick={handleGenerateChapterContent}
                            disabled={spinner}
                            className={`${spinner ? "bg-gray-400 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-700"} cursor-pointer text-white rounded-md flex items-center gap-2 px-4 py-2 transition`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {
                                spinner ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                        </svg>
                                        Generating...
                                    </>
                                ) : (
                                    <>Chapter Generate <FaArrowRight /></>
                                )
                            }
                        </motion.button>
                    )
                }
            </motion.div>
        </div>
    );
};

const InfoCard = ({ icon, label, value, className }) => {
    return (
        <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
            <div className="flex flex-col items-center justify-center text-center">
                <div className="text-teal-600 mb-1 text-lg">
                    {icon}
                </div>
                <p className="text-sm font-semibold text-gray-700">{label}</p>
                <p className="text-teal-600 text-sm">{value}</p>
            </div>
        </div>
    );
};

export default CourseDetails;