"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import loginPic from '../../../public/assets/login.jpg'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import SocialAuth from "@/components/SocialAuth/SocialAuth";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { login } from "@/app/actions/auth/login";


const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email format.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});


const LoginPage = () => {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        console.log("Submitted Data:", data);
        try {
            const userInfo = {
                email: data.email,
                password: data.password
            };
            const response = await login(userInfo)
            console.log("Login!-->", response)
            const result = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (result?.error) {
                console.log("Login Failed:", result.error);
                return;
            }

            if (result.status === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successful!",
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
<<<<<<< HEAD
        <div className="w-11/12 mx-auto py-10">
            <div className="hero-content gap-8 flex-col lg:flex-row">
                <Image
                    src={loginPic}
                    alt='Login Picture'
                    width={500}
                    height={500}
                    className="rounded-lg"
                    priority
                />
                <div className="w-full max-w-2xl">
                    <h2 className='mb-5 font-bold text-center text-3xl'>Sign In</h2>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            <Button variant="custom" type="submit">Sign In</Button>
                        </form>
                    </Form>
                    <p className='text-center py-5 font-medium'>Or Sign In With</p>
                    <div>
                        <SocialAuth></SocialAuth>
=======
        <div className="w-full min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: "url('/assets/background.jpg')",
                backgroundAttachment: "fixed",
            }}>
            <div className="w-11/12 mx-auto py-10">
                <div className="hero-content gap-8 flex-col lg:flex-row">
                    <Image
                        src={loginPic}
                        alt='Login Picture'
                        width={500}
                        height={500}
                        className="rounded-lg"
                        priority
                    />
                    <div className="w-full max-w-2xl">
                        <h2 className='mb-5 font-bold text-center text-3xl'>Sign In</h2>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                <Button variant="custom" type="submit">Sign In</Button>
                            </form>
                        </Form>
                        <p className='text-center py-5 font-medium'>Or Sign In With</p>
                        <div>
                            <SocialAuth></SocialAuth>
                        </div>
                        <p className='text-xs text-center pt-5'>Have an account? <span className='text-blue-600 hover:underline'><Link href='/register'>Sign Up</Link></span></p>
>>>>>>> b914239baf31d5677cef3f29149133ed2d687285
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;