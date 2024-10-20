import { NoteSchema } from "@/types/Ztypes";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma";

export async function POST(req: NextRequest) {
  try {
    const parsedBody = await req.json();
    const format = NoteSchema.safeParse(parsedBody);

    if (!format.success) {
      return NextResponse.json({
        message: "Invalid data format",
        errors: format.error.format(),
      });
    }

    const { email, noteId, time, blocks, version } = format.data;
    const id = Number(noteId);

    const user = await prisma.user.findUnique({
      where: { username: email },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid User" });
    }

    const existingNote = await prisma.note.findUnique({
      where: {
        noteId: id,
      },
    });

    if (existingNote) {
      await prisma.note.update({
        where: {
          noteId: id,
        },
        data: {
          time,
          blocks: blocks as Prisma.JsonArray,
          version,
          userId: user.id,
        },
      });
      return NextResponse.json({ message: "Note successfully updated" });
    }

    await prisma.note.create({
      data: {
        time,
        blocks: blocks as Prisma.JsonArray,
        version,
        noteId: id,
        userId: user.id,
      },
    });

    // const existingNote = await prisma.note.upsert({
    //   where: { noteId: id, user: { username: email } },
    //   update: {
    //     time,
    //     blocks: blocks as Prisma.JsonArray,
    //     version,
    //     noteId: id,
    //     userId: user.id,
    //   },
    //   create: {
    //     time,
    //     noteId: id,
    //     blocks: blocks as Prisma.JsonArray,
    //     version,
    //     userId: user.id,
    //   },
    // });

    return NextResponse.json({
      message: "Note saved successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error saving the note" });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const noteId = searchParams.get("id");

    if (!email || !noteId) {
      return NextResponse.json({
        message: "Email and Note ID are required to fetch the note",
      });
    }

    const user = await prisma.user.findUnique({
      where: { username: email },
      include: {
        Note: {
          where: { noteId: parseInt(noteId, 10) },
        },
      },
    });

    if (!user || user.Note.length === 0) {
      return NextResponse.json({ message: "No notes found for the user" });
    }

    const note = user.Note[0];
    return NextResponse.json({
      message: "Note fetched successfully",
      note: {
        id: noteId,
        time: note.time.toString(),
        version: note.version,
        blocks: note.blocks,
      },
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching the note",
      error,
    });
  }
}
