import createMiddleware from "next-intl/middleware";
import { routing } from "./routing";
import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import type { SessionData } from "./lib/auth";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes (except login page)
  // Protect admin routes (except login page)
  if (pathname.startsWith("/admin")) {
    // For login page, just return next() to avoid intl middleware
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    try {
      const response = NextResponse.next();
      const session = await getIronSession<SessionData>(request, response, {
        password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long',
        cookieName: 'admin_session',
        cookieOptions: {
          secure: process.env.NODE_ENV === 'production',
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
        },
      });

      if (!session.isLoggedIn) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }

      return response;
    } catch (error) {
      console.error("Middleware error:", error);
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Apply next-intl middleware for other routes
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(en|ar)/:path*", "/admin/:path*"],
};
