"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "./Loading/Loading";

const AllBlogs = () => {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [reloadBlogs, setReloadBlogs] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [activeCommentBlogId, setActiveCommentBlogId] = useState(null);
  const [loading, setLoading] = useState(true);

  const userEmail = session?.user?.email;
  const commenter = session?.user?.name;

  const fetchBlogs = async () => {
    setLoading(true);
    const res = await fetch("/api/blogs");
    const data = await res.json();

    const approvedBlogs = data.filter((blog) => blog.approval === true);
    setBlogs(approvedBlogs);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, [reloadBlogs]);

  const toggleReload = () => {
    setReloadBlogs((prev) => !prev);
  };

  const handleLike = async (blogId) => {
    if (!session?.user) {
      alert("Please login to like!");
      return;
    }
    await fetch(`/api/blogs/${blogId}/like`, {
      method: "PATCH",
      body: JSON.stringify({ userEmail }),
    });
    toggleReload();
  };

  const handleCommentSubmit = async (blogId) => {
    if (!session?.user) {
      alert("Please login to comment!");
      return;
    }

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
    <div className="max-w-5xl mx-auto px-4 py-10 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
        All Blogs
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="text-purple-400 text-lg font-medium animate-pulse">
            <Loading />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="p-6 bg-gray-800 rounded-xl shadow border border-gray-700 hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold mb-2 text-purple-400">
                {blog.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-justify">
                {blog.content}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <button
                    className="text-purple-400 hover:underline cursor-pointer"
                    onClick={() => handleLike(blog._id)}
                  >
                    Like
                  </button>
                  <span className="text-gray-500 text-sm">
                    ({blog.likes?.length || 0})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="text-indigo-400 hover:underline cursor-pointer"
                    onClick={() => {
                      if (!session?.user) {
                        alert("Please login to comment!");
                        return;
                      }
                      setActiveCommentBlogId(
                        activeCommentBlogId === blog._id ? null : blog._id
                      );
                    }}
                  >
                    Comment
                  </button>
                  <span className="text-gray-500 text-sm">
                    ({blog.comments?.length || 0})
                  </span>
                </div>
              </div>

              {/* Comment Input */}
              {activeCommentBlogId === blog._id && (
                <div className="mt-4">
                  <textarea
                    className="w-full border rounded-lg p-3 bg-gray-900 text-gray-400 focus:outline-none focus:ring focus:border-purple-500 placeholder-gray-500"
                    placeholder="Write your comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button
                    className="mt-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 text-white px-5 py-2 rounded-md transition-all"
                    onClick={() => handleCommentSubmit(blog._id)}
                  >
                    Submit Comment
                  </button>
                </div>
              )}

              {/* Show Comments */}
              {blog.comments?.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-purple-400 mb-2">Comments:</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    {blog.comments.map((comment, i) => (
                      <li key={i}>
                        <span className="font-medium text-indigo-400">
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
      )}
    </div>
  );
};

export default AllBlogs;