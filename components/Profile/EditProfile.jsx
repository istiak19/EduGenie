"use client";

import Loading from "@/components/Loading/Loading";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

const image_key = process.env.NEXT_PUBLIC_IMAGE_KEY;

const EditProfile = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        const fetchSingleUser = async () => {
            try {
                const res = await fetch(`/api/user/${params.id}`);
                const data = await res.json();
                setUser(data);
            } catch (error) {
                Swal.fire("Error", "Failed to fetch user data", "error");
            } finally {
                setLoading(false);
            }
        };

        if (params?.id) {
            fetchSingleUser();
        }
    }, [params?.id]);

    const handleProfile = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const name = e.target.name.value;
        let photoURL = user.photo;

        if (selectedPhoto) {
            const formData = new FormData();
            formData.append("image", selectedPhoto);

            const response = await fetch(`https://api.imgbb.com/1/upload?key=${image_key}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                Swal.fire("Image Upload Failed", "Please try again later", "error");
                setSubmitting(false);
                return;
            }

            const result = await response.json();
            photoURL = result.data.url;
        }

        const userInfo = { name, photo: photoURL };

        try {
            const res = await fetch(`/api/user/${user._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userInfo),
            });

            const data = await res.json();

            if (data.modifiedCount > 0) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Profile updated!",
                    showConfirmButton: false,
                    timer: 1200,
                });
                router.back();
            } else {
                Swal.fire("No Changes Made", "Nothing was updated", "info");
            }
        } catch (err) {
            Swal.fire("Error", "Something went wrong", "error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full flex justify-center items-center p-4 sm:p-6 md:p-8">
            {
                loading ? (
                    <div className="text-center text-xl font-semibold text-teal-600">
                        <Loading />
                    </div>
                ) : (
                    <div className="bg-white shadow-lg border border-teal-300 rounded-xl p-8 w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[600px]">
                        <h2 className="text-3xl font-semibold text-center mb-6">Edit Profile</h2>
                        {
                            user && (
                                <>
                                    <div className="flex justify-center items-center mb-6">
                                        {
                                            user?.photo ? (
                                                <Image
                                                    src={user.photo}
                                                    alt="User"
                                                    width={112}
                                                    height={112}
                                                    className="rounded-full border w-28 h-28 object-cover"
                                                />
                                            ) : (
                                                <div className="w-28 h-28 flex items-center justify-center rounded-full border border-teal-500 bg-gray-200 text-teal-600 font-bold text-3xl">
                                                    {user?.name?.[0]?.toUpperCase() ?? ""}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <form onSubmit={handleProfile} className="space-y-4">
                                        <div>
                                            <label className="block mb-1 font-medium text-gray-700">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                defaultValue={user?.name}
                                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-medium text-gray-700">Photo</label>
                                            <input
                                                name="photo"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setSelectedPhoto(e.target.files[0])}
                                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-medium text-gray-700">Email</label>
                                            <input
                                                type="email"
                                                value={user.email}
                                                readOnly
                                                className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-500"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className={`w-full cursor-pointer py-2 rounded-lg font-medium ${submitting
                                                    ? "bg-green-300 cursor-not-allowed"
                                                    : "bg-green-500 hover:bg-green-600 text-white"
                                                    }`}
                                            >
                                                {submitting ? "Updating..." : "Update Profile"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => router.back()}
                                                className="w-full cursor-pointer py-2 rounded-lg bg-teal-500 hover:bg-teal-700 font-medium"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};

export default EditProfile;