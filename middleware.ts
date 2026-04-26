// middleware.ts - Update if needed
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Skip API routes from middleware protection
  if (path.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // Check if the path starts with /management
  if (path.startsWith('/management')) {
    const token = request.cookies.get('admin-token')?.value;
    
    // For development, you might want to skip authentication
    if (process.env.NODE_ENV === 'development') {
      // Allow access in development
      return NextResponse.next();
    }
    
    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/management/:path*']
};