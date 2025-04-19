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
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">
        All Blogs
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="text-teal-600 text-lg font-medium animate-pulse">
            <Loading />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="p-6 bg-white rounded-xl shadow border hover:shadow-md transition"
            >
              <h3 className="text-2xl font-semibold mb-2 text-teal-700">
                {blog.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                {blog.content}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <button
                    className="text-blue-600 hover:underline cursor-pointer"
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
                    className="text-green-600 hover:underline cursor-pointer"
                    onClick={() =>
                      setActiveCommentBlogId(
                        activeCommentBlogId === blog._id ? null : blog._id
                      )
                    }
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
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring focus:border-teal-400"
                    placeholder="Write your comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button
                    className="mt-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md"
                    onClick={() => handleCommentSubmit(blog._id)}
                  >
                    Submit Comment
                  </button>
                </div>
              )}

              {/* Show Comments */}
              {blog.comments?.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Comments:
                  </h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    {blog.comments.map((comment, i) => (
                      <li key={i}>
                        <span className="font-medium text-gray-600">
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