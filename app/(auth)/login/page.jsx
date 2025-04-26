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
import { useRouter } from "next/navigation";
import SocialAuth from "@/components/SocialAuth/SocialAuth";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { login } from "@/app/actions/auth/login";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email format." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      {
        message:
          "Password must include uppercase, lowercase, number, and special character.",
      }
    ),
});

const LoginPage = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

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
          position: "top",
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
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center p-4 md:p-8"
      style={{
        backgroundImage: "url('/assets/background.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-5">
          {/* Image Section */}
          <div className="w-full md:w-2/3 lg:w-1/2">
            <Image
              src={loginPic}
              alt="Login"
              width={600}
              height={600}
              className="rounded-lg w-full object-cover"
              priority
            />
          </div>

          {/* Form Section */}
          <div className="w-full md:w-2/3 lg:w-1/2  p-6 md:p-10">
            <h2 className="mb-6 text-2xl md:text-3xl font-bold text-center text-gray-800">
              Sign In
            </h2>

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
                        <Input
                          placeholder="Enter your email"
                          type="email"
                          {...field}
                          className="bg-white"
                        />
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
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          {...field}
                          className="bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded cursor-pointer"
                >
                  Sign In
                </Button>
              </form>
            </Form>

            {/* Divider */}
            <div className="my-6 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Or Sign In With</span>
            </div>

            {/* Social Authentication */}
            <SocialAuth />

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Don’t have an account?{" "}
              <Link href="/register" className="text-teal-600 font-semibold hover:underline">
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