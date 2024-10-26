import axios from "axios";
import { NextResponse } from "next/server";

const getAccessToken = async (refreshToken: string) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const tokenResponse = await axios.post(
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

  return tokenResponse.data.access_token;
};

const getCurrentPlayingTrack = async (accessToken: string) => {
  const response = await axios.get(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  console.log("Full Response:", response); // Tüm yanıtı logla

  return response.data;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const refreshToken = searchParams.get("refreshToken");

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Refresh token is required." },
      { status: 400 }
    );
  }

  try {
    const accessToken = await getAccessToken(refreshToken);
    const currentTrack = await getCurrentPlayingTrack(accessToken);

    return NextResponse.json(currentTrack);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching currently playing song:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unknown error fetching currently playing song:", error);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
