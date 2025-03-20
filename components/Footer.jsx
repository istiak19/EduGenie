"use client";

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-10 text-gray-300">
    <footer className="bg-gradient-to-br from-blue-600 to-indigo-900 py-10 text-white">
      <div className="gap-8 grid md:grid-cols-4 mx-auto px-6 max-w-6xl">
        {/* Column 1 - Logo & Intro */}
        <div>
          <h2 className="font-bold text-white text-3xl">EduGenie</h2>
          <p className="mt-2 text-gray-400">AI-powered learning made simple and effective.</p>
          <p className="mt-2 text-yellow-300">AI-powered learning made simple and effective....</p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="font-semibold text-white text-lg">Quick Links</h3>
          <ul className="space-y-2 mt-2">
            <li><a href="#" className="hover:text-blue-400">Home</a></li>
            <li><a href="#" className="hover:text-blue-400">Courses</a></li>
            <li><a href="#" className="hover:text-blue-400">Blog</a></li>
            <li><a href="#" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>

        {/* Column 3 - Resources */}
        <div>
          <h3 className="font-semibold text-white text-lg">Resources</h3>
          <ul className="space-y-2 mt-2">
            <li><a href="#" className="hover:text-blue-400">FAQs</a></li>
            <li><a href="#" className="hover:text-blue-400">Support</a></li>
            <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
          </ul>
        </div>

        {/* Column 4 - Social Media */}
        <div>
          <h3 className="font-semibold text-white text-lg">Follow Us</h3>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="hover:text-blue-400 text-xl"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-400 text-xl"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-400 text-xl"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-blue-400 text-xl"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-6 pt-4 border-gray-700 border-t text-gray-500 text-center">
      <div className="mt-6 pt-4 border-gray-700 border-t text-yellow-300 text-center">
        © {new Date().getFullYear()} EduGenie. All Rights Reserved.
      </div>
    </footer>
  );
}
