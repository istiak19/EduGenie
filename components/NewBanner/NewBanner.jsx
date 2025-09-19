"use client";

import { useRouter } from 'next/navigation';
import { FaPlay, FaUserGraduate, FaAward } from 'react-icons/fa';

const NewBanner = () => {
  const router = useRouter();

  return (
    <div className="bg-[#fafafa] dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto py-10 md:py-20 flex flex-col md:flex-row gap-5 items-center justify-between px-4">
        {/* Left side */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-800 dark:text-teal-300 leading-tight">
            Learn with AI-Enhanced{' '}
            <span className="px-1 relative inline-block">
              Education
              <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-500 dark:bg-yellow-400 transform -translate-y-1/2 z-[-1]"></span>
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg text-justify">
            EduGenie uses AI to create personalized learning experiences, generate courses, and help you master any subject with custom quizzes and interactive content.
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 justify-center md:justify-start">
            <span className="flex items-center gap-1">
              <FaUserGraduate className="text-indigo-500" /> Learn with experts
            </span>
            <span className="flex items-center gap-1">
              <FaAward className="text-indigo-500" /> Get certificate
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 justify-center md:justify-start">
            <button
              onClick={() => router.push('/dashboard/generator')}
              className="bg-teal-600 hover:bg-teal-800 text-white px-6 py-2 rounded-md shadow transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              Get Started
            </button>

            <button
              onClick={() => router.push('/courses')}
              className="flex items-center gap-2 text-indigo-600 dark:text-indigo-300 font-medium hover:text-indigo-800 dark:hover:text-indigo-400 hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-700 transition">
                <FaPlay />
              </div>
              Watch video
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center items-center">
          <img src="/assets/b2.png" alt="Education Illustration" className="max-w-full h-auto dark:brightness-90 transition" />
        </div>
      </div>
    </div>
  );
};

export default NewBanner;
