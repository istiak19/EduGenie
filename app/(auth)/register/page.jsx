"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import loginPic from "../../../public/assets/login.jpg";
import Image from "next/image";
import Link from "next/link";
import SocialAuth from "@/components/SocialAuth/SocialAuth";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { register } from "@/app/actions/auth/register";
import Player from "@/lib/dynamicLottiePlayer";

// Zod validation
const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email format." }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters." })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
            message: "Password must include uppercase, lowercase, number, and special character.",
        }),
    cPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
}).refine((data) => data.password === data.cPassword, {
    message: "Passwords don't match!",
    path: ["cPassword"],
});

const Register = () => {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            cPassword: ""
        },
    });

    const onSubmit = async (data) => {
        try {
            console.clear();
            const userInfo = {
                name: data.name,
                email: data.email,
                password: data.password
            };

            const registerResponse = await register(userInfo);

            if (registerResponse?.success) {
                const signInResult = await signIn("credentials", {
                    redirect: false,
                    email: data.email,
                    password: data.password,
                });

                if (signInResult?.error) {
                    console.error("Login Failed:", signInResult.error);
                    return;
                }

                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registration successful!",
                    showConfirmButton: false,
                    timer: 1500,
                });

                router.push("/");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className="flex justify-center items-center bg-cover bg-center min-h-screen w-full px-4 sm:px-6 lg:px-8"
            style={{
                backgroundImage: "url('/assets/background.jpg')",
                backgroundAttachment: "fixed",
            }}
        >
            <div className="w-full max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-5 py-12">
                    {/* Left Image Section */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <Player
                            autoplay
                            loop
                            src="/assets/lottie/login.json"
                            style={{ height: '400px', width: '100%' }}
                        />
                    </div>

                    {/* Right Form Section */}
                    <div className="w-full md:w-2/3 lg:w-1/2  p-6 md:p-10">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your Name" type="text" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your Email" type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your Password" type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="cPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Confirm Password" type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 cursor-pointer">
                                    Sign Up
                                </Button>
                            </form>
                        </Form>

                        <p className="text-center py-5 font-medium text-gray-700">Or Sign Up With</p>
                        <SocialAuth />

                        <p className="pt-5 text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link href="/login" className="text-teal-600 font-semibold hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;