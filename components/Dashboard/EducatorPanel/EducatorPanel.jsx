"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { FaHome, FaMicroblog } from "react-icons/fa";
import { GiPowerGenerator } from "react-icons/gi";
import { MdOutlineQuiz } from "react-icons/md";

const EducatorPanel = () => {
    const pathname = usePathname();

    const navItems = [
        {
            href: "/dashboard/educatorHome",
            label: "Home",
            icon: <FaHome className="text-lg" />,
        },
        {
            href: "/dashboard/profile",
            label: "Profile",
            icon: <CgProfile className="text-lg" />,
        },
        {
            href: "/dashboard/generator",
            label: "Generator",
            icon: <GiPowerGenerator className="text-lg" />,
        },
        {
            href: "/dashboard/educatorCreateBlog",
            label: "Create Blog",
            icon: <FaMicroblog className="text-lg" />,
        },
        {
            href: "/dashboard/educatorApprovalBlog",
            label: "Approval Blog",
            icon: <FaMicroblog className="text-lg" />,
        },
        {
            href: "/dashboard/quizAddForm",
            label: "Add New Quiz",
            icon: <MdOutlineQuiz className="text-lg" />,
        },
    ];

    return (
        <div className="w-full">
            <ul className="menu p-4 space-y-1 text-sm">
                {navItems.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-all duration-200
                                ${pathname === item.href
                                    ? "text-white/80 font-medium"
                                    : "text-gray-700 hover:text-teal-500"
                                }`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EducatorPanel;