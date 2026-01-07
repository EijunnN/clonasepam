"use client";

import {
  Download,
  Monitor,
  Pencil,
  Plus,
  Smartphone,
  Trash2,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { DiscordChat, DiscordHeader } from "@/components/discord";
import { MessageForm } from "@/components/editor/message-form";
import { UserManager } from "@/components/editor/user-manager";
import type { DiscordMessage, DiscordUser } from "@/types/discord";

const DEFAULT_USERS: DiscordUser[] = [
  {
    id: "1",
    username: "Droid",
    avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
    badges: ["CODE"],
  },
  {
    id: "2",
    username: "dsva97",
    avatar: "https://cdn.discordapp.com/embed/avatars/1.png",
    badges: ["AUTH"],
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
  {
    id: "3",
    user: DEFAULT_USERS[0],
    content:
      "https://www.youtube.com/watch?v=tlhL2KHVdgE&list=RDMMt021l9bXq90&index=24",
    timestamp: new Date(),
    embeds: [
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=tlhL2KHVdgE",
        title: "【MV】 MYTH&ROID - STYX HELIX(OFFICIAL)",
        siteName: "YouTube",
        author: "KADOKAWAanime",
        thumbnail: "https://img.youtube.com/vi/tlhL2KHVdgE/maxresdefault.jpg",
      },
    ],
  },
];

export default function Home() {
  const [users, setUsers] = useState<DiscordUser[]>(DEFAULT_USERS);
  const [messages, setMessages] = useState<DiscordMessage[]>(DEFAULT_MESSAGES);
  const [editingMessage, setEditingMessage] = useState<DiscordMessage | null>(
    null,
  );
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("mobile");
  const chatRef = useRef<HTMLDivElement>(null);

  const chatName = users[0]?.username || "Chat";
  const chatAvatar = users[0]?.avatar;

  const handleAddUser = (user: DiscordUser) => {
    setUsers((prev) => [...prev, user]);
  };

  const handleUpdateUser = (updatedUser: DiscordUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
    );
    setMessages((prev) =>
      prev.map((m) =>
        m.user.id === updatedUser.id ? { ...m, user: updatedUser } : m,
      ),
    );
  };

  const handleDeleteUser = (userId: string) => {
    if (users.length <= 1) return;
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleSaveMessage = (
    messageData: Omit<DiscordMessage, "id"> & { id?: string },
  ) => {
    if (messageData.id) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageData.id
            ? ({ ...m, ...messageData } as DiscordMessage)
            : m,
        ),
      );
    } else {
      const newMessage: DiscordMessage = {
        ...messageData,
        id: crypto.randomUUID(),
      };
      setMessages((prev) => [...prev, newMessage]);
    }
    setShowForm(false);
    setEditingMessage(null);
  };

  const handleEditMessage = (id: string) => {
    const message = messages.find((m) => m.id === id);
    if (message) {
      setEditingMessage(message);
      setShowForm(true);
    }
  };

  const handleDeleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const handleExport = useCallback(async () => {
    if (!chatRef.current) return;

    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(chatRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#313338",
      });

      const link = document.createElement("a");
      link.download = `discord-chat-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error exporting:", error);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#1e1f22]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#1e1f22] bg-[#111214] px-6 py-3">
        <h1 className="text-lg font-semibold text-white">FakeChat Builder</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg bg-[#2b2d31] p-1">
            <button
              type="button"
              onClick={() => setViewMode("mobile")}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
                viewMode === "mobile"
                  ? "bg-[#5865f2] text-white"
                  : "text-[#b5bac1] hover:text-white"
              }`}
            >
              <Smartphone className="h-4 w-4" />
              Mobile
            </button>
            <button
              type="button"
              onClick={() => setViewMode("desktop")}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
                viewMode === "desktop"
                  ? "bg-[#5865f2] text-white"
                  : "text-[#b5bac1] hover:text-white"
              }`}
            >
              <Monitor className="h-4 w-4" />
              Desktop
            </button>
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-2 rounded-lg bg-[#248046] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1a6334]"
          >
            <Download className="h-4 w-4" />
            Exportar PNG
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Editor */}
        <div className="flex w-[400px] flex-col border-r border-[#1e1f22] bg-[#2b2d31]">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {/* Add Message Button / Form */}
              {showForm ? (
                <MessageForm
                  message={editingMessage || undefined}
                  users={users}
                  onSave={handleSaveMessage}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingMessage(null);
                  }}
                  onAddUser={handleAddUser}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#5865f2] py-3 text-sm font-medium text-white transition-colors hover:bg-[#4752c4]"
                >
                  <Plus className="h-5 w-5" />
                  Agregar mensaje
                </button>
              )}

              {/* User Manager */}
              <UserManager
                users={users}
                onUpdateUser={handleUpdateUser}
                onDeleteUser={handleDeleteUser}
              />

              {/* Messages List */}
              <div className="rounded-lg bg-[#1e1f22] p-3">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#b5bac1]">
                  Mensajes ({messages.length})
                </h3>
                <div className="space-y-2">
                  {messages
                    .sort(
                      (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
                    )
                    .map((msg) => (
                      <div
                        key={msg.id}
                        className="group flex items-start gap-3 rounded-md bg-[#2b2d31] p-2 transition-colors hover:bg-[#35373c]"
                      >
                        <img
                          src={msg.user.avatar}
                          alt={msg.user.username}
                          className="h-8 w-8 rounded-full"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-white">
                            {msg.user.username}
                          </p>
                          <p className="truncate text-xs text-[#b5bac1]">
                            {msg.content}
                          </p>
                        </div>
                        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => handleEditMessage(msg.id)}
                            className="rounded p-1 text-[#b5bac1] hover:bg-[#1e1f22] hover:text-white"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="rounded p-1 text-[#b5bac1] hover:bg-[#1e1f22] hover:text-[#ed4245]"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex flex-1 items-center justify-center bg-[#1e1f22] p-8">
          <div
            className={`flex flex-col overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/20 ${
              viewMode === "mobile" ? "w-[375px]" : "w-full max-w-3xl"
            }`}
            style={{
              height: viewMode === "mobile" ? "700px" : "600px",
            }}
          >
            <DiscordHeader
              name={chatName}
              avatar={chatAvatar}
              status="Compartiendo su..."
              isOnline={true}
            />
            <DiscordChat
              ref={chatRef}
              messages={messages}
              onEditMessage={handleEditMessage}
              onDeleteMessage={handleDeleteMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
