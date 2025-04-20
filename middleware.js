import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const url = req.nextUrl;

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (url.pathname.startsWith("/dashboard/educator") && token.role !== "educator") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (url.pathname.startsWith("/dashboard/student") && token.role !== "student") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/courses/:id",
        "/generator",
        "/dashboard/:path*",
        "/profile/:path*",
    ],
};