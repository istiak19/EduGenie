"use client";

import EducatorPanel from "@/components/Dashboard/EducatorPanel/EducatorPanel";
import StudentPanel from "@/components/Dashboard/StudentPanel/StudentPanel";
import { useSession } from "next-auth/react";

const Sidebar = () => {
    const { data: session } = useSession();

    return (
        <div className="text-white w-full">
            {
                session?.user?.role === "educator" && <EducatorPanel />
            }
            {
                session?.user?.role === "student" && <StudentPanel />
            }
        </div>
    );
};

export default Sidebar;