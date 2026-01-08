"use client";

import { useState } from "react";
import type {
  DiscordChatSettings,
  DiscordMessage,
  DiscordUser,
} from "@/types/discord";

const DEFAULT_USERS: DiscordUser[] = [
  {
    id: "1",
    username: "Droid",
    avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
    badges: [
      {
        id: "1",
        label: "APP",
        color: "#2a3435",
        icon: "Rayo",
      },
    ],
  },
  {
    id: "2",
    username: "dsva97",
    avatar: "https://cdn.discordapp.com/embed/avatars/1.png",
    badges: [
      {
        id: "2",
        label: "MOD",
        color: "#2a3435",
        icon: "Espada",
      },
    ],
  },
];

const DEFAULT_MESSAGES: DiscordMessage[] = [
  {
    id: "1",
    user: DEFAULT_USERS[0],
    content:
      "una consulta\nun v0.dev\npero con las apis keys de uno mismo\npor cierto\nentra un toque p",
    timestamp: new Date(Date.now() - 86400000),
  },
  {
    id: "2",
    user: DEFAULT_USERS[1],
    content: "al discord",
    timestamp: new Date(Date.now() - 86400000 + 60000),
  },
];

const DEFAULT_SETTINGS: DiscordChatSettings = {
  channelName: "general",
  inputValue: "",
  inputPlaceholder: "Mensaje @chat",
  showInput: true,
};

export function useDiscordChat() {
  const [users, setUsers] = useState<DiscordUser[]>(DEFAULT_USERS);
  const [messages, setMessages] = useState<DiscordMessage[]>(DEFAULT_MESSAGES);
  const [settings, setSettings] =
    useState<DiscordChatSettings>(DEFAULT_SETTINGS);

  const addUser = (user: DiscordUser) => {
    setUsers((prev) => [...prev, user]);
  };

  const updateUser = (updatedUser: DiscordUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
    );
    setMessages((prev) =>
      prev.map((m) =>
        m.user.id === updatedUser.id ? { ...m, user: updatedUser } : m,
      ),
    );
  };

  const deleteUser = (userId: string) => {
    if (users.length <= 1) return;
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const addMessage = (message: DiscordMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const updateMessage = (message: DiscordMessage) => {
    setMessages((prev) => prev.map((m) => (m.id === message.id ? message : m)));
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const updateSettings = (newSettings: Partial<DiscordChatSettings>) => {
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
