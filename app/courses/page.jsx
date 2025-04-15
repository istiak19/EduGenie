"use client";

import { useEffect, useState } from "react";
import { MdOutlineMenuBook } from "react-icons/md";
import Loading from "@/components/Loading/Loading";
import Link from "next/link";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://genie-one-xi.vercel.app/api/course");
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      {/* Header Section */}
      <div className="space-y-2 py-10 bg-teal-500">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white">
          All Courses
          <MdOutlineMenuBook className="inline-block ml-3 text-yellow-200" />
        </h1>
        <p className="text-center text-white text-lg">
          Explore the wide range of AI-powered courses
        </p>
      </div>

      {/* Content */}
      <div className="p-4 max-w-7xl mx-auto">
        {loading ? (
          <div>
            <Loading />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : courses.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No courses available.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch py-10">
            {courses.map((course) => (
              <Link href={`/courses/${course?._id}`} key={course._id}>
                <div className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition duration-300 p-6 flex flex-col h-full min-h-[450px]">
                  <div className="h-36 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                    Course Image
                  </div>

                  <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-teal-600 transition">
                    {course["Course Name"]}
                  </h2>
                  <p className="text-gray-600 mb-2"> {course.Description?.slice(0, 100)}...</p>

                  <div className="text-sm text-gray-700 space-y-1 mb-4">
                    <p>
                      <strong>Category:</strong> {course.Category}
                    </p>
                    <p>
                      <strong>Duration:</strong> {course.Duration}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="bg-teal-500 text-white text-xs px-3 py-1 rounded-full">
                      {course.Topic}
                    </span>
                    <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                      {course.Level}
                    </span>
                    <span className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-full">
                      {course.NoOfChapters} Chapters
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;