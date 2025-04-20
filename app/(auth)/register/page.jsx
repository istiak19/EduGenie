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

// Zod schema validation with password matching
const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email format." }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters." })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            {
                message:
                    "Password must include uppercase, lowercase, number, and special character.",
            }
        ),
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
            console.log("Submitted Data:", data);
            const userInfo = {
                name: data.name,
                email: data.email,
                password: data.password,
                role: 'student'
            };

            console.log("User Info:", userInfo);
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
        <div className="flex justify-center items-center bg-cover bg-center w-full min-h-screen"
            style={{
                backgroundImage: "url('/assets/background.jpg')",
                backgroundAttachment: "fixed",
            }}>
            <div className="mx-auto py-10 w-11/12">
                <div className="lg:flex-row flex-col gap-8 hero-content">
                    <Image
                        src={loginPic}
                        alt="Login Picture"
                        width={500}
                        height={500}
                        className="rounded-lg"
                        priority
                    />
                    <div className="w-full max-w-2xl">
                        <h2 className="mb-5 font-bold text-3xl text-center">Sign Up</h2>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                                <Input placeholder="Your email" type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* <FormField
                                    control={form.control}
                                    name="photo"
                                    render={({ field: { onChange } }) => (
                                        <FormItem>
                                            <FormLabel>Upload Photo</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => onChange(e.target.files)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your password" type="password" {...field} />
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
                                                <Input placeholder="Your password" type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full cursor-pointer bg-teal-600 hover:bg-teal-700" type="submit">
                                    Sign Up
                                </Button>
                            </form>
                        </Form>
                        <p className="py-5 font-medium text-center">Or Sign Up With</p>
                        <div>
                            <SocialAuth />
                        </div>
                        <p className="pt-5 text-gray-600 text-xs text-center">
                            Already have an account?{" "}
                            <span className="text-teal-600 hover:underline">
                                <Link href="/login">Login</Link>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;