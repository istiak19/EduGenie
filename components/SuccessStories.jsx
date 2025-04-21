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
      image: "https://my.clevelandclinic.org/-/scassets/images/org/patient-experience/patient-stories/724-new-endoscopy-procedure-simplifies-testing-for-chronic-condition/new-endoscopy-procedure-simplifies-testing-1.jpg?mw=430&hash=6E0EB93BD41E0AA3595929E89D21B7C09E960D43",
    },
    {
      id: 2,
      name: "Mark Robinson",
      text: "The interactive courses and personalized AI recommendations helped me upskill faster than ever.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNsxeqTj16QraEJsrpxM8om5YUn83B2JxOqA&s",
    },

  ];

  return (
    <section className="bg-gray-100 py-20 px-4 sm:px-6 lg:px-8 text-center">
      {/* Section Header */}
      <motion.h2
        className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🎉 Real Stories. Real Impact.
      </motion.h2>
      <p className="text-base sm:text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
        See how EduGenie is transforming lives with AI-powered learning.
      </p>

      {/* Statistics */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-16">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-md px-6 py-8 rounded-2xl w-40 sm:w-48"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-3xl font-bold text-blue-600">{stat.label}</h3>
            <p className="text-gray-700 mt-1 text-sm">{stat.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Success Stories */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 px-2">
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            className="p-6 bg-white shadow-md rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-left"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="text-gray-700 text-sm sm:text-base">"{testimonial.text}"</p>
              <h4 className="font-semibold mt-2 text-blue-600">{testimonial.name}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Chat Preview */}
      <div className="mt-20 px-2">
        <motion.div
          className="max-w-lg mx-auto bg-white shadow-lg p-6 sm:p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-3">💬 Meet Your AI Assistant</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Ask anything about your learning journey!
          </p>

          {/* Chat Bubble */}
          <motion.div
            className="bg-teal-500 text-white p-3 rounded-lg mt-4 inline-block text-left text-sm sm:text-base shadow-sm"
            whileHover={{ scale: 1.05 }}
          >
            <p>📢 "How can I help you learn today?"</p>
          </motion.div>

          {/* Chat Input Preview */}
          <div className="mt-4 flex border rounded-lg overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder="Ask something..."
              className="w-full p-3 text-sm sm:text-base outline-none"
            />
            <button className="bg-teal-500 text-white px-5 text-sm sm:text-base font-medium">➤</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}