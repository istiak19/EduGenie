"use client";

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-teal-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-3xl font-bold text-white">EduGenie</h2>
          <p className="mt-3 text-gray-300 text-sm leading-relaxed">
            Empowering learners through AI-powered personalized education.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-yellow-300 transition-colors">Home</a>
            </li>
            <li>
              <a href="/courses" className="hover:text-yellow-300 transition-colors">Courses</a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition-colors">Blog</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-yellow-300 transition-colors">Contact</a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-yellow-300 transition-colors">FAQs</a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition-colors">Support</a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition-colors">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition-colors">Terms of Service</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-xl hover:text-yellow-300 transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="text-xl hover:text-yellow-300 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="text-xl hover:text-yellow-300 transition-colors">
              <FaLinkedinIn />
            </a>
            <a href="#" className="text-xl hover:text-yellow-300 transition-colors">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-teal-500 pt-6 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} <span className="font-semibold text-white">EduGenie</span>. All rights reserved.
      </div>
    </footer>
  );
}