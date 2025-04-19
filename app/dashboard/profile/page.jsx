"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Profile = () => {
    const { data: session } = useSession();
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
        <div className="flex justify-center items-center p-6">
            <div className="bg-white border border-teal-300 shadow-xl rounded-xl p-8 max-w-md w-full text-center">
                <div className="flex justify-center items-center">
                    <Image
                        src={singleUser?.photo || "/assets/profile.png"}
                        alt="User"
                        width={112}
                        height={112}
                        className="rounded-full border w-28 h-28"
                    />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{singleUser?.name}</h2>
                <p className="text-sm text-gray-600">{singleUser?.email}</p>
                <Link href={`profile/${singleUser?._id}`}
                    className="mt-6 px-6 py-2 btn bg-teal-500 text-white rounded-lg hover:bg-teal-700"
                >
                    Edit Profile
                </Link>
            </div>
        </div>
    );
};

export default Profile;