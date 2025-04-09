import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt"

export async function middleware(req) {
    const token = await getToken({ req })

    if (token) {
        return NextResponse.next()
    } else {
        return NextResponse.redirect(new URL('/login', req.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/generator', '/dashboard/:path*'],
}