"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineMenuBook } from "react-icons/md";

const Page = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://genie-one-xi.vercel.app/api/course");
        setCourses(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <div className="space-y-2 py-8 bg-teal-400">
        <h1 className="text-3xl text-teal-900 font-bold text-center">
          All Courses{" "}
          <MdOutlineMenuBook className="inline-block ml-2 text-4xl text-yellow-200" />
        </h1>
        <p className="text-center text-white">
          Explore the wide range of courses made by AI
        </p>
      </div>
      <div className="p-4 pt-10">
        {loading ? (
          <p>Loading courses...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : courses.length > 0 ? (
          <div className="flex flex-col gap-6 w-11/12 mx-auto">
            {
              courses.map((course) => (
                <div
                  key={course._id}
                  className="w-full bg-white border border-gray-300 rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-6 transition-all hover:shadow-xl hover:border-teal-500"
                >
                  <div className="flex-shrink-0 w-32 h-32 bg-gray-300 rounded-lg"></div>
                  <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold text-gray-800 hover:text-teal-600 transition-all">
                      {course["Course Name"]}
                    </h2>
                    <p className="text-gray-600">{course.Description}</p>
                    <p>
                      <strong className="text-gray-800">Category:</strong>{" "}
                      {course.Category}
                    </p>
                    <p>
                      <strong className="text-gray-800">Duration:</strong>{" "}
                      {course.Duration}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-block bg-teal-500 text-white text-xs px-3 py-1 rounded-full">
                        {course.Topic}
                      </span>
                      <span className="inline-block bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                        {course.Level}
                      </span>
                      <span className="inline-block bg-yellow-500 text-white text-xs px-3 py-1 rounded-full">
                        {course.NoOfChapters} Chapters
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p>No courses available.</p>
        )
        }
      </div>
    </div>
  );
};

export default Page;