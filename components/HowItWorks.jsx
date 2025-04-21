"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Create Your Account",
      description: "Sign up and unlock access to personalized AI-driven learning.",
      icon: "👤",
    },
    {
      id: 2,
      title: "Pick Your Path",
      description: "Explore tailored courses based on your goals and interests.",
      icon: "🧭",
    },
    {
      id: 3,
      title: "Interactive Learning",
      description: "Dive into lessons, quizzes, and discussions with our AI assistant.",
      icon: "📖",
    },
    {
      id: 4,
      title: "Grow & Earn",
      description: "Track progress, earn certificates, and achieve career goals.",
      icon: "🌟",
    },
  ];

  const blogs = [
    {
      id: 1,
      title: "The Future of AI in Education",
      author: "Jane Doe",
      image: "https://i.ibb.co.com/xt52ghd8/2151133554.jpg",
    },
    {
      id: 2,
      title: "Design Thinking in Digital Classrooms",
      author: "Mark Taylor",
      image: "https://i.ibb.co.com/Y40rHqVM/10780697-19198666.jpg",
    },
    {
      id: 3,
      title: "How to Stay Focused While Studying Online",
      author: "Alex Morgan",
      image: "https://i.ibb.co.com/W4db5gwp/2149332867.jpg",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-[#f0f9ff] to-white px-4 py-10">
      {/* Section Header */}
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        How It Works
      </motion.h2>

      {/* Steps Timeline with Simulated Left Gradient Border */}
      <div className="max-w-4xl mx-auto space-y-10 relative pl-10">
        {/* Simulated Gradient Border */}
        <motion.div
          className="absolute top-0 left-4 bottom-0 w-1 bg-gradient-to-b from-teal-400 to-cyan-500 rounded-full"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "100%" }}
          transition={{ duration: 1 }}
        />

        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
          >
            <div className="absolute -left-[42px] top-4 text-2xl bg-teal-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg ring-4 ring-white">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Blog Section Header */}
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-center text-gray-80 pt-16 pb-10  px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📚 Featured Blogs
      </motion.h2>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {blogs.map((blog) => (
          <motion.div
            key={blog.id}
            whileHover={{ scale: 1.03 }}
            className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 object-cover group-hover:brightness-75 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-6 flex flex-col justify-end">
              <h3 className="text-xl font-bold text-white mb-1 group-hover:underline">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-200 flex items-center gap-2">
                <span>👤</span> {blog.author}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Button */}
      <div className="pt-10 text-center px-4">
        <Link href="/blogs">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 cursor-pointer py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full shadow-md ring-2 ring-transparent hover:ring-teal-400 transition-all duration-300"
          >
            Explore All Blogs ✨
          </motion.button>
        </Link>
      </div>
    </section>
  );
}