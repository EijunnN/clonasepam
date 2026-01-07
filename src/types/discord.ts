export type BadgeType =
  | "AUTH"
  | "CODE"
  | "NITRO"
  | "BOOST"
  | "BOT"
  | "ADMIN"
  | "MOD";

export interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  badges?: BadgeType[];
  isBot?: boolean;
}

export interface DiscordEmbed {
  type: "youtube" | "twitter" | "image" | "link";
  url: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  siteName?: string;
  author?: string;
}

export interface DiscordAttachment {
  id: string;
  type: "image" | "video" | "file";
  url: string;
  name?: string;
  width?: number;
  height?: number;
}

export interface DiscordMessage {
  id: string;
  user: DiscordUser;
  content: string;
  timestamp: Date;
  attachments?: DiscordAttachment[];
  embeds?: DiscordEmbed[];
  isEdited?: boolean;
  replyTo?: string;
}

export interface DiscordChat {
  id: string;
  type: "dm" | "channel";
  name: string;
  icon?: string;
  messages: DiscordMessage[];
}
