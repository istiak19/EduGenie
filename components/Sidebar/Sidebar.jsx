"use client";

import EducatorPanel from "@/components/Dashboard/EducatorPanel/EducatorPanel";
import StudentPanel from "@/components/Dashboard/StudentPanel/StudentPanel";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Sidebar = () => {
    const { data: session, status } = useSession();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("https://genie-one-xi.vercel.app/api/user");
                const data = await res.json();
                setUsers(data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        };
        fetchUser();
    }, []);

    if (status === "loading" || loading) {
        return <div className="p-4 text-white">Loading sidebar...</div>;
    }

    const roleUser = users.find(user => user?.email === session?.user?.email);

    return (
        <div className="text-white">
            <ul className="menu p-4">
                {roleUser?.role === "educator" && <EducatorPanel />}
                {roleUser?.role === "student" && <StudentPanel />}
            </ul>
        </div>
    );
};

export default Sidebar;