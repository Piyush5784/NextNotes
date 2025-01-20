import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();

    const checkUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!checkUsername) {
      return NextResponse.json({
        success: true,
        message: "username is avaliable",
      });
    }
    return NextResponse.json({
      success: false,
      message: "username is already taken",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Error fetching username",
    });
  }
}
