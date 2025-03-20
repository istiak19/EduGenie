"use client";

import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HeroBanner() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,  // Default for larger screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640, // Mobile
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const features = [
    { id: 1, text: "AI-Powered Course Generation", color: "bg-blue-500" },
    { id: 2, text: "Personalized Learning Paths", color: "bg-green-500" },
    { id: 3, text: "Instant Course Summaries", color: "bg-yellow-500" },
    { id: 4, text: "Smart Quiz Generator", color: "bg-purple-500" },
    { id: 5, text: "Interactive Video Lessons", color: "bg-red-500" },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-900 text-white text-center px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Floating Animation Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-transparent opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-16 md:w-24 h-16 md:h-24 bg-white opacity-20 rounded-full blur-2xl"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-24 md:w-32 h-24 md:h-32 bg-yellow-300 opacity-30 rounded-full blur-2xl"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-3xl">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className="text-yellow-300">EduGenie</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl mb-6 px-2 sm:px-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          Revolutionizing learning with AI-powered course generation.
        </motion.p>

        <motion.button
          className="px-6 sm:px-8 py-3 bg-yellow-400 text-gray-900 rounded-lg font-bold hover:bg-yellow-500 transition-all shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          Get Started
        </motion.button>
      </div>

      {/* Moving Slider Section */}
      <div className="relative mt-12 w-full max-w-4xl z-10 px-4">
        <Slider {...settings}>
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className={`p-4 ${feature.color} text-center rounded-lg shadow-lg mx-2`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: feature.id * 0.2 }}
            >
              <p className="text-base sm:text-lg font-semibold">{feature.text}</p>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
