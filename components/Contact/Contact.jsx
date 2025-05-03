'use client';

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import bgImage from "../../public/assets/bgImage.png";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        e.target.reset();
      } else {
        const errData = await res.json();
        toast.error(errData?.error || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Server error! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <ToastContainer />
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 md:p-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-teal-600 mb-8 md:mb-12">
            Get In Touch With Us
          </h2>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Address Section */}
            <div className="md:w-1/2 space-y-6 text-gray-700">
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    Contact <span className="text-teal-600">Info</span>
                  </h2>
                  <span className="w-16 h-1 bg-teal-500 inline-block"></span>
                </div>
                <p className="text-gray-600 tracking-wide uppercase text-sm">
                  We are glad to have you around.
                </p>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">📞 Phone</p>
                <p>+880 1234 567 890</p>
              </div>
              <hr className="border-dashed border-gray-700" />

              {/* Email */}
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">📧 Email</p>
                <p>edugenie@example.com</p>
              </div>
              <hr className="border-dashed border-gray-700" />

              {/* Timings */}
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">🕒 Timings</p>
                <p>Sun - Thu: 9:00 AM - 6:00 PM</p>
                <p>Sat: 10:00 AM - 2:00 PM</p>
              </div>
              <hr className="border-dashed border-gray-700" />

              {/* Address */}
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">📍 Address</p>
                <p>1234 Teal Street, Green City, EG 56789</p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-gray-500"></div>

            {/* Contact Form Section */}
            <div className="md:w-1/2 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    Enquiry <span className="text-teal-600">Form</span>
                  </h2>
                  <span className="w-16 h-1 bg-teal-500 inline-block"></span>
                </div>
                <p className="text-gray-600 tracking-wide uppercase text-sm">
                  Get in Touch
                </p>
              </div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-medium mb-2">First Name</label>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="Your first name"
                    required
                    className="text-base w-full"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-2">Last Name</label>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Your last name"
                    required
                    className="text-base w-full"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="text-base w-full"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-2">Phone</label>
                  <Input
                    type="tel"
                    name="tel"
                    placeholder="+8801XXXXXXXXX"
                    required
                    className="text-base w-full"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-base font-medium mb-2">Message</label>
                  <Textarea
                    name="message"
                    placeholder="Type your message here..."
                    required
                    className="h-36 text-base w-full"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-teal-500 hover:bg-teal-700 text-white text-lg cursor-pointer"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url(${bgImage.src})`,
            }}
          ></div>

          {/* Color Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 opacity-40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto py-24 px-6 text-center text-gray-800">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-1 bg-yellow-400"></div>
            <h3 className="text-xl font-semibold tracking-wide uppercase">
              Stay Updated with EduGenie
            </h3>
            <div className="w-12 h-1 bg-yellow-400"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900">
            Unlock New Learning Possibilities
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-700">
            Join our monthly newsletter to get the latest AI-powered courses, educational blogs, quizzes,
            and more exciting updates from EduGenie.
          </p>

          {/* Email Input */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full py-4 px-6 rounded-full text-gray-700 placeholder-gray-400 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button className="absolute right-2 cursor-pointer top-2 bottom-2 px-4 bg-teal-500 hover:bg-teal-600 text-white rounded-full transition">
                ✈️
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[450px] my-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3267.131330201984!2d90.37483821489845!3d23.787857547286308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zLA!5e0!3m2!1sen!2sbd!4v1746006856337!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;