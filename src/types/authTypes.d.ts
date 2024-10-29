import { loginMethod } from "@prisma/client";
import "next-auth";

interface Note {
  userId: number;
  noteId: number;
  time: string;
  version: string;
  blocks: JsonValue;
  createdAt: Date;
  updatedAt: Date;
  Trash: boolean;
  Favorite: boolean;
}
declare module "next-auth" {
  interface User {
    id?: string;
    isVerified?: boolean;
    username?: string;
    email?: string;
    notes?: Note[] | [];
    loginMethod?: loginMethod;
  }

  interface Session {
    user: {
      id?: string;
      isVerified?: boolean;
      username?: string;
      email?: string;
      notes?: Note[] | [];
    } & DefaultSession["user"];
  }

  interface jwt {
    id?: string;
    isVerified?: boolean;
    username?: string;
    email?: string;
    notes?: Note[] | [];
  }
}
