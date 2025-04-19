"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaChartBar, FaClock, FaBookOpen, FaPlayCircle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Loading from "@/components/Loading/Loading";
import Link from "next/link";
import Image from "next/image";

const image_key = process.env.NEXT_PUBLIC_IMAGE_KEY;

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (id) {
      fetchCourse();
    }
  }, [id]);

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

  return (
    <div className="bg-gray-900 text-white min-h-screen max-w-6xl mx-auto px-4 md:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 bg-gray-800 border border-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 p-6 md:p-8">
        {/* Left: Text */}
        <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            {course?.["Course Name"]}
          </h1>
          <p className="text-gray-400 text-base md:text-lg text-justify">
            {course?.Description}
          </p>
        </div>

        {/* Right: Image */}
        <div className="w-full md:w-1/2">
          <div className="w-full h-48 md:h-72 relative overflow-hidden rounded-lg shadow-lg">
            <label
              htmlFor="image"
              className="block w-full h-full relative cursor-pointer"
            >
              <Image
                src={course?.photo || "/course.jpg"}
                alt="Course Image"
                fill
                className="object-cover"
              />
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
      <div className="bg-gray-800 p-6 border border-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
        <InfoCard icon={<FaChartBar />} label="Skill Level" value={course?.Level} />
        <InfoCard icon={<FaClock />} label="Duration" value={course?.Duration} />
        <InfoCard icon={<FaBookOpen />} label="Chapters" value={`${course?.NoOfChapters} Chapters`} />
        <InfoCard icon={<FaPlayCircle />} label="Video Included?" value="Yes" />
      </div>

      {/* Chapters */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">
          Course Chapters
        </h2>
        <div className="space-y-4 md:space-y-6">
          {course?.Chapters?.map((chapter, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg p-4 bg-gray-800 shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-purple-400">
                {index + 1}. {chapter?.["Chapter Name"]}
              </h3>
              <p className="text-gray-400 mt-1">{chapter?.About}</p>
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
          className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 text-white rounded-md flex items-center gap-2 px-4 py-2 transition duration-200"
        >
          <FaArrowLeft /> Back to Courses
        </Link>
        <button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 text-white rounded-md flex items-center gap-2 px-4 py-2 transition duration-200">
          Finished <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-4">
    <div className="text-purple-400 text-2xl">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-semibold text-gray-400">{value}</p>
    </div>
  </div>
);

export default CourseDetails;