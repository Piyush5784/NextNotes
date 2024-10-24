import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const restrictedRoutes = ["/dashboard", "/pages/dashboard"];
  const isRestrictedRoute = restrictedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isRestrictedRoute && !token) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/pages/signin`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Add your restricted routes here to ensure they are matched
    "/dashboard/:path*",
    "/pages/dashboard/:path*",
  ],
};
