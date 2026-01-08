export interface WhatsAppUser {
  id: string;
  name: string;
  avatar?: string;
  color?: string; // For default avatars without image
  isMe: boolean;
}

export interface WhatsAppMessage {
  id: string;
  user: WhatsAppUser;
  content: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
  isSystem?: boolean; // For "Messages are end-to-end encrypted" etc.
  replyTo?: string;
  image?: string;
}

export interface WhatsAppChatSettings {
  contactName: string;
  contactAvatar?: string;
  status: "online" | "typing..." | string; // "last seen..."
  backgroundImage: string;
  darkMode: boolean;
  showInput: boolean;
  inputValue: string;
  inputPlaceholder: string;
}
