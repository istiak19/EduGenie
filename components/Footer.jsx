"use client";

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-teal-600  py-10 text-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        
        {/* Column 1 - Logo & Intro */}
        <div>
          <h2 className="text-3xl font-bold">EduGenie</h2>
          <p className="mt-2 text-gray-400">AI-powered learning made simple and effective.</p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="hover:text-blue-400">Home</a></li>
            <li><a href="#" className="hover:text-blue-400">Courses</a></li>
            <li><a href="#" className="hover:text-blue-400">Blog</a></li>
            <li><a href="#" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>

        {/* Column 3 - Resources */}
        <div>
          <h3 className="text-lg font-semibold">Resources</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="hover:text-blue-400">FAQs</a></li>
            <li><a href="#" className="hover:text-blue-400">Support</a></li>
            <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
          </ul>
        </div>

        {/* Column 4 - Social Media */}
        <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="mt-3 flex space-x-4">
            <a href="#" className="text-xl hover:text-blue-400"><FaFacebookF /></a>
            <a href="#" className="text-xl hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="text-xl hover:text-blue-400"><FaLinkedinIn /></a>
            <a href="#" className="text-xl hover:text-blue-400"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-gray-300">
        © {new Date().getFullYear()} EduGenie. All Rights Reserved.
      </div>
    </footer>
  );
}
