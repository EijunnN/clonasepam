export interface DiscordUserResponse {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  discriminator?: string;
}

export async function lookupDiscordUser(userId: string): Promise<DiscordUserResponse | null> {
  try {
    const response = await fetch(`/api/discord/user?id=${encodeURIComponent(userId)}`);
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching Discord user:", error);
    return null;
  }
}
