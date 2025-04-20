"use client";

import { motion } from "framer-motion";
import { Menu, X, Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const staticMenuItems = ["Home", "Courses", "Blogs", "Contact"];
  const menuItems =
    status === "authenticated"
      ? [...staticMenuItems.slice(0, 2), "Dashboard", ...staticMenuItems.slice(2)]
      : staticMenuItems;

  const getRoute = (item) => {
    switch (item) {
      case "Home":
        return "/";
      case "Courses":
        return "/courses";
      case "Dashboard":
        return session?.user?.role === "educator"
          ? "/dashboard/educatorHome"
          : "/dashboard/studentHome";
      case "Blogs":
        return "/blogs";
      case "Contact":
        return "/contact";
      default:
        return "/";
    }
  };

  const handleSignOut = () => {
    signOut();
    setIsOpen(false);
  };

  if (!isClient) return null;

  return (
    <nav className="sticky top-0 left-0 w-full bg-white dark:bg-gray-900 shadow z-50 transition-all">
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
          <span className="text-2xl font-bold text-teal-600 dark:text-white">EduGenie</span>
        </Link>

        {/* Right Side (Desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={getRoute(item)}
              onClick={() => setIsOpen(false)}
              className="text-gray-800 dark:text-gray-300 hover:text-teal-600 transition-colors"
            >
              {item}
            </Link>
          ))}

          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded-md border dark:bg-gray-800 dark:border-gray-700 dark:text-white text-sm focus:outline-teal-500"
          />

          {/* Bell Icon */}
          <button className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
            <Bell size={20} />
          </button>

          {/* Auth Section */}
          {status === "authenticated" ? (
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <Image
                  src={session?.user?.image ?? "/profile.png"}
                  alt={session?.user?.name ?? "User Profile"}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-teal-500 object-cover transition-transform duration-300 group-hover:scale-110 shadow-md"
                />
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 whitespace-nowrap">
                  {session?.user?.name ?? "User"}
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="cursor-pointer px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-700 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-800 px-6 py-4 space-y-4 shadow-lg"
        >
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={getRoute(item)}
              onClick={() => setIsOpen(false)}
              className="block text-gray-800 dark:text-gray-300 hover:text-teal-600 transition"
            >
              {item}
            </Link>
          ))}

          <div className="pt-4 space-y-3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 rounded-md border dark:bg-gray-800 dark:border-gray-700 dark:text-white text-sm focus:outline-teal-500"
            />
            <button className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
              <Bell size={20} />
            </button>
            {status === "authenticated" ? (
              <div className="flex items-center space-x-3 pt-2">
                <div className="relative group">
                  <Image
                    src={session?.user?.image ?? "/profile.png"}
                    alt={session?.user?.name ?? "User Profile"}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-teal-500 object-cover transition-transform duration-300 group-hover:scale-110 shadow-md"
                  />
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 whitespace-nowrap">
                    {session?.user?.name ?? "User"}
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="cursor-pointer px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
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