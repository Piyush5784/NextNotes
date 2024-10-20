import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { message: "Email is required to fetch notes" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username: email },
      include: { Note: true }, // Include the notes associated with the user
    });

    const notes = user?.Note.map((note) => ({
      id: note.noteId,
      time: note.time.toString(), // Ensure BigInt is properly formatted as a string
      version: note.version,
      blocks: note.blocks,
      Trash: note.Trash,
    }));

    return NextResponse.json(
      { message: "Notes fetched successfully", notes },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching the notes" },
      { status: 500 }
    );
  }
}
