"use client";

import { motion } from "framer-motion";
import { Menu, X, Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  // const [users, setUsers] = useState([]);
  // useEffect(() => {
  //     const fetchUser = async () => {
  //         const res = await fetch('/api/user');
  //         const data = await res.json();
  //         setUsers(data);
  //     }
  //     fetchUser()
  // }, []);

  // const roleUser = users.find(user => user?.email === session?.user?.email)

  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  
  const menuItems = ["Home", "Courses", "Generator", "Contact", "Blogs"];

  const getRoute = (item) => (item === "Home" ? "/" : `/${item.toLowerCase()}`);

  const handleSignOut = () => {
    signOut();
    setIsOpen(false);
  };

  const userRole = session?.user?.role;
  // addedddd
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

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-6">
          
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={getRoute(item)}
              className="text-gray-800 dark:text-gray-300 hover:text-teal-600 transition-colors"
            >
              {item}
            </Link>
          ))}

          {/* Dashboard Dropdown */}
          {status === "authenticated" && userRole && (
            <div className="relative group cursor-pointer">
              <span className="text-gray-800 dark:text-gray-300 hover:text-teal-600 transition">Dashboard</span>
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
            className="px-3 py-1 rounded-md border dark:bg-gray-800 dark:border-gray-700 dark:text-white text-sm focus:outline-teal-500"
          />

          {/* Bell Icon */}
          <button className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
            <Bell size={20} />
          </button>

          {/* Profile Image or Login */}
          {status === "authenticated" ? (
            <div className="flex items-center space-x-3">
              <Image
                src={session.user?.image || "/default-profile.png"}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full border-2 border-teal-500"
              />
              <button
                onClick={handleSignOut}
                className="px-3 py-1 text-sm bg-teal-600 text-white rounded hover:bg-teal-700 transition"
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

        {/* Mobile Menu Icon */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
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

          {/* Dashboard Mobile */}
          {status === "authenticated" && userRole && (
            <div className="pt-2">
              <span className="block text-gray-600 dark:text-gray-300 font-semibold">Dashboard</span>
              {userRole === "educator" && (
                <Link
                  href="/educator"
                  onClick={() => setIsOpen(false)}
                  className="block pl-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  Educator Panel
                </Link>
              )}
              {userRole === "student" && (
                <Link
                  href="/student"
                  onClick={() => setIsOpen(false)}
                  className="block pl-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
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
              className="w-full px-3 py-2 rounded-md border dark:bg-gray-800 dark:border-gray-700 dark:text-white text-sm focus:outline-teal-500"
            />
            <button className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
              <Bell size={20} />
            </button>
            {status === "authenticated" ? (
              <div className="flex items-center space-x-3 pt-2">
                <Image
                  src={session.user?.image || "/default-profile.png"}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-teal-500"
                />
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1 text-sm bg-teal-600 text-white rounded hover:bg-teal-700 transition"
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
