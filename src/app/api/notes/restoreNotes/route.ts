import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/Auth";

export async function POST(req: NextRequest) {
  try {
    const { idsArray }: { idsArray: number[] | number; email: string } =
      await req.json();

    const session = await getServerSession(authOptions);
    const email = session?.user.email;

    if (!email) {
      return NextResponse.json({
        success: false,
        message: "UnAuthorized user",
      });
    }
    // Convert to array if a single ID is passed
    const ids = Array.isArray(idsArray) ? idsArray : [idsArray];

    // Update the notes by setting Trash to false
    await prisma.note.updateMany({
      where: {
        user: {
          email,
        },
        noteId: {
          in: ids,
        },
      },
      data: {
        Trash: false,
      },
    });

    return NextResponse.json({
      message: "Notes successfully restored",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error restoring notes",
      error: error.message,
      status: 500,
    });
  }
}
