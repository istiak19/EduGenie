"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const EducatorHome = () => {
    const { data: session } = useSession();
    console.log(session)

    useEffect(() => {
        console.log("Role:", session?.user?.role);
    }, [session]);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/user');
            const data = await res.json();
            setUsers(data);
        };
        fetchUser();
    }, []);

    const singleUser = users.find(user => user?.email === session?.user?.email);

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="bg-white rounded-xl p-6 shadow-2xl">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
                    Welcome to your dashboard, {singleUser?.name?.split(" ")[0]}!
                </h1>

                {/* Responsive Dashboard Widgets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-blue-100 text-blue-800 p-5 rounded-lg shadow-sm text-center">
                        <h3 className="text-lg font-semibold mb-2">Total Courses</h3>
                        <p className="text-3xl font-bold">6</p>
                    </div>
                    <div className="bg-green-100 text-green-800 p-5 rounded-lg shadow-sm text-center">
                        <h3 className="text-lg font-semibold mb-2">Tasks Completed</h3>
                        <p className="text-3xl font-bold">24</p>
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 p-5 rounded-lg shadow-sm text-center">
                        <h3 className="text-lg font-semibold mb-2">Pending Assignments</h3>
                        <p className="text-3xl font-bold">3</p>
                    </div>
                    <div className="bg-red-100 text-red-800 p-5 rounded-lg shadow-sm text-center">
                        <h3 className="text-lg font-semibold mb-2">Messages</h3>
                        <p className="text-3xl font-bold">5</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EducatorHome;