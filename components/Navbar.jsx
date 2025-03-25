"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md dark:bg-gray-900 transition-all z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo with animation */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div 
            initial={{ rotate: 0 }} 
            whileHover={{ rotate: 360 }} 
            transition={{ duration: 0.5 }}
          >
            <Image src="/Edugine-logo.png" alt="EduGenie Logo" width={40} height={40} />
          </motion.div>
          <span className="text-2xl font-bold text-blue-600 dark:text-white">EduGenie</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {["Home", "Courses","Generator" ,  "About", "Contact"].map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Link href={`/${item.toLowerCase()}`} className="text-gray-800 dark:text-gray-300 hover:text-blue-600 transition-colors">
                {item}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Authentication Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Login</Link>
          <Link href="/register" className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition">Sign Up</Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-800 px-6 py-4 space-y-4 shadow-lg"
        >
          {["/", "Courses","Generator" , "About", "Contact"].map((item, index) => (
            <Link key={index} href={`/${item.toLowerCase()}`} className="block text-gray-800 dark:text-gray-300 hover:text-blue-600 transition">
              {item}
            </Link>
          ))}
          <div className="flex flex-col space-y-2">
            <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700 transition">Login</Link>
            <Link href="/register" className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md text-center hover:bg-blue-600 hover:text-white transition">Sign Up</Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
