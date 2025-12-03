import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // PUBLIC routes
  const publicRoutes = ["/", "/login", "/signup"];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // PROTECTED route prefixes
  const protectedPrefixes = ["/management", "/schemes"];
  const isProtected = protectedPrefixes.some(prefix => pathname.startsWith(prefix));

  // Check login state (example: cookie for demo; use your own method for production)
 const isLoggedIn = Boolean(request.cookies.get("auth-token")?.value);
;
 if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    // Optionally let user return after login:
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/schemes",
    "/schemes/:path",
    "/login",
    "/signup",
  ],
};
