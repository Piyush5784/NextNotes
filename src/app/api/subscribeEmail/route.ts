import { SubscribeEmailSchema } from "@/types/Ztypes";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// Define the API handler
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json(); // Use req.json() to parse the request body
    const parsedBody = SubscribeEmailSchema.safeParse(body); // Validate the parsed body

    // Check for validation errors
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody.error.format() },
        { status: 400 }
      );
    }

    const email = parsedBody.data.email;

    // Create a new subscription in the database
    await prisma.subscribedUsers.create({
      data: { email },
    });

    return NextResponse.json({
      message: "Subscription successfull",
    });
  } catch (error) {
    console.error("Subscription error:", error); // Log the error for debugging
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    ); // Return 500 status code
  }
}
