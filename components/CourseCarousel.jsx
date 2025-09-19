"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CourseCarousel() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Programming",
    "Health",
    "Creative",
    "Marketing",
    "Design",
    "Business",
  ];

  const courses = [
    {
      id: 1,
      title: "React Mastery",
      category: "Programming",
      rating: 5,
      image:
        "https://i.ibb.co.com/8LMkMXSL/21743721-6518027.jpg",
    },
    {
      id: 2,
      title: "AI for Beginners",
      category: "Creative",
      rating: 4.8,
      image:
        "https://i.ibb.co.com/N6BSPk38/16304154-Tae-June15.jpg",
    },
    {
      id: 3,
      title: "Health & Wellness Basics",
      category: "Health",
      rating: 4.7,
      image:
        "https://i.ibb.co.com/DPVsbN4Z/3585182-66139.jpg",
    },
    {
      id: 4,
      title: "Digital Marketing",
      category: "Marketing",
      rating: 4.6,
      image: "https://i.ibb.co.com/Nnptm4WN/167088.jpg",
    },
    {
      id: 5,
      title: "UI/UX Design Basics",
      category: "Design",
      rating: 4.7,
      image:
        "https://i.ibb.co.com/5h0JGcM1/16683353-5757453.jpg",
    },
    {
      id: 6,
      title: "Business Growth Strategies",
      category: "Business",
      rating: 4.9,
      image:
        "https://blog.byldgroup.com/wp-content/uploads/2023/11/Business-Growth.jpg",
    },
  ];

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((course) => course.category === activeCategory);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "ease-in-out",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const { scrollY } = useScroll();
  const translateY = useTransform(scrollY, [0, 300], [0, -100]);

  return (
    <section className="relative overflow-hidden py-10 bg-gradient-to-br from-sky-100 via-white to-cyan-100">
      {/* Parallax Backgrounds */}
      <motion.div
        style={{ y: translateY }}
        className="absolute top-0 left-0 w-full h-72 bg-gradient-to-br from-teal-300 to-cyan-500 opacity-10 z-0"
      />
      <motion.div
        className="absolute top-24 right-10 w-40 h-40 bg-pink-300 rounded-full blur-3xl opacity-30 z-0"
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-48 h-48 bg-purple-300 rounded-full blur-3xl opacity-20 z-0"
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      {/* Section Title */}
      <motion.h2
        className="relative text-4xl sm:text-5xl font-extrabold text-center text-teal-700 mb-8 z-10 drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        ✨ Discover Our Top Courses
      </motion.h2>

      {/* Category Filter Buttons */}
      <div className="relative z-10 flex flex-wrap justify-center gap-2 md:gap-4 mb-12 px-4 pt-5">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full font-semibold text-sm sm:text-base backdrop-blur-md border cursor-pointer transition-all shadow-md ${activeCategory === category
              ? "bg-teal-600 text-white border-teal-700"
              : "bg-white text-gray-700 border-gray-300"
              }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Course Carousel */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <Slider {...settings}>
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              className="px-2"
              whileHover={{ scale: 1.04, y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-white hover:border-teal-400 transition-all duration-300">
                <span className="absolute top-3 left-3 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                  {course.category}
                </span>

                <motion.img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-44 md:h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold text-gray-800 tracking-tight">
                    {course.title}
                  </h3>
                  <p className="text-yellow-500 text-sm">⭐ {course.rating}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
}