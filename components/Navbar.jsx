"use client";

import { motion } from "framer-motion";
import { Menu, X, Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname for active route detection

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname(); // Get the current route

  const menuItems = ["Home", "Courses", "Generator", "Contact", "Blogs"];

  const getRoute = (item) => (item === "Home" ? "/" : `/${item.toLowerCase()}`);

  const handleSignOut = () => {
    signOut();
    setIsOpen(false);
  };

  const userRole = session?.user?.role;

  return (
    <nav className="sticky top-0 left-0 w-full bg-gray-900 text-white shadow z-50 transition-all">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo & Brand Name */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Image src="/Edugine-logo.png" alt="EduGenie Logo" width={40} height={40} />
          </motion.div>
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
            EduGenie
          </span>
        </Link>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Menu Items */}
          {menuItems.map((item, index) => {
            const isActive = pathname === getRoute(item); // Check if the current route matches
            return (
              <Link
                key={index}
                href={getRoute(item)}
                className={`relative text-gray-300 hover:text-white transition-colors ${
                  isActive ? "font-bold" : ""
                }`}
              >
                {item}
                {isActive && (
                  <motion.span
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-400"
                  />
                )}
              </Link>
            );
          })}

          {/* Dashboard Dropdown */}
          {status === "authenticated" && userRole && (
            <div className="relative group cursor-pointer">
              <span className="text-gray-300 hover:text-white transition">Dashboard</span>
              <div className="absolute top-full mt-2 w-56 bg-white dark:bg-gray-800 shadow-md rounded-md p-2 hidden group-hover:block z-50">
                {userRole === "educator" && (
                  <Link
                    href="/dashboard/educatorHome"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    Educator Panel
                  </Link>
                )}
                {userRole === "student" && (
                  <Link
                    href="/dashboard/studentHome"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    Student Panel
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded-md border border-white/20 bg-transparent text-sm focus:outline-none focus:border-teal-400 transition"
          />

          {/* Bell Icon */}
          <button className="text-gray-300 hover:text-white transition">
            <Bell size={20} />
          </button>

          {/* Profile Image or Login */}
          {status === "authenticated" ? (
            <div className="flex items-center space-x-3">
              <Image
                src={session?.user?.image || "/default-profile.png"}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full border-2 border-teal-400"
              />
              <button
                onClick={handleSignOut}
                className="px-3 py-1 text-sm bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded hover:from-purple-500 hover:to-pink-500 transition"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md hover:from-purple-500 hover:to-pink-500 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-white transition"
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-950 text-white px-6 py-4 space-y-4 shadow-lg"
        >
          {menuItems.map((item, index) => {
            const isActive = pathname === getRoute(item); // Check if the current route matches
            return (
              <Link
                key={index}
                href={getRoute(item)}
                onClick={() => setIsOpen(false)}
                className={`block ${isActive ? "font-bold" : ""} text-gray-300 hover:text-white transition relative`}
              >
                {item}
                {isActive && (
                  <motion.span
                    layoutId="underline-mobile"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-400"
                  />
                )}
              </Link>
            );
          })}

          {/* Dashboard Mobile */}
          {status === "authenticated" && userRole && (
            <div className="pt-2">
              <span className="block text-gray-300 font-semibold">Dashboard</span>
              {userRole === "educator" && (
                <Link
                  href="/dashboard/educatorHome"
                  onClick={() => setIsOpen(false)}
                  className="block pl-4 py-2 text-sm text-gray-300 hover:text-white rounded"
                >
                  Educator Panel
                </Link>
              )}
              {userRole === "student" && (
                <Link
                  href="/dashboard/studentHome"
                  onClick={() => setIsOpen(false)}
                  className="block pl-4 py-2 text-sm text-gray-300 hover:text-white rounded"
                >
                  Student Panel
                </Link>
              )}
            </div>
          )}

          {/* Mobile Search + Bell + Auth */}
          <div className="pt-4 space-y-3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 rounded-md border border-white/20 bg-transparent text-sm focus:outline-none focus:border-teal-400 transition"
            />
            <button className="text-gray-300 hover:text-white transition">
              <Bell size={20} />
            </button>
            {status === "authenticated" ? (
              <div className="flex items-center space-x-3 pt-2">
                <Image
                  src={session?.user?.image || "/default-profile.png"}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-teal-400"
                />
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1 text-sm bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded hover:from-purple-500 hover:to-pink-500 transition"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md hover:from-purple-500 hover:to-pink-500 transition"
              >
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}