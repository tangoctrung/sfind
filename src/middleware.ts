import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log({pathname});
    
    const token = request.cookies.get("token")?.value;
    if (pathname !== "/login" && pathname !== "/register" && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if ((pathname === "/login" || pathname === "/register") && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login', '/register', '/', '/forgot-password'],
}