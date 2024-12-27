import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Get the user token from cookies
  const isAuthenticated = request.cookies.has('user')

  // Define public paths that don't require authentication
  const isPublicPath = path === '/auth/signin'

  // If the user is not authenticated and trying to access a protected route
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  // If the user is authenticated and trying to access auth pages
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If the user is authenticated and accessing root
  if (isAuthenticated && path === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/auth/:path*', '/practice/:path*', '/library/:path*', '/reoptimize/:path*', '/courses/:path*']
}