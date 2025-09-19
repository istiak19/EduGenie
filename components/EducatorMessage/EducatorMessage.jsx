"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";

const EducatorMessage = () => {
    const [messages, setMessages] = useState([]);
    const [replies, setReplies] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchMessage = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/contact");
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMessage();
    }, []);

    const replyPendingMessages = messages.filter((message) => !message.reply);

    const handleReplyChange = (id, value) => {
        setReplies((prev) => ({ ...prev, [id]: value }));
    };

    const handleReplySubmit = async (id) => {
        const replyMessage = replies[id];
        if (!replyMessage) {
            Swal.fire({
                position: "top",
                icon: "warning",
                title: "Please write a reply before submitting.",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        try {
            const res = await fetch(`/api/contact/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ reply: replyMessage }),
            });

            const result = await res.json();
            if (result.modifiedCount > 0) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Reply sent successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setReplies((prev) => ({ ...prev, [id]: "" }));
                await fetchMessage();
            }
        } catch (error) {
            console.error("Reply error:", error);
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Something went wrong while sending reply.",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-emerald-600 mb-10">
                Message Inbox
            </h2>

            {isLoading ? (
                <div className="flex justify-center items-center min-h-[200px]">
                    <Loading />
                </div>
            ) : replyPendingMessages.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No pending messages found.</p>
            ) : (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {replyPendingMessages.map((msg) => (
                        <div
                            key={msg._id}
                            className="border rounded-2xl p-6 bg-white shadow-md flex flex-col justify-between hover:shadow-lg transition-all"
                        >
                            <div className="space-y-2 text-gray-700">
                                <div><span className="font-semibold">Name:</span> {msg.firstName} {msg.lastName}</div>
                                <div><span className="font-semibold">Email:</span> {msg.email}</div>
                                <div><span className="font-semibold">Phone:</span> {msg.tel}</div>
                                <div><span className="font-semibold">Message:</span> {msg.message}</div>
                                <div className="text-xs text-gray-400">
                                    <strong>Received:</strong> {new Date(msg.createdAt).toLocaleString()}
                                </div>
                            </div>

                            <div className="mt-5">
                                <label className="block mb-2 text-sm font-medium text-gray-800">
                                    Reply
                                </label>
                                <Textarea
                                    placeholder="Write your reply..."
                                    value={replies[msg._id] || ""}
                                    onChange={(e) => handleReplyChange(msg._id, e.target.value)}
                                    className="w-full min-h-[100px] mb-4 resize-none"
                                />
                                <Button
                                    onClick={() => handleReplySubmit(msg._id)}
                                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 cursor-pointer"
                                >
                                    Send Reply
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EducatorMessage;