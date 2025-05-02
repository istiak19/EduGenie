"use client";

import Link from "next/link";

const CoursePromo = () => {
    const highlights = [
        {
            id: 1,
            icon: "/assets/icons/syllabus-icon.png",
            title: "Dynamic ",
            highlight: "Curriculum",
            description:
                "Stay ahead with updated, industry-relevant courses designed for the learners of tomorrow.",
        },
        {
            id: 2,
            icon: "/assets/icons/study-icon.png",
            title: "Interactive ",
            highlight: "Learning",
            description:
                "Engage with hands-on projects, quizzes, and activities that make knowledge come alive.",
        },
        {
            id: 3,
            icon: "/assets/icons/outcome-icon.png",
            title: "Proven ",
            highlight: "Results",
            description:
                "Track your progress, achieve your academic goals, and unlock new career pathways with ease.",
        },
    ];

    return (
        <section className="bg-white py-16 px-4 md:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 items-center">
                {/* Left Side Text */}
                <div className="col-span-1 border-b-2 md:border-b-0 md:border-r-2 border-teal-500 pb-8 md:pb-0 md:pr-8">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4 leading-snug">
                        Transform Your <br className="hidden md:block" /> Education Journey with{" "}
                        <span className="text-teal-600">EduGenie</span>
                    </h2>
                    <p className="text-gray-600 mb-6 text-base">
                        Unlock personalized, engaging, and future-ready learning experiences — all in one platform.
                    </p>
                    <Link
                        href="/courses"
                        className="inline-flex items-center text-sm font-bold text-black hover:text-teal-700 transition-colors"
                    >
                        DISCOVER MORE <span className="ml-2 text-lg">➔</span>
                    </Link>
                </div>

                {/* Feature Columns */}
                <div className="col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {highlights.map((item) => (
                        <div
                            key={item.id}
                            className="text-center hover:shadow-lg transition-shadow duration-300 p-4 rounded-lg"
                        >
                            <img
                                src={item.icon}
                                alt={`${item.title}${item.highlight}`}
                                className="mx-auto mb-5 w-14 h-14 object-contain"
                                loading="lazy"
                            />
                            <h3 className="text-lg font-semibold text-gray-800">
                                {item.title}
                                <span className="text-teal-600">{item.highlight}</span>
                            </h3>
                            <p className="text-gray-600 mt-3 text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoursePromo;