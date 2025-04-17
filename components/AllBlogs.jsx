"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const AllBlogs = ({ refetchBlogs }) => {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [reloadBlogs, setReloadBlogs] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [activeCommentBlogId, setActiveCommentBlogId] = useState(null);

  const userEmail = session?.user?.email;
  const commenter = session?.user?.name;

  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs");
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, [reloadBlogs, refetchBlogs]);

  const toggleReload = () => {
    setReloadBlogs((prev) => !prev);
  };

  const handleLike = async (blogId) => {
    await fetch(`/api/blogs/${blogId}/like`, {
      method: "PATCH",
      body: JSON.stringify({ userEmail }),
    });

    toggleReload();
  };

  const handleCommentSubmit = async (blogId) => {
    if (!commentText.trim()) return;

    await fetch(`/api/blogs/${blogId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail, commenter, comment: commentText }),
    });

    setCommentText("");
    setActiveCommentBlogId(null);
    toggleReload();
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-6">All Blogs</h2>
      <div className="space-y-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="p-6 bg-white rounded shadow border">
            <h3 className="text-xl font-semibold mb-2 text-blue-700">
              {blog.title}
            </h3>
            <p className="text-gray-700">{blog.content}</p>

            <div className="flex gap-3 mt-3">
              <div className="flex items-center gap-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleLike(blog._id)}
                >
                  Like
                </button>
                <p>({blog.likes?.length || 0})</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="text-green-500 hover:underline"
                  onClick={() =>
                    setActiveCommentBlogId(
                      activeCommentBlogId === blog._id ? null : blog._id
                    )
                  }
                >
                  Comment
                </button>
                <p>({blog.comments?.length || 0})</p>
              </div>
            </div>

            {activeCommentBlogId === blog._id && (
              <div className="mt-4">
                <textarea
                  className="w-full border p-2 rounded"
                  placeholder="Write your comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  className="mt-2 bg-green-500 text-white px-4 py-1 rounded"
                  onClick={() => handleCommentSubmit(blog._id)}
                >
                  Submit Comment
                </button>
              </div>
            )}

            {blog.comments?.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Comments:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  {blog.comments.map((comment, i) => (
                    <li key={i}>
                      <span className="font-medium text-gray-400">
                        {comment.commenter}:
                      </span>{" "}
                      {comment.comment}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;