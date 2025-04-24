"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
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

    const replyPendingMessages = messages.filter(message => !message.reply);

    const handleReplyChange = (id, value) => {
        setReplies(prev => ({ ...prev, [id]: value }));
    };

    const handleReplySubmit = async (id) => {
        const replyMessage = replies[id];
        if (!replyMessage) {
            toast.error("Please write a reply before submitting.");
            return;
        }

        try {
            const res = await fetch(`/api/contact/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ reply: replyMessage })
            });

            const result = await res.json();
            if (result.modifiedCount > 0) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Reply sent successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setReplies(prev => ({ ...prev, [id]: "" }));
                await fetchMessage();
            }
        } catch (error) {
            console.error("Reply error:", error);
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Something went wrong while sending reply.",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-emerald-600 mb-8">Message Inbox</h2>

            {isLoading ? (
                <div className="text-center text-gray-500">
                    <Loading />
                </div>
            ) : replyPendingMessages.length === 0 ? (
                <p className="text-center text-gray-500">No messages found.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {replyPendingMessages.map((msg) => (
                        <div key={msg._id} className="border rounded-xl p-5 shadow-md space-y-3 bg-white text-left">
                            <div><strong>Name:</strong> {msg.firstName} {msg.lastName}</div>
                            <div><strong>Email:</strong> {msg.email}</div>
                            <div><strong>Phone:</strong> {msg.tel}</div>
                            <div><strong>Message:</strong> {msg.message}</div>
                            <div className="text-sm text-gray-500"><strong>Received:</strong> {new Date(msg.createdAt).toLocaleString()}</div>

                            <div className="mt-4">
                                <label className="block mb-1 font-medium text-sm">Reply</label>
                                <Textarea
                                    placeholder="Write your reply..."
                                    value={replies[msg._id] || ""}
                                    onChange={(e) => handleReplyChange(msg._id, e.target.value)}
                                    className="mb-2 w-full min-h-[80px]"
                                />
                                <Button
                                    onClick={() => handleReplySubmit(msg._id)}
                                    className="bg-teal-500 text-white hover:bg-teal-700 w-full cursor-pointer md:w-auto"
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