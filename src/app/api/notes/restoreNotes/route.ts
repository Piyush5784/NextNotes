import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function POST(req: NextRequest) {
  try {
    const { idsArray, email }: { idsArray: number[] | number; email: string } =
      await req.json();

    // Convert to array if a single ID is passed
    const ids = Array.isArray(idsArray) ? idsArray : [idsArray];

    // Update the notes by setting Trash to false
    await prisma.note.updateMany({
      where: {
        user: {
          username: email,
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
