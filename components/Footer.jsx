"use client";

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
      {/* Floating Animation Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-800 to-gray-900 opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-purple-500 opacity-30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-indigo-500 opacity-30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 z-10 relative">
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            EduGenie
          </h2>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed">
            Empowering learners through AI-powered personalized education.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-purple-400">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="/" className="hover:text-purple-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/courses" className="hover:text-purple-400 transition-colors">
                Courses
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-purple-400 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-purple-400">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-purple-400 transition-colors">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-purple-400">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-xl text-gray-400 hover:text-purple-400 transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="text-xl text-gray-400 hover:text-purple-400 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="text-xl text-gray-400 hover:text-purple-400 transition-colors">
              <FaLinkedinIn />
            </a>
            <a href="#" className="text-xl text-gray-400 hover:text-purple-400 transition-colors">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-purple-500 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-purple-400">EduGenie</span>. All rights reserved.
      </div>
    </footer>
  );
}