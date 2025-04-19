"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CourseCarousel() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Tech", "Business", "Design", "AI", "Marketing"];

  const courses = [
    {
      id: 1,
      title: "React Mastery",
      category: "Tech",
      rating: 5,
      image:
        "https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/fGWjtyQtG4JE7UXgaPAN",
    },
    {
      id: 2,
      title: "AI for Beginners",
      category: "AI",
      rating: 4.8,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSQFRsxKxu79JnjJSlkrhAA_wEZFzfUfBqmQ&s",
    },
    {
      id: 3,
      title: "Business Growth Strategies",
      category: "Business",
      rating: 4.9,
      image:
        "https://blog.byldgroup.com/wp-content/uploads/2023/11/Business-Growth.jpg",
    },
    {
      id: 4,
      title: "UI/UX Design Basics",
      category: "Design",
      rating: 4.7,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxM5FokizcINMEKDwmx3woJMXBO8GmMhqm1Q&s",
    },
    {
      id: 5,
      title: "Digital Marketing",
      category: "Marketing",
      rating: 4.6,
      image: "/Digital-Marketing-1.jpg",
    },
  ];

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((course) => course.category === activeCategory);

  // Dynamically adjust slidesToShow based on the number of filtered courses
  const slidesToShow = Math.min(3, filteredCourses.length || 1);

  const settings = {
    dots: true,
    infinite: filteredCourses.length > 1, // Only enable infinite scrolling if there's more than one slide
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: filteredCourses.length > 1, // Only autoplay if there's more than one slide
    autoplaySpeed: 2500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, filteredCourses.length || 1),
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: Math.min(1, filteredCourses.length || 1),
        },
      },
    ],
  };

  return (
    <section className="py-16 bg-[#1B1833] text-center text-white">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600 mb-8 px-4">
        Explore Our Courses
      </h2>

      {/* Category Filters */}
      <div className="flex flex-col md:flex-row justify-center gap-2 sm:gap-4 mb-8 px-4">
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
              activeCategory === category
                ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.05 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Course Slider */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Key Prop Added Here */}
        <Slider {...settings} key={activeCategory}>
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              className="px-2 max-w-2xl"
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative group bg-gray-800 shadow-md overflow-hidden hover:border-b-purple-500 hover:border-b-4 transition duration-300">
                {/* Category Badge */}
                <span className="absolute top-4 left-2 bg-purple-500 text-white text-xs font-medium px-3 py-1 rounded-full z-10">
                  {course.category}
                </span>

                {/* Image with Zoom Effect */}
                <motion.img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 md:h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
                />

                {/* Course Info */}
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                  <p className="text-yellow-400 text-sm">⭐ {course.rating}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
}