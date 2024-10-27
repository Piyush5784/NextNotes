import { sendVerificationEmailForgetPassword } from "@/helpers/sendVerificationEmail";
import { resetEmailSchema } from "@/schema/zodValidationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const validate = resetEmailSchema.safeParse({ email });

    if (!validate.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email",
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    const code = Math.floor(Math.random() * 1000000);
    const resetLink = `${process.env.NEXTAUTH_URL}/pages/reset-password/${code}?email=${email}`;
    const newTime = new Date();
    newTime.setMinutes(newTime.getMinutes() + 5);
    const username = existingUser.username;

    const isCodeAlreadySent = existingUser.verifyCodeExpiry > new Date();

    if (isCodeAlreadySent) {
      return NextResponse.json({
        success: false,
        message: "Reset Password link already sent to your mail",
      });
    }

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        verifyCode: code,
        verifyCodeExpiry: newTime,
      },
    });

    const res = await sendVerificationEmailForgetPassword({
      username,
      email,
      resetLink,
    });

    if (!res.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send verification email. Please retry",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Forget password link successfully sent!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send forget password email. Please retry",
      },
      { status: 500 }
    );
  }
}
