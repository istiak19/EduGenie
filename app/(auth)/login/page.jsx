"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import loginPic from "../../../public/assets/login.jpg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SocialAuth from "@/components/SocialAuth/SocialAuth";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { login } from "@/app/actions/auth/login";

// ✅ Define form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email format." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const LoginPage = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  // ✅ Handle form submission
  const onSubmit = async (data) => {
    try {
      const userInfo = { email: data.email, password: data.password };
      await login(userInfo);

      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        console.error("Login Failed:", result.error);
        return;
      }

      if (result.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/background.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-11/12 mx-auto py-10">
        <div className="hero-content gap-8 flex-col lg:flex-row">
          {/* ✅ Login Image */}
          <Image
            src={loginPic}
            alt="Login"
            width={500}
            height={500}
            className="rounded-lg"
            priority
          />

          {/* ✅ Login Form */}
          <div className="w-full max-w-2xl">
            <h2 className="mb-5 font-bold text-center text-3xl">Sign In</h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
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

                {/* Password Field */}
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

                {/* Sign In Button */}
                <Button type="submit" className="w-full bg-teal-500 text-white hover:bg-teal-700">
                  Sign In
                </Button>
              </form>
            </Form>

            {/* Social Authentication */}
            <p className="text-center py-5 font-medium">Or Sign In With</p>
            <SocialAuth />

            {/* Register Link */}
            <p className="text-xs text-center pt-5">
              Don’t have an account?{" "}
              <Link href="/register" className="text-teal-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
