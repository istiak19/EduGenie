"use client";

import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HeroBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const features = [
    { id: 1, text: "AI-Powered Course Generation", icon: "📚" },
    { id: 2, text: "Personalized Learning Paths", icon: "🎯" },
    { id: 3, text: "Instant Course Summaries", icon: "⚡" },
    { id: 4, text: "Smart Quiz Generator", icon: "📝" },
    { id: 5, text: "Interactive Video Lessons", icon: "🎥" },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center py-20 bg-gray-900 text-white text-center px-6 md:px-12 lg:px-24 overflow-hidden">

      {/* Floating Animation Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-800 to-gray-900 opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="absolute top-1/3 left-1/4 w-16 h-16 bg-purple-500 opacity-30 rounded-full blur-3xl"
        animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-indigo-500 opacity-30 rounded-full blur-3xl"
        animate={{ y: [0, 10, 0], x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />

      {/* Hero Content */}
      <div className="z-10 relative max-w-3xl">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to EduGenie
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl mb-6 text-gray-300 px-2 sm:px-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          Empowering learners with AI-driven education solutions.
        </motion.p>

        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-bold hover:opacity-90 transition-all shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          Get Started
        </motion.button>
      </div>

      {/* Moving Slider Section */}
      <div className="relative mt-12 w-full max-w-5xl z-10">
        <Slider {...settings}>
          {features.map((feature) => (
            <div
              key={feature.id}
              className="p-6 bg-gray-800 text-center shadow-md transition-all duration-300 flex flex-col items-center justify-center border-l-10 border-l-blue-900"
            >
              <span className="text-4xl sm:text-5xl mb-4 text-purple-500">
                {feature.icon}
              </span>
              <p className="text-base sm:text-lg font-semibold text-white mt-5">
                {feature.text}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}