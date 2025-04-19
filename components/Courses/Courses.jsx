"use client";

import { useEffect, useState } from "react";
import { MdOutlineMenuBook, MdTopic } from "react-icons/md";
import Loading from "@/components/Loading/Loading";
import Link from "next/link";
import { SiLevelsdotfyi } from "react-icons/si";
import { FaRegClock } from "react-icons/fa";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Courses = () => {
  const { data: session } = useSession();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/course");
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

  const ownerCourse = courses.filter(course => course?.email === session?.user?.email);

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
          <div className="animate-pulse">
            <Loading />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : ownerCourse.length === 0 ? (
          <p className="text-center text-gray-600 text-lg mt-10">
            You haven't created any courses yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch py-10">
            {ownerCourse.map((course) => (
              <div
                key={course._id}
                className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition duration-300 p-4 flex flex-col h-full min-h-[250px]"
              >
                <div className="relative h-36 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <Image
                    src={course?.photo || "/course.jpg"}
                    alt="Course Image"
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-teal-600 transition">
                  {course["Course Name"]}
                </h2>
                <p className="text-gray-600 mb-2">
                  {course.Description?.slice(0, 100)}...
                </p>
                <div className="flex flex-wrap gap-2 mt-auto justify-between *:text-xs">
                  <span className="flex items-center gap-2">
                    <SiLevelsdotfyi /> {course.Level}
                  </span>
                  <span className="flex items-center gap-2">
                    <MdTopic className="text-xl" /> {course.Topic}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaRegClock /> {course?.Duration}
                  </span>
                </div>
                <div>
                  <Link
                    href={`/courses/${course?._id}`}
                    className="btn w-full mt-3 bg-teal-500 hover:bg-teal-700 border-none rounded-md text-white"
                  >
                    Start
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;