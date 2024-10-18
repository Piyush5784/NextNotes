import { authOptions } from "@/config/Auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {
    const email = session.user?.email;
    return NextResponse.json({
      message: "Email fetched successfully",
      email,
    });
  } else {
    return NextResponse.json({
      message: "User not authorized",
      email: "",
    });
  }
}
