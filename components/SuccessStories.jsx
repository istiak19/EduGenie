"use client";

import { motion } from "framer-motion";

export default function SuccessStories() {
  const stats = [
    { label: "100K+", text: "Students Empowered" },
    { label: "98%", text: "Satisfaction Rate" },
    { label: "50+", text: "Expert-Led Courses" },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sophia Patel",
      text: "EduGenie transformed my learning experience! I landed my first tech job after completing AI-powered courses.",
      image:
        "https://my.clevelandclinic.org/-/scassets/images/org/patient-experience/patient-stories/724-new-endoscopy-procedure-simplifies-testing-for-chronic-condition/new-endoscopy-procedure-simplifies-testing-1.jpg?mw=430&hash=6E0EB93BD41E0AA3595929E89D21B7C009E960D43",
    },
    {
      id: 2,
      name: "Mark Robinson",
      text: "The interactive courses and personalized AI recommendations helped me upskill faster than ever.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNsxeqTj16QraEJsrpxM8om5YUn83B2JxOqA&s",
    },
  ];

  return (
    <section className="bg-gray-900 py-16 px-6 text-center text-white relative overflow-hidden">
      {/* Floating Animation Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-800 to-gray-900 opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute top-1/4 left-1/4 w-16 h-16 bg-purple-500 opacity-30 rounded-full blur-3xl"
        animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-indigo-500 opacity-30 rounded-full blur-3xl"
        animate={{ y: [0, 10, 0], x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />

      {/* Section Header */}
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600 mb-6 z-10 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Real Stories. Real Impact.
      </motion.h2>
      <p className="text-md sm:text-lg text-gray-400 mb-10 px-4 z-10 relative">
        See how EduGenie is transforming lives with AI-powered learning.
      </p>

      {/* Statistics */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12 z-10 relative">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="relative p-6 rounded-lg w-40 sm:w-48 text-center border border-purple-500 hover:border-purple-400 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-purple-400">{stat.label}</h3>
            <p className="text-gray-400">{stat.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Success Stories */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 z-10 relative">
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            className="relative p-6 bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg rounded-lg flex flex-col sm:flex-row items-center gap-4 border border-purple-500 hover:border-purple-400 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
            />
            <div className="text-center sm:text-left">
              <p className="text-gray-400 italic">"{testimonial.text}"</p>
              <h4 className="font-semibold mt-2 text-purple-400">{testimonial.name}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Chat Preview */}
      <div className="mt-16 px-4 z-10 relative">
        <motion.div
          className="max-w-md mx-auto p-6 rounded-lg relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 border border-purple-500 hover:border-purple-400 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-lg sm:text-xl font-bold text-purple-400 mb-4">
            Meet Your AI Assistant
          </h3>
          <p className="text-gray-400 text-sm sm:text-base">
            Ask anything about your learning journey!
          </p>

          {/* Chat Bubble */}
          <motion.div
            className="bg-purple-500 text-white p-3 rounded-lg mt-4 inline-block text-left text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
          >
            <p>📢 "How can I help you learn today?"</p>
          </motion.div>

          {/* Chat Input Preview */}
          <div className="mt-4 flex border border-purple-500 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Ask something..."
              className="w-full p-2 text-sm sm:text-base bg-transparent text-white outline-none placeholder-gray-500"
            />
            <button className="bg-purple-500 text-white px-4 text-sm sm:text-base">
              ➤
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}