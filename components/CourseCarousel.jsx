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
    { id: 1, title: "React Mastery", category: "Tech", rating: 5, image: "https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/fGWjtyQtG4JE7UXgaPAN" },
    { id: 2, title: "AI for Beginners", category: "AI", rating: 4.8, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSQFRsxKxu79JnjJSlkrhAA_wEZFzfUfBqmQ&s" },
    { id: 3, title: "Business Growth Strategies", category: "Business", rating: 4.9, image: "https://blog.byldgroup.com/wp-content/uploads/2023/11/Business-Growth.jpg" },
    { id: 4, title: "UI/UX Design Basics", category: "Design", rating: 4.7, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxM5FokizcINMEKDwmx3woJMXBO8GmMhqm1Q&s" },
    { id: 5, title: "Digital Marketing", category: "Marketing", rating: 4.6, image: "/Digital-Marketing-1.jpg" },
  ];

  const filteredCourses = activeCategory === "All"
    ? courses
    : courses.filter(course => course.category === activeCategory);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold text-yellow-400 mb-8">Explore Our Courses</h2>

      {/* Category Filters */}
      <div className="flex justify-center gap-4 mb-8">
        {categories.map(category => (
          <motion.button
            key={category}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeCategory === category ? "bg-yellow-400 text-gray-900" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.1 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Course Slider */}
      <div className="max-w-5xl mx-auto">
        <Slider {...settings}>
          {filteredCourses.map(course => (
            <motion.div key={course.id} className="p-4">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  <p className="text-yellow-500">⭐ {course.rating}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>

      {/* Success Stories Section */}
      <div className="mt-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Success Stories</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            className="p-6 bg-yellow-400 text-gray-900 shadow-lg rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-gray-900">
              "EduGenie helped me transition from a beginner to a full-stack developer in 3 months!"
            </p>
            <h4 className="font-bold mt-2">- Alex Johnson</h4>
          </motion.div> 

          <motion.div
            className="p-6 bg-yellow-400 text-gray-900 shadow-lg rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-gray-900">
              "The AI-powered learning paths made studying so much easier. Highly recommend!"
            </p>
            <h4 className="font-bold mt-2">- Sarah Lee</h4>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
