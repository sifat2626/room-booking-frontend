// app/api/set-access-token/route.js
import { setCookie } from "nookies";

export async function POST(req) {
  const { accessToken } = await req.json(); // Get access token from request body

  if (!accessToken) {
    return new Response(
      JSON.stringify({ message: "No access token provided" }),
      { status: 400 }
    );
  }

  // Set the cookie
  const response = new Response(
    JSON.stringify({ message: "Cookie set successfully" }),
    { status: 200 }
  );
  setCookie({ res: response }, "access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    path: "/",
  });

  return response;
}
