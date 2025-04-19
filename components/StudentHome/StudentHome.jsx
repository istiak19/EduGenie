"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const StudentHome = () => {
    const { data: session } = useSession();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/user');
            const data = await res.json();
            setUsers(data);
        }
        fetchUser()
    }, []);

    const singleUser = users.find(user => user?.email === session?.user?.email)

    return (
        <div className="max-w-4xl mx-auto py-10">
            <div className="md:col-span-2 bg-white rounded-xl p-6 shadow-2xl">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Welcome to your dashboard, {singleUser?.name.split(" ")[0]}!
                </h1>

                {/* Example Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">Total Courses</h3>
                        <p className="text-3xl">6</p>
                    </div>
                    <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">Tasks Completed</h3>
                        <p className="text-3xl">24</p>
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">Pending Assignments</h3>
                        <p className="text-3xl">3</p>
                    </div>
                    <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">Messages</h3>
                        <p className="text-3xl">5</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentHome;