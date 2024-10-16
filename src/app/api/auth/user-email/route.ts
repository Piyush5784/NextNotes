import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req);

  if (session) {
    const email = session.user?.email;
    return NextResponse.json({
      message: "Email fetched successfully",
      email,
    });
  } else {
    return NextResponse.json({
      message: "User not authorized",
      email: "",
    });
  }
}
