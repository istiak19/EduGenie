"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/components/Loading/Loading";

const ChapterPage = () => {
    const { id  } = useParams();
    const router = useRouter();

    const [chapters, setChapters] = useState([]);
   
    const [selectedChapter, setSelectedChapter] = useState(null);
    // console.log(selectedChapter);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const res = await fetch(`/api/chapter?courseId=${id}`);
                const data = await res.json();

                if (Array.isArray(data)) {
                    setChapters(data);
                    setSelectedChapter(data[0]);
                } else {
                    throw new Error("API did not return an array.");
                }
            } catch (error) {
                setError(error.message);
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
            router.push(`/quiz?category=${selectedChapter?.Category}&topic=${selectedChapter?.Topic}`);
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
            <div className="py-10 min-h-screen flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-10 min-h-screen flex justify-center items-center text-red-500">
                {`Error: ${error}`}
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row container mx-auto px-4 py-10 gap-5 min-h-screen">
            {/* Sidebar */}
            <aside className="w-full lg:w-72 bg-white p-4 rounded-2xl shadow-lg max-h-[80vh] overflow-y-auto border border-teal-100">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-2 text-teal-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2m4-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Chapters
                </h3>
                <ul className="space-y-2">
                    {Array.isArray(chapters) && chapters.map((chapter, idx) => (
                        <li
                            key={chapter._id}
                            onClick={() => setSelectedChapter(chapter)}
                            className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedChapter?._id === chapter._id
                                ? "bg-teal-100 text-teal-900 border-teal-300 border shadow-lg font-semibold text-lg"
                                : "hover:bg-teal-50 text-gray-700 hover:shadow-sm"}`}
                            role="button" aria-label={`Select ${chapter.chapterName}`}
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
                            <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
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
                            <p className="text-base text-gray-600 text-justify leading-relaxed">
                                {item.description}
                            </p>
                            {item.code && (
                                <pre className="mt-4 bg-gray-100 text-sm p-4 overflow-auto rounded-md text-gray-800 whitespace-pre-wrap break-words">
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
                                            <pre className="bg-gray-100 text-sm p-4 overflow-auto rounded-md text-gray-800 whitespace-pre-wrap break-words">
                                                {example?.code?.replace(/<precode>|<\/precode>/g, "")}
                                            </pre>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Navigation Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
                        <button
                            onClick={handlePreviousChapter}
                            className="w-full cursor-pointer sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 disabled:opacity-50"
                            disabled={chapters.findIndex(ch => ch._id === selectedChapter?._id) === 0}
                            aria-label="Go to previous chapter"
                        >
                            Previous Chapter
                        </button>

                        <button
                            onClick={handleNextChapter}
                            className="w-full sm:w-auto cursor-pointer bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                            aria-label="Go to next chapter or finish the course"
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