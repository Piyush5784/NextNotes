import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/Auth";

export async function POST(req: NextRequest) {
  try {
    const { noteId } = await req.json();

    const session = await getServerSession(authOptions);
    const email = session?.user.email;

    if (!email) {
      return NextResponse.json({
        success: false,
        message: "UnAuthorized user",
      });
    }
    const numNoteId = Number(noteId);
    if (!noteId || !email) {
      return NextResponse.json(
        {
          message: "Invalid note ID or email",
        },
        { status: 400 }
      );
    }
    await prisma.note.update({
      where: { noteId: numNoteId, user: { email } },
      data: { Trash: true },
    });

    return NextResponse.json({
      message: "Note successfully moved to trash",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error moving note to trash",
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({
        message: "Email is required",
      });
    }
    // Find all notes marked as Trash for the user
    const trashedNotes = await prisma.note.findMany({
      where: {
        user: {
          email,
        },
        Trash: true, // Fetch only trashed notes
      },
    });

    // Map response to return relevant fields
    const response = trashedNotes.map((note) => ({
      id: note.noteId,
      time: note.time.toString(), // Convert BigInt to string
      version: note.version,
      blocks: note.blocks,
      Trash: note.Trash,
    }));

    return NextResponse.json({
      message: "Trashed notes fetched successfully",
      TrashNotes: response,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to fetch trashed notes",
    });
  }
}
