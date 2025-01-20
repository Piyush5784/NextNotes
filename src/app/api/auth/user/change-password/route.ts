import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const validation = z.object({
  email: z.string().email(),
  code: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const { code, email, password } = await req.json();
    const validate = validation.safeParse({
      code,
      email,
      password,
    });

    if (!validate.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request",
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
        message: "Unauthorized user",
      });
    }

    // Assuming dbCode is stored as a hashed value in the database
    const dbCode = existingUser.verifyCode; // This should be hashed
    const isCodeNotExpired =
      existingUser.verifyCodeExpiry &&
      existingUser.verifyCodeExpiry > new Date();

    const compare = dbCode == Number(code); // Compare the plain code with the hashed code

    // Check if the verification code is valid and not expired
    if (!isCodeNotExpired) {
      return NextResponse.json({
        success: false,
        message: "Verification link expired. Please retry",
      });
    }

    if (!compare) {
      return NextResponse.json({
        success: false,
        message: "Invalid request. Please try with another link",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Password successfully updated",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to change password. Please retry",
      },
      { status: 500 }
    );
  }
}
