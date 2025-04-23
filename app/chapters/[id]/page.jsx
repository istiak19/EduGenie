"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading/Loading";

const ChapterPage = () => {
    const { id } = useParams();
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const res = await fetch(`/api/chapter?courseId=${id}`);
                const data = await res.json();
                setChapters(data);
            } catch (error) {
                console.error("Failed to fetch chapters:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchChapters();
    }, [id]);

    if (loading) {
        return (
            <div className="py-10">
                <Loading />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-teal-700 mb-6">Generated Chapters</h1>
            {chapters.length === 0 ? (
                <p className="text-gray-500">No chapter content available yet.</p>
            ) : (
                <div className="space-y-6">
                    {chapters.map((chapter, index) => (
                        <div
                            key={chapter._id}
                            className="bg-white border border-gray-200 rounded-lg p-6 shadow"
                        >
                            <h2 className="text-xl font-semibold text-teal-600">
                                {index + 1}. {chapter.chapterName}
                            </h2>
                            <p className="mt-2 text-gray-700">{chapter.description}</p>
                            {chapter.code && (
                                <pre className="mt-4 bg-gray-100 text-sm p-4 overflow-auto rounded-md text-gray-800">
                                    {chapter.code}
                                </pre>
                            )}
                            {chapter.videoId && (
                                <div className="mt-4">
                                    <iframe
                                        className="w-full h-64 rounded-md"
                                        src={`https://www.youtube.com/embed/${chapter.videoId}`}
                                        title="YouTube Video"
                                        frameBorder="0"
                                        allowFullScreen
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChapterPage;