"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "@/components/Loading/Loading";

const ApprovalBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/blogs");
            const data = await res.json();
            setBlogs(data);
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleStatusChange = async (id, approvalStatus) => {
        try {
            const res = await fetch(`/api/blogs/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ approval: approvalStatus }),
            });
            const result = await res.json();
            if (result.modifiedCount > 0) {
                Swal.fire({
                    title: approvalStatus ? "Approved!" : "Unapproved!",
                    text: `The blog has been ${approvalStatus ? "approved" : "unapproved"}.`,
                    icon: "success",
                });
                fetchBlogs();
            }
        } catch (error) {
            console.error("Error updating blog:", error);
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });
        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`/api/blogs/${id}`, {
                    method: "DELETE",
                });

                const result = await res.json();
                if (result.deletedCount > 0) {
                    Swal.fire("Deleted!", "The blog has been deleted.", "success");
                    fetchBlogs();
                }
            } catch (error) {
                console.error("Error deleting blog:", error);
            }
        }
    };

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-5 text-center text-teal-700">
                All Blogs (Approval Panel)
            </h2>

            {loading ? (
                <div>
                    <Loading />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="flex flex-col justify-between p-5 bg-white rounded-lg shadow-md border min-h-[300px]"
                        >
                            <div className="mb-4">
                                <h3 className="text-lg md:text-xl font-bold text-blue-700">{blog.title}</h3>
                                <p className="text-gray-700 text-sm mt-3 text-justify">{blog.content}</p>
                            </div>
                            <div className="flex flex-wrap gap-3 mt-auto justify-between">
                                {blog.approval ? (
                                    <button
                                        onClick={() => handleStatusChange(blog._id, false)}
                                        className="btn btn-warning btn-sm"
                                    >
                                        Unapprove
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleStatusChange(blog._id, true)}
                                        className="btn btn-success btn-sm"
                                    >
                                        Approve
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(blog._id)}
                                    className="btn btn-error btn-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ApprovalBlog;