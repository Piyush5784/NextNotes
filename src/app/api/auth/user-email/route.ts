"use server";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession();
  try {
    return session ? session.user.email : null;
  } catch (error) {
    return null;
  }
}
