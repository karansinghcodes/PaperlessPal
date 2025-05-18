import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    raw:true
  });

  if (token) {
    return Response.json({
      success: true,
      token,
    });
  } else {
    return Response.json({
      success: false,
      message: "token note found",
    });
  }
}
