"use server";
import { authOptions } from "@/config/Auth";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {
    const email = session.user?.email;
    return email;
  } else {
    return null;
  }
}
