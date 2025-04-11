"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Profile = () => {
    const { data: session } = useSession();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('https://genie-one-xi.vercel.app/api/user');
            const data = await res.json();
            setUsers(data);
        };
        fetchUser();
    }, []);

    const singleUser = users.find(user => user?.email === session?.user?.email);

    console.log(users, session)
    console.log(singleUser)

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
            <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center">
                <div className="w-28 h-28 mx-auto mb-4">
                    <Image
                        src={singleUser?.photo || "/default-user.png"}
                        alt="User"
                        width={112}
                        height={112}
                        className="rounded-full object-cover"
                    />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{singleUser?.name}</h2>
                <p className="text-sm text-gray-600">{singleUser?.email}</p>

                <button
                    onClick={() => router.push(`/dashboard/edit-profile/${singleUser?._id}`)}
                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default Profile;