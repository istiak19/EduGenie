"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { FaHome, FaMicroblog } from "react-icons/fa";
import { GiPowerGenerator } from "react-icons/gi";
import { MdMessage, MdOutlineQuiz } from "react-icons/md";

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
            href: "/dashboard/educatorMessage",
            label: "Message",
            icon: <MdMessage className="text-lg" />,
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
            <ul className="flex flex-col gap-1 p-2 sm:p-4">
                {navItems.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200
                                ${pathname === item.href
                                    ? "bg-hidden text-white font-semibold"
                                    : "text-black/80 bg-hidden hover:text-black"}
                                  
                            `}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EducatorPanel;