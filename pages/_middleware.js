import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export async function middleware(req) {
    const url = req.nextUrl.clone();
    const token = await getToken({ req, secret: process.env.JWT_SECRET});

    const { pathname } = req.nextUrl;

    // allow the requests if the following is true...
    // 1. its a request for next-auth session & provider fetching
    // 2. the token exists

    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    // redirect them to login if they dont have token AND are requesting a protected route
    
    if (!token && pathname !== '/login') {
        url.pathname = '/login'
        return NextResponse.redirect(url) 
    }
}


