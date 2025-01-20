import { authOptions } from "@/config/Auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user.email;

    if (!email) {
      return NextResponse.json({
        success: false,
        message: "UnAuthorized user",
      });
    }
    const user = await prisma.user.findUnique({
      where: { email },
      include: { Note: true }, // Include the notes associated with the user
    });

    const notes = user?.Note.map((note) => ({
      id: note.noteId,
      time: note.time.toString(), // Ensure BigInt is properly formatted as a string
      version: note.version,
      blocks: note.blocks,
      Trash: note.Trash,
    }));
    const allNotes = notes ? notes : [];

    return NextResponse.json(
      { message: "Notes fetched successfully", notes: allNotes },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching the notes" },
      { status: 500 }
    );
  }
}
