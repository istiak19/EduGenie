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
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "linear",
  };

  const features = [
    { id: 1, text: "AI-Powered Course Generation", color: "bg-blue-500" },
    { id: 2, text: "Personalized Learning Paths", color: "bg-green-500" },
    { id: 3, text: "Instant Course Summaries", color: "bg-yellow-500" },
    { id: 4, text: "Smart Quiz Generator", color: "bg-purple-500" },
    { id: 5, text: "Interactive Video Lessons", color: "bg-red-500" },
  ];

  return (
    <section className="relative flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-indigo-900 px-6 min-h-screen overflow-hidden text-white text-center">
      {/* Floating Animation Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-transparent opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      />
      <motion.div
        className="top-1/3 left-1/4 absolute bg-white opacity-20 blur-2xl rounded-full w-24 h-24"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      <motion.div
        className="right-1/4 bottom-1/3 absolute bg-yellow-300 opacity-30 blur-2xl rounded-full w-32 h-32"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />

      {/* Hero Content */}
      <div className="z-10 relative max-w-3xl">
        <motion.h1
          className="mb-4 font-extrabold text-5xl md:text-6xl"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className="text-yellow-300">EduGenie</span>
        </motion.h1>

        <motion.p
          className="mb-6 text-lg md:text-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          Revolutionizing learning with AI-powered course generation.
        </motion.p>

        <motion.button
          className="bg-yellow-400 hover:bg-yellow-500 shadow-lg px-8 py-3 rounded-lg font-bold text-gray-900 transition-all"
          whileHover={{ scale: 1.05 }}
        >
          Get Started
        </motion.button>
      </div>

      {/* Moving Slider Section */}
      <div className="z-10 relative mt-12 w-full max-w-4xl">
        <Slider {...settings}>
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className={`p-4 ${feature.color} text-center rounded-lg shadow-lg mx-2`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: feature.id * 0.2 }}
            >
              <p className="font-semibold text-lg">{feature.text}</p>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
}
