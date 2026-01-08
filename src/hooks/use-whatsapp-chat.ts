"use client";

import { useState } from "react";
import type {
  WhatsAppChatSettings,
  WhatsAppMessage,
  WhatsAppUser,
} from "@/types/whatsapp";

const DEFAULT_USERS: WhatsAppUser[] = [
  {
    id: "me",
    name: "Tú",
    avatar: "https://github.com/shadcn.png",
    isMe: true,
  },
  {
    id: "contact",
    name: "María",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    isMe: false,
  },
];

const DEFAULT_MESSAGES: WhatsAppMessage[] = [
  {
    id: "1",
    user: DEFAULT_USERS[0],
    content: "Hola! ¿Cómo estás?",
    timestamp: new Date(Date.now() - 3600000),
    status: "read",
    isMe: true,
  } as WhatsAppMessage,
  {
    id: "2",
    user: DEFAULT_USERS[1],
    content: "Todo bien! Y tú?",
    timestamp: new Date(Date.now() - 3500000),
    status: "read",
    isMe: false,
  } as WhatsAppMessage,
];

const DEFAULT_SETTINGS: WhatsAppChatSettings = {
  contactName: "María",
  contactAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  status: "online",
  backgroundImage: "/wsp-bg.png",
  darkMode: false,
  showInput: true,
  inputValue: "",
  inputPlaceholder: "Mensaje",
};

export function useWhatsAppChat() {
  const [users, setUsers] = useState<WhatsAppUser[]>(DEFAULT_USERS);
  const [messages, setMessages] = useState<WhatsAppMessage[]>(DEFAULT_MESSAGES);
  const [settings, setSettings] = useState<WhatsAppChatSettings>(DEFAULT_SETTINGS);

  const addUser = (user: WhatsAppUser) => {
    setUsers((prev) => [...prev, user]);
  };

  const updateUser = (updatedUser: WhatsAppUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
    // Update messages to reflect user changes if needed
    setMessages((prev) =>
      prev.map((m) =>
        m.user.id === updatedUser.id ? { ...m, user: updatedUser } : m
      )
    );
  };

  const deleteUser = (userId: string) => {
    if (users.length <= 1) return;
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const addMessage = (message: WhatsAppMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const updateMessage = (message: WhatsAppMessage) => {
    setMessages((prev) => prev.map((m) => (m.id === message.id ? message : m)));
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const updateSettings = (newSettings: Partial<WhatsAppChatSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return {
    users,
    messages,
    settings,
    addUser,
    updateUser,
    deleteUser,
    addMessage,
    updateMessage,
    deleteMessage,
    updateSettings,
  };
}
