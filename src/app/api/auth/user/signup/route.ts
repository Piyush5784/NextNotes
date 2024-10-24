import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    const newEmail = email.toLowerCase();

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json({
          success: false,
          message: "User already exists with this email or username",
        });
      } else {
        // User exists but is not verified
        const hashedPassword = await bcrypt.hash(password, 10);
        const verifyCode = Math.floor(100000 + Math.random() * 900000);
        const expiryDate = new Date(Date.now() + 5 * 60 * 1000); // Set expiry to 5 minutes

        await prisma.user.update({
          where: {
            id: existingUser.id, // Use unique ID for updating
          },
          data: {
            username,
            password: hashedPassword,
            verifyCode,
            verifyCodeExpiry: expiryDate,
            isVerified: false,
          },
        });

        const emailResponse = await sendVerificationEmail(
          email,
          username,
          verifyCode
        );

        if (!emailResponse.success) {
          return NextResponse.json({
            success: false,
            message: emailResponse.message,
          });
        }

        return NextResponse.json({
          success: true,
          message: "User updated successfully. Please verify your email",
        });
      }
    }

    // Register a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyCode = Math.floor(Math.random() * 1000000);
    const expiryDate = new Date(Date.now() + 5 * 60 * 1000); // Set expiry to 5 minutes
    // newEmail is already declared above, no need to redeclare it here

    await prisma.user.create({
      data: {
        username,
        email: newEmail,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
      },
    });

    const emailResponse = await sendVerificationEmail(
      newEmail,
      username,
      verifyCode
    );

    if (!emailResponse.success) {
      return NextResponse.json({
        success: false,
        message: emailResponse.message,
      });
    }

    return NextResponse.json({
      success: true,
      message: "User registered successfully. Please verify your email",
    });
  } catch (error) {
    console.error("Error registering user", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request",
      },
      { status: 500 }
    );
  }
}
