"use client";

import {
  Download,
  Monitor,
  Pencil,
  Plus,
  Settings,
  Smartphone,
  Trash2,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { DiscordChat, DiscordHeader } from "@/components/discord";
import { MessageForm } from "@/components/editor/message-form";
import { SettingsForm } from "@/components/editor/settings-form";
import { UserManager } from "@/components/editor/user-manager";
import { useDiscordChat } from "@/hooks/use-discord-chat";
import type { DiscordMessage } from "@/types/discord";

export default function Home() {
  const {
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
  } = useDiscordChat();

  const [editingMessage, setEditingMessage] = useState<DiscordMessage | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<"messages" | "settings">(
    "messages",
  );
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("mobile");
  const chatRef = useRef<HTMLDivElement>(null);

  const chatName = settings.channelName || "general";
  const chatAvatar = users[0]?.avatar;

  const handleSaveMessage = (
    messageData: Omit<DiscordMessage, "id"> & { id?: string },
  ) => {
    if (messageData.id) {
      updateMessage({
        ...messageData,
        id: messageData.id,
      } as DiscordMessage);
    } else {
      addMessage({
        ...messageData,
        id: crypto.randomUUID(),
      } as DiscordMessage);
    }
    setShowForm(false);
    setEditingMessage(null);
  };

  const handleEditMessage = (id: string) => {
    const message = messages.find((m) => m.id === id);
    if (message) {
      setEditingMessage(message);
      setShowForm(true);
      setActiveTab("messages");
    }
  };

  const handleExport = useCallback(async () => {
    if (!chatRef.current) return;

    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(chatRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#1c1d22",
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
          {/* Tabs */}
          <div className="flex border-b border-[#1e1f22] px-4">
            <button
              type="button"
              onClick={() => setActiveTab("messages")}
              className={`flex-1 border-b-2 py-3 text-sm font-medium transition-colors ${
                activeTab === "messages"
                  ? "border-[#5865f2] text-white"
                  : "border-transparent text-[#b5bac1] hover:text-white"
              }`}
            >
              Mensajes
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("settings")}
              className={`flex items-center justify-center gap-2 flex-1 border-b-2 py-3 text-sm font-medium transition-colors ${
                activeTab === "settings"
                  ? "border-[#5865f2] text-white"
                  : "border-transparent text-[#b5bac1] hover:text-white"
              }`}
            >
              <Settings className="h-4 w-4" />
              Configuración
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "settings" ? (
              <div className="space-y-4">
                <SettingsForm settings={settings} onUpdate={updateSettings} />
                <UserManager
                  users={users}
                  onUpdateUser={updateUser}
                  onDeleteUser={deleteUser}
                />
              </div>
            ) : (
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
                    onAddUser={addUser}
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

                {/* Messages List */}
                {/* Note: UserManager moved to settings tab, but maybe user wants it here too? Kept it only in settings for cleaner UI as requested "ordenados" */}

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
                              onClick={() => deleteMessage(msg.id)}
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
            )}
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
              chatSettings={settings}
              onEditMessage={handleEditMessage}
              onDeleteMessage={deleteMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
