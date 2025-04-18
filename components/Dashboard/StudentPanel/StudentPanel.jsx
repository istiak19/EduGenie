import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";

const StudentPanel = () => {
    return (
        <div className="w-full">
            <ul className="menu p-4 space-y-2 text-base lg:text-lg">
                <li>
                    <Link
                        href="/dashboard/studentHome"
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-teal-100 transition-colors duration-200"
                    >
                        <FaHome className="text-xl" />
                        <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/dashboard/profile"
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-teal-100 transition-colors duration-200"
                    >
                        <CgProfile className="text-xl" />
                        <span>Profile</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default StudentPanel;