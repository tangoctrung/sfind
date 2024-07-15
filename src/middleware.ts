import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get('accessToken')?.value
  // Chưa đăng nhập thì không cho vào private paths
  // return NextResponse.next()
  if ((pathname !== "/login" && pathname !== "/register") && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  // Đăng nhập rồi thì không cho vào login/register nữa
  if ((pathname === "/login" || pathname === "/register") && accessToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/register', '/forgot-password', "/:id"]
}