"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Sign Up",
      description: "Create your free EduGenie account in seconds.",
      icon: "👤",
    },
    {
      id: 2,
      title: "Select Your Course",
      description: "Choose from AI-generated courses tailored to your needs.",
      icon: "📚",
    },
    {
      id: 3,
      title: "Learn & Engage",
      description: "Interact with AI-powered lessons and community discussions.",
      icon: "🧠",
    },
    {
      id: 4,
      title: "Achieve Your Goals",
      description: "Track your progress and unlock new opportunities!",
      icon: "🏆",
    },
  ];

  const blogs = [
    {
      id: 1,
      title: "Mastering AI in Education",
      author: "By Jane Doe",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPiTkIL31u1Jplh2A6kouDuCb5PtC4dSEJIQ&s",
    },
    {
      id: 2,
      title: "Top 10 Learning Hacks",
      author: "By John Smith",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUtP3_BAREFiO-T45XAC620wiE6RWYAifoIg&s",
    },
    {
      id: 3,
      title: "Why AI is the Future of Learning",
      author: "By Alex Brown",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQluAH3XJcELIidT_K1I9d2EWUNKL1WZXzw0w&s",
    },
  ];

  return (
    <section className="bg-white px-6 py-16">
      {/* "How It Works" Section */}
      <motion.h2
        className="mb-10 font-bold text-gray-800 text-4xl text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        How It Works...!
      </motion.h2>

      <div className="gap-8 grid md:grid-cols-4 mx-auto max-w-6xl">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            className="p-6 bg-teal-500 text-black text-center rounded-lg shadow-md"


            whileHover={{ scale: 1.05 }}
          >
            <div className="text-5xl">{step.icon}</div>
            <h3 className="mt-4 font-bold text-xl">{step.title}</h3>
            <p className="mt-2 text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Blog Showcase Section */}
      <motion.h2
        className="mt-20 mb-10 font-bold text-gray-800 text-4xl text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Featured Blogs
      </motion.h2>

      <div className="gap-8 grid md:grid-cols-3 mx-auto max-w-6xl">
        {blogs.map((blog) => (
          <motion.div
            key={blog.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{blog.title}</h3>
              <p className="text-gray-600">{blog.author}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Write a Blog Button */}
      <div className="mt-12 text-center">
        <Link href="/blogs">
          <motion.button
            className="bg-teal-500 btn hover:bg-teal-700 px-4 py-6 rounded-lg font-bold text-black transition-all"
            whileHover={{ scale: 1.05 }}
          >
            Write a Blog ✍️
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
