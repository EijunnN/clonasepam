export interface DiscordBadge {
  id: string;
  label: string;
  color: string; // Background color hex
  icon?: string; // Lucide icon name or "none"
}

export interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  badges: DiscordBadge[];
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

export interface DiscordChatSettings {
  channelName: string;
  channelIcon?: string; // TODO: Implement channel icon logic if needed
  inputValue: string;
  inputPlaceholder: string;
  showInput: boolean;
}

export interface DiscordChat {
  id: string;
  type: "dm" | "channel";
  name: string;
  icon?: string;
  messages: DiscordMessage[];
}
