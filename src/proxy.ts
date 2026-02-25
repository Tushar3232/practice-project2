import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest){
    const {pathname}= req.nextUrl
    const publicRoutes =[
        "/login",
        "/register",
        "/api/auth",
        "/favicon.ico",
        
    ]

    if(publicRoutes.some(path=>pathname.startsWith(path))){
        return NextResponse.next()
    }
    else{
        const token = await getToken({req, secret:process.env.NEXT_AUTH_SECRET})
        if(!token){
            const loginUrl =new URL("/login", req.url)
            loginUrl.searchParams.set("callbackurl", req.url)
            return NextResponse.redirect(loginUrl)
        }
        return NextResponse.next()
    }

    
}

export const config = {
    matcher:"/((?!api|_next/static|_next/image|favicon.ico).*)"
}

// req asbo 
//    |
// path
//    |
// seclet all the rout we ned to public
//    |
// varifai not public path and token then private
//    |
// not token then redirect login