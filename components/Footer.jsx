"use client";

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        {/* Column 1 - Logo & Intro */}
        <div>
          <h2 className="text-3xl font-bold text-white">EduGenie</h2>
          <p className="mt-2 text-gray-400">AI-powered learning made simple and effective.</p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="hover:text-blue-400">Home</a></li>
            <li><a href="#" className="hover:text-blue-400">Courses</a></li>
            <li><a href="#" className="hover:text-blue-400">Blog</a></li>
            <li><a href="#" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>

        {/* Column 3 - Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white">Resources</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="hover:text-blue-400">FAQs</a></li>
            <li><a href="#" className="hover:text-blue-400">Support</a></li>
            <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
          </ul>
        </div>

        {/* Column 4 - Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="hover:text-blue-400 text-xl"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-400 text-xl"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-400 text-xl"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-blue-400 text-xl"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500">
        © {new Date().getFullYear()} EduGenie. All Rights Reserved.
      </div>
    </footer>
  );
}
