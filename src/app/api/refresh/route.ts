// src/app/api/refresh/route.ts
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { refreshToken } = await request.json();

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const newAccessToken = response.data.access_token;

    return NextResponse.json({ access_token: newAccessToken });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error refreshing token:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unknown error refreshing token:", error);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
