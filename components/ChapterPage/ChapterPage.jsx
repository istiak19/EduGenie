"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/components/Loading/Loading";

const ChapterPage = () => {
    const { id } = useParams();
    const router = useRouter();

    const [chapters, setChapters] = useState([]);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const res = await fetch(`/api/chapter?courseId=${id}`);
                const data = await res.json();

                if (Array.isArray(data)) {
                    setChapters(data);
                    setSelectedChapter(data[0]);
                } else {
                    console.error("API did not return an array:", data);
                    setChapters([]);
                }
            } catch (error) {
                console.error("Failed to fetch chapters:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchChapters();
    }, [id]);

    const handleNextChapter = () => {
        const currentIndex = chapters.findIndex(ch => ch._id === selectedChapter._id);
        if (currentIndex < chapters.length - 1) {
            setSelectedChapter(chapters[currentIndex + 1]);
        } else {
            router.push(`/quiz`);
        }
    };

    const handlePreviousChapter = () => {
        const currentIndex = chapters.findIndex(ch => ch._id === selectedChapter._id);
        if (currentIndex > 0) {
            setSelectedChapter(chapters[currentIndex - 1]);
        }
    };

    if (loading) {
        return (
            <div className="py-10">
                <Loading />
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 py-10 gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 bg-gray-50 p-5 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-5 text-teal-700">Chapters</h3>
                <ul className="space-y-2">
                    {Array.isArray(chapters) && chapters.map((chapter, idx) => (
                        <li
                            key={chapter._id}
                            onClick={() => setSelectedChapter(chapter)}
                            className={`cursor-pointer px-3 py-2 rounded-lg transition 
                        ${selectedChapter?._id === chapter._id
                                    ? "bg-teal-200 font-semibold text-teal-900"
                                    : "hover:bg-teal-100 text-gray-700"
                                }`}
                        >
                            {idx + 1}. {chapter.chapterName}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Content */}
            <main className="w-full bg-white p-6 md:p-8 rounded-xl shadow-md">
                <div className="my-6">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-teal-700 mb-3 tracking-tight">
                        {selectedChapter?.courseName}
                    </h2>
                    <div className="h-1 w-full bg-teal-400 rounded"></div>
                </div>

                <div>
                    <h2 className="text-lg md:text-xl font-bold text-teal-500 mb-4">
                        {selectedChapter?.chapterName}
                    </h2>

                    {selectedChapter?.videoId && (
                        <div className="mb-8">
                            <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                                    src={`https://www.youtube.com/embed/${selectedChapter.videoId}`}
                                    title="Chapter Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}

                    {/* Chapter Content */}
                    {selectedChapter?.chapters?.map((item, idx) => (
                        <div key={idx} className="mt-6 border-t pt-6">
                            <p className="text-gray-800 font-semibold mb-2">Description:</p>
                            <p className="text-sm text-gray-600 text-justify leading-relaxed">
                                {item.description}
                            </p>
                            {item.code && (
                                <pre className="mt-4 bg-gray-100 text-sm p-4 overflow-auto rounded-md text-gray-800 whitespace-pre-wrap">
                                    {item.code}
                                </pre>
                            )}
                            {item.codeExamples?.length > 0 && (
                                <div className="mt-6 space-y-4">
                                    <h3 className="text-lg font-semibold">Code Examples:</h3>
                                    {item.codeExamples.map((example, i) => (
                                        <div key={i}>
                                            <p className="font-medium text-gray-800 mb-1">
                                                {example?.title}
                                            </p>
                                            <pre className="bg-gray-100 text-sm p-4 overflow-auto rounded-md text-gray-800 whitespace-pre-wrap">
                                                {example?.code?.replace(/<precode>|<\/precode>/g, "")}
                                            </pre>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Navigation Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <button
                            onClick={handlePreviousChapter}
                            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg transition cursor-pointer duration-300 disabled:opacity-50"
                            disabled={chapters.findIndex(ch => ch._id === selectedChapter?._id) === 0}
                        >
                            Previous Chapter
                        </button>

                        <button
                            onClick={handleNextChapter}
                            className="bg-teal-600 cursor-pointer hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                        >
                            {chapters.findIndex(ch => ch._id === selectedChapter?._id) < chapters.length - 1
                                ? "Next Chapter"
                                : "Finish & Go to Quiz"}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ChapterPage;