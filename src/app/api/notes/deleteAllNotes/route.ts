import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function POST(req: NextRequest) {
  try {
    const { idsArray, email }: { idsArray: number[]; email: string } =
      await req.json();
    // Fetch the userId based on the email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !idsArray) {
      return NextResponse.json({
        message: "Invalid Request",
        status: 404,
      });
    }

    // Use the userId to delete the notes
    await prisma.note.deleteMany({
      where: {
        userId: user.id, // Use the fetched userId
        noteId: {
          in: idsArray,
        },
      },
    });

    return NextResponse.json({
      message: "Notes successfully deleted",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error deleting notes",
      error: error.message,
      status: 500,
    });
  }
}
