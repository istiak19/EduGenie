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
import SocialAuth from "@/components/SocialAuth/SocialAuth";


const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email format.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});


const LoginPage = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        console.log("Submitted Data:", data);
    };

    return (
        <div className="w-3/4 mx-auto py-10">
            <div className="hero-content gap-8 flex-col lg:flex-row">
                <Image
                    src={loginPic}
                    alt='Login Picture'
                    width={500}
                    height={500}
                    className="rounded-lg"
                    priority
                />
                <div className="w-full max-w-xl">
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
                </div>
            </div>
        </div>
    );
};

export default LoginPage;