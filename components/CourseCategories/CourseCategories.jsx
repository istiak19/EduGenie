"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const categories = [
    { name: "Programming", img: "/assets/CourseCategories/Programming.jpg" },
    { name: "Health", img: "/assets/CourseCategories/Health.jpg" },
    { name: "Creative", img: "/assets/CourseCategories/Creative.jpg" },
    { name: "Marketing", img: "/assets/CourseCategories/Marketing.jpg" },
    { name: "Design", img: "/assets/CourseCategories/Design.jpg" },
    { name: "Business", img: "/assets/CourseCategories/Business.jpg" },
];

const CourseCategories = () => {
    const router = useRouter();

    return (
        <div className="bg-[#fafafa] dark:bg-gray-900 transition-colors duration-500">
            <div className="py-10 container px-4 mx-auto text-center">
                {/* Title */}
                <div className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-2 text-gray-800 dark:text-gray-100">
                        <span className="w-8 md:w-12 h-0.5 bg-teal-700 dark:bg-teal-400"></span>
                        <span>
                            Course <span className="text-teal-700 dark:text-teal-400">Categories</span>
                        </span>
                        <span className="w-8 md:w-12 h-0.5 bg-teal-700 dark:bg-teal-400"></span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-3 md:mt-4 uppercase text-xs md:text-sm tracking-wide">
                        JUST PICK WHAT YOU NEED TO LEARN
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    {categories.map((category, idx) => (
                        <div
                            key={idx}
                            className="relative group overflow-hidden rounded-md shadow-md hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800"
                        >
                            <div className="relative w-full h-64">
                                <Image
                                    src={category.img}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/30 dark:bg-black/40 transition-opacity duration-300 group-hover:bg-black/50"></div>

                            {/* Title */}
                            <button
                                onClick={() => router.push('/dashboard/generator')}
                                className="cursor-pointer"
                            >
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-white text-lg md:text-xl font-bold relative after:block after:h-[2px] after:bg-yellow-500 dark:after:bg-yellow-400 after:scale-x-0 group-hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300">
                                        {category.name}
                                    </h3>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseCategories;