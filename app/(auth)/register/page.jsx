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
import { useRouter } from 'next/navigation';
import { register } from "@/app/actions/auth/register";

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email format." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    photo: z.instanceof(File).optional(),
});

const image_key = process.env.NEXT_PUBLIC_IMAGE_KEY;

const Register = () => {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            photo: undefined,
        },
    });

    const onSubmit = async (data) => {
        console.clear();

        if (!data.photo) {
            console.error("No photo selected!");
            return;
        }

        const formData = new FormData();
        formData.append("image", data.photo);
        // console.log("FormData:", [...formData.entries()][0][1].name);
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${image_key}`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Upload failed!");
        }

        const result = await response.json();
        // console.log(result);
        const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password,
            photo: result.data.url
        }
        console.log(userInfo)
    };

    return (
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
                            <FormField
                                control={form.control}
                                name="photo"
                                render={({ field: { onChange, ref, ...rest } }) => (
                                    <FormItem>
                                        <FormLabel>Upload Photo</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => onChange(e.target.files?.[0] || undefined)}
                                                ref={ref}
                                            />
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
                                            <Input placeholder="Your password" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button variant="custom" type="submit">
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
                        <span className="text-blue-600 hover:underline">
                            <Link href="/login">Login</Link>
                        </span>
                    </p>
        try {
            const response = await register(userInfo);
            console.log("Registration successful!-->", response)
            const result = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (result?.error) {
                console.log("Login Failed:", result.error);
                return;
            }

            if (result.status === 200 && response.success === true) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registration successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log("Login Successful:", result);
                router.push('/');
            }
        }
        catch (error) {
            console.log("Error during login:", error);
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
                                <FormField
                                    control={form.control}
                                    name="photo"
                                    render={({ field: { onChange, ref, ...rest } }) => (
                                        <FormItem>
                                            <FormLabel>Upload Photo</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => onChange(e.target.files?.[0] || undefined)}
                                                    ref={ref}
                                                />
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
                                                <Input placeholder="Your password" type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button variant="custom" type="submit">
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
                            <span className="text-blue-600 hover:underline">
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