import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/pages/signin`);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
