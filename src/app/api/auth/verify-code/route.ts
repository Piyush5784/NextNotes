import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { username, code } = body;

    if (!code) {
      return NextResponse.json({
        success: false,
        message: "Verification code is missing",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    const isCodeValid = Number(user.verifyCode) === Number(code);
    const isCodeNotExpired = user.verifyCodeExpiry > new Date(); // Check expiry date

    if (!isCodeNotExpired) {
      return NextResponse.json({
        success: false,
        message:
          "Verification code has expired, please sign up again to get a new code",
      });
    }

    if (isCodeValid) {
      await prisma.user.update({
        where: {
          username,
        },
        data: {
          isVerified: true,
        },
      });
      return NextResponse.json({
        success: true,
        message: "Account Verified",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Incorrect verification code",
      });
    }
  } catch (error) {
    console.error("Error verifying user", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error verifying user",
      },
      { status: 500 }
    );
  }
}
