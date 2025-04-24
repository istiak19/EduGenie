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

    const matchChapters = chapters.filter(chapter => chapter?.courseId === course?._id);

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
            const responsePhoto = await fetch(`/api/course/${course._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ photo }),
            });
            const updated = await responsePhoto.json();
            if (updated.modifiedCount > 0) {
                fetchCourse();
            }
        } catch (err) {
            console.error("Upload failed", err);
        }
    };

    if (loading)
        return (
            <div className="py-10">
                <Loading />
            </div>
        );
    if (error)
        return <div className="text-center py-10 text-red-500">{error}</div>;
    if (!course) return null;

    const saveChapterContentToDB = async (chapterContent) => {
        try {
            const response = await fetch('/api/chapter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chapterContent)
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Failed to save chapter:', error);
        }
    };

    const handleGenerateChapterContent = async () => {
        console.clear();
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
                const cleanJson = res
                    .replace(/```json/g, '')
                    .replace(/```/g, '')
                    .trim();
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

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition duration-300 p-6 md:p-8">
                <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold text-teal-700">
                        {course?.["Course Name"]}
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg text-justify">
                        {course?.Description}
                    </p>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="w-full h-48 md:h-72 relative overflow-hidden rounded-lg shadow-lg">
                        <label htmlFor="image" className="block w-full h-full relative cursor-pointer">
                            {course?.photo ? (
                                <Image src={course?.photo} alt="Course Image" fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex border border-teal-300 items-center justify-center bg-gray-100 text-gray-500 text-lg">
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
            </div>

            {/* Meta Info */}
            <div className="bg-white p-6 border border-gray-200 rounded-xl shadow hover:shadow-lg transition duration-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
                <InfoCard icon={<FaChartBar />} label="Skill Level" value={course?.Level} />
                <InfoCard icon={<FaClock />} label="Duration" value={course?.Duration} />
                <InfoCard icon={<FaBookOpen />} label="Chapters" value={`${course?.NoOfChapters} Chapters`} />
                <InfoCard icon={<FaPlayCircle />} label="Video Included?" value="Yes" />
            </div>

            {/* Chapters */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Course Chapters</h2>
                <div className="space-y-4 md:space-y-6">
                    {course?.Chapters?.map((chapter, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                            <h3 className="text-lg font-bold text-teal-700">
                                {index + 1}. {chapter?.["Chapter Name"]}
                            </h3>
                            <p className="text-gray-600 mt-1">{chapter?.About}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                <strong>Duration:</strong> {chapter?.Duration}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-10">
                <Link
                    href="/courses"
                    className="bg-teal-500 hover:bg-teal-700 cursor-pointer text-white rounded-md flex items-center gap-2 px-4 py-2 transition duration-200"
                >
                    <FaArrowLeft /> Back to Courses
                </Link>
                {
                    matchChapters?.length > 0 ? (
                        <Link
                            href={`/chapters/${course?._id}`}
                            className="bg-teal-500 hover:bg-teal-700 text-white cursor-pointer rounded-md flex items-center gap-2 px-4 py-2 transition duration-200"
                        >
                            Chapter Details <FaArrowRight />
                        </Link>
                    ) : (
                        <button
                            onClick={handleGenerateChapterContent}
                            disabled={spinner}
                            className={`${spinner ? "bg-gray-400 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-700"
                                } text-white rounded-md flex items-center gap-2 px-4 py-2 cursor-pointer transition duration-200`}
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
                                    <>
                                        Chapter Generate <FaArrowRight />
                                    </>
                                )
                            }
                        </button>
                    )
                }
            </div>
        </div>
    );
};

const InfoCard = ({ icon, label, value }) => (
    <div className="flex items-center gap-4">
        <div className="text-teal-600 text-2xl">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-base font-semibold">{value}</p>
        </div>
    </div>
);

export default CourseDetails;