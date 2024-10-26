// src/app/api/auth/route.ts
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { code } = await request.json();

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://localhost:3000/api/auth/callback",
      }),
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token } = response.data;

    return NextResponse.json({ access_token, refresh_token });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching tokens:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unknown error fetching tokens:", error);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
