import { NextRequest, NextResponse } from "next/server";

interface DiscordUser {
  id: string;
  username: string;
  global_name: string | null;
  avatar: string | null;
  discriminator: string;
  banner: string | null;
  banner_color: string | null;
}

function getAvatarUrl(userId: string, avatarHash: string | null): string {
  if (!avatarHash) {
    const defaultAvatarIndex = parseInt(userId.slice(-1), 10) % 6;
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;
  }
  const extension = avatarHash.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${extension}?size=256`;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json(
      { error: "User ID is required" },
      { status: 400 }
    );
  }

  const token = process.env.DISCORD_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "Discord token not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`https://discord.com/api/v10/users/${userId}`, {
      headers: {
        Authorization: `Bot ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: "Failed to fetch user" },
        { status: response.status }
      );
    }

    const userData: DiscordUser = await response.json();

    return NextResponse.json({
      id: userData.id,
      username: userData.username,
      displayName: userData.global_name || userData.username,
      avatar: getAvatarUrl(userData.id, userData.avatar),
      discriminator: userData.discriminator,
    });
  } catch (error) {
    console.error("Error fetching Discord user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
