"use client";

import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HeroBanner() {
  const settings = {
    dots: false,
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
    { id: 1, text: "AI-Powered Course Generation", color: "bg-indigo-500" },
    { id: 2, text: "Personalized Learning Paths", color: "bg-emerald-500" },
    { id: 3, text: "Instant Course Summaries", color: "bg-orange-400" },
    { id: 4, text: "Smart Quiz Generator", color: "bg-fuchsia-500" },
    { id: 5, text: "Interactive Video Lessons", color: "bg-rose-500" },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center pb-28 pt-32 bg-gradient-to-br from-indigo-600 via-sky-700 to-indigo-900 text-white text-center px-6 md:px-12 lg:px-24 overflow-hidden">

      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-900 to-transparent opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="absolute top-1/3 left-1/4 w-16 md:w-24 h-16 md:h-24 bg-white opacity-30 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-24 md:w-32 h-24 md:h-32 bg-orange-300 opacity-20 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />

      <div className="z-10 relative max-w-3xl">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight leading-tight"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className="text-orange-300">EduGenie</span>
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
          className="px-6 sm:px-8 py-3 bg-orange-400 text-gray-900 rounded-lg font-bold hover:bg-orange-500 transition-all shadow-xl hover:scale-105"
          whileHover={{ scale: 1.05 }}
        >
          Get Started
        </motion.button>
      </div>

      <div className="relative mt-12 w-full max-w-5xl z-10">
        <Slider {...settings}>
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className={`p-6 ${feature.color} text-center rounded-xl shadow-2xl mx-2 flex items-center justify-center hover:scale-105 transition-all`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: feature.id * 0.2 }}
            >
              <p className="text-base sm:text-lg font-semibold text-white">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
