"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "./Loading/Loading";
import Image from "next/image";
import { FaRegThumbsUp, FaThumbsUp, FaRegCommentDots, FaCommentDots } from "react-icons/fa";

const AllBlogs = () => {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [reloadBlogs, setReloadBlogs] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [activeCommentBlogId, setActiveCommentBlogId] = useState(null);
  const [loading, setLoading] = useState(true);

  const userEmail = session?.user?.email;
  const commenter = session?.user?.name;
  const commenterImage = session?.user?.image;

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
      body: JSON.stringify({ userEmail, commenter, commenterImage, comment: commentText }),
    });

    setCommentText("");
    setActiveCommentBlogId(null);
    toggleReload();
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">
        Explore Latest Blogs
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
              className="p-6 bg-white rounded-xl shadow border hover:shadow-md transition-all"
            >
              <Image
                src={blog?.photo}
                alt={blog?.title}
                width={800}
                height={300}
                className="w-full lg:h-80 rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2 text-teal-700">
                {blog.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-xs text-justify">
                {blog.content}
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-4">
                {/* Like Section */}
                <div className="flex items-center gap-3">
                  <button
                    className="flex items-center text-blue-600 text-sm hover:text-blue-700 cursor-pointer transition-all duration-200 ease-in-out"
                    onClick={() => handleLike(blog._id)}
                  >
                    {blog.likes?.includes(userEmail) ? (
                      <FaThumbsUp className="w-5 h-5 mr-2 text-blue-600" />
                    ) : (
                      <FaRegThumbsUp className="w-5 h-5 mr-2" />
                    )}
                    Like
                  </button>
                  <span className="text-gray-600 text-sm">
                    ({blog.likes?.length || 0})
                  </span>
                </div>

                {/* Comment Section */}
                <div className="flex items-center gap-3">
                  <button
                    className="flex items-center text-green-600 text-sm hover:text-green-700 cursor-pointer transition-all duration-200 ease-in-out"
                    onClick={() =>
                      setActiveCommentBlogId(
                        activeCommentBlogId === blog._id ? null : blog._id
                      )
                    }
                  >
                    {activeCommentBlogId === blog._id ? (
                      <FaCommentDots className="w-5 h-5 mr-2" />
                    ) : (
                      <FaRegCommentDots className="w-5 h-5 mr-2" />
                    )}
                    Comment
                  </button>
                  <span className="text-gray-600 text-sm">
                    ({blog.comments?.length || 0})
                  </span>
                </div>
              </div>

              {/* Comment Input */}
              {activeCommentBlogId === blog._id && (
                <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-lg transition-all duration-300 ease-in-out">
                  <textarea
                    className="w-full border border-teal-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ease-in-out"
                    placeholder="Write your comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={4}
                  />
                  <button
                    className="mt-4 cursor-pointer bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md w-full sm:w-auto transition-all duration-300 ease-in-out"
                    onClick={() => handleCommentSubmit(blog._id)}
                  >
                    Submit Comment
                  </button>
                </div>
              )}

              {/* Show Comments */}
              {blog.comments?.length > 0 && (
                <div className="mt-6 bg-gray-50 border border-teal-200 p-6 rounded-lg shadow-xl transition-all duration-300 ease-in-out">
                  <h4 className="font-semibold text-xl text-teal-700 mb-4">Comments:</h4>
                  <ul className="space-y-6">
                    {blog.comments.map((comment, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-4 p-4 rounded-lg bg-white shadow-md transition-all duration-200 ease-in-out"
                      >
                        {/* Avatar */}
                        <div className="w-16 h-16 bg-teal-300 rounded-full flex-shrink-0 border-2 border-teal-600">
                          {comment?.commenterImage ? (
                            <img
                              src={comment?.commenterImage}
                              alt={comment?.commenter}
                              className="w-full h-full rounded-full"
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full text-white">
                              {comment.commenter ? comment.commenter[0].toUpperCase() : ""}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-gray-800 font-semibold text-md">{comment.commenter}</div>
                          <p className="text-gray-700 text-sm mt-2">{comment.comment}</p>
                          <div className="text-gray-500 text-xs mt-2">
                            {new Date(comment.createdAt).toLocaleString()}
                          </div>
                        </div>
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