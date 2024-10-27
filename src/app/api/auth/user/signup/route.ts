import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";
import prisma from "../../../../../../prisma";

// Set up rate limiter to allow 5 requests per minute
const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60, // per 60 seconds
});

export async function POST(req: NextRequest) {
  try {
    // Get client IP address
    const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";

    // Check rate limit
    await rateLimiter.consume(ip);

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
        const expiryDate = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        await prisma.user.update({
          where: {
            id: existingUser.id,
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
    const expiryDate = new Date(Date.now() + 5 * 60 * 1000);

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
    // Handle rate limit error
    if (error instanceof RateLimiterRes) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please try again later.",
        },
        { status: 429 }
      );
    }

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
