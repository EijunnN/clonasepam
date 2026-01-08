"use client";

import { Plus, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import type { DiscordMessage, DiscordUser } from "@/types/discord";

interface MessageFormProps {
  message?: DiscordMessage;
  users: DiscordUser[];
  onSave: (message: Omit<DiscordMessage, "id"> & { id?: string }) => void;
  onCancel: () => void;
  onAddUser: (user: DiscordUser) => void;
}

export function MessageForm({
  message,
  users,
  onSave,
  onCancel,
  onAddUser,
}: MessageFormProps) {
  const [selectedUserId, setSelectedUserId] = useState(
    message?.user.id || users[0]?.id || "",
  );
  const [content, setContent] = useState(message?.content || "");
  const [timestamp, setTimestamp] = useState(
    message?.timestamp
      ? new Date(
          message.timestamp.getTime() -
            message.timestamp.getTimezoneOffset() * 60000,
        )
          .toISOString()
          .slice(0, 16)
      : new Date().toISOString().slice(0, 16),
  );
  const [imageUrl, setImageUrl] = useState(
    message?.attachments?.[0]?.url || "",
  );
  const [embedUrl, setEmbedUrl] = useState(message?.embeds?.[0]?.url || "");
  const [embedTitle, setEmbedTitle] = useState(message?.embeds?.[0]?.title || "");
  const [embedAuthor, setEmbedAuthor] = useState(message?.embeds?.[0]?.author || "");
  const [isFetchingEmbed, setIsFetchingEmbed] = useState(false);
  const [showNewUserForm, setShowNewUserForm] = useState(false);

  useEffect(() => {
    const fetchYoutubeInfo = async () => {
      if (!embedUrl) return;
      
      const isYoutube = embedUrl.includes("youtube.com") || embedUrl.includes("youtu.be");
      if (!isYoutube) return;

      setIsFetchingEmbed(true);
      try {
        const response = await fetch(
          `https://www.youtube.com/oembed?url=${encodeURIComponent(embedUrl)}&format=json`
        );
        if (response.ok) {
          const data = await response.json();
          if (!embedTitle) setEmbedTitle(data.title || "");
          if (!embedAuthor) setEmbedAuthor(data.author_name || "");
        }
      } catch (error) {
        console.error("Error fetching YouTube info:", error);
      } finally {
        setIsFetchingEmbed(false);
      }
    };

    const timeoutId = setTimeout(fetchYoutubeInfo, 500);
    return () => clearTimeout(timeoutId);
  }, [embedUrl]);
  const [newUser, setNewUser] = useState<Partial<DiscordUser>>({
    username: "",
    avatar: "",
    badges: [],
  });

  const selectedUser = users.find((u) => u.id === selectedUserId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !content.trim()) return;

    const attachments = imageUrl
      ? [{ id: crypto.randomUUID(), type: "image" as const, url: imageUrl }]
      : undefined;

    let embeds = undefined;
    if (embedUrl) {
      const isYoutube =
        embedUrl.includes("youtube.com") || embedUrl.includes("youtu.be");
      embeds = [
        {
          type: isYoutube ? ("youtube" as const) : ("link" as const),
          url: embedUrl,
          title: embedTitle || (isYoutube ? "YouTube Video" : "Link"),
          author: embedAuthor || undefined,
          siteName: isYoutube ? "YouTube" : undefined,
          thumbnail: isYoutube
            ? `https://img.youtube.com/vi/${extractYoutubeId(embedUrl)}/maxresdefault.jpg`
            : undefined,
        },
      ];
    }

    onSave({
      id: message?.id,
      user: selectedUser,
      content: content.trim(),
      timestamp: new Date(timestamp),
      attachments,
      embeds,
    });
  };

  const handleAddUser = () => {
    if (!newUser.username?.trim()) return;
    const user: DiscordUser = {
      id: crypto.randomUUID(),
      username: newUser.username.trim(),
      avatar:
        newUser.avatar ||
        `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 5)}.png`,
      badges: [],
    };
    onAddUser(user);
    setSelectedUserId(user.id);
    setShowNewUserForm(false);
    setNewUser({ username: "", avatar: "", badges: [] });
  };

  return (
    <div className="rounded-lg bg-[#1e1f22] p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">
          {message ? "Editar mensaje" : "Nuevo mensaje"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="rounded p-1 text-[#b5bac1] hover:bg-[#35373c] hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#b5bac1]">
            Usuario
          </label>
          <div className="flex gap-2">
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="flex-1 rounded-md bg-[#1e1f22] border border-[#3f4147] px-3 py-2 text-sm text-white focus:border-[#5865f2] focus:outline-none"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowNewUserForm(!showNewUserForm)}
              className="rounded-md bg-[#5865f2] px-3 py-2 text-white hover:bg-[#4752c4]"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        {showNewUserForm && (
          <div className="space-y-3 rounded-md border border-[#3f4147] bg-[#2b2d31] p-3">
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              className="w-full rounded-md bg-[#1e1f22] border border-[#3f4147] px-3 py-2 text-sm text-white placeholder-[#6d6f78] focus:border-[#5865f2] focus:outline-none"
            />
            <input
              type="url"
              placeholder="URL del avatar (opcional)"
              value={newUser.avatar}
              onChange={(e) =>
                setNewUser({ ...newUser, avatar: e.target.value })
              }
              className="w-full rounded-md bg-[#1e1f22] border border-[#3f4147] px-3 py-2 text-sm text-white placeholder-[#6d6f78] focus:border-[#5865f2] focus:outline-none"
            />

            <button
              type="button"
              onClick={handleAddUser}
              className="w-full rounded-md bg-[#23a559] py-2 text-sm font-medium text-white hover:bg-[#1a7f42]"
            >
              Agregar usuario
            </button>
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#b5bac1]">
            Mensaje
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe el mensaje..."
            rows={3}
            className="w-full rounded-md bg-[#1e1f22] border border-[#3f4147] px-3 py-2 text-sm text-white placeholder-[#6d6f78] focus:border-[#5865f2] focus:outline-none resize-none"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#b5bac1]">
            Fecha y hora
          </label>
          <input
            type="datetime-local"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            className="w-full rounded-md bg-[#1e1f22] border border-[#3f4147] px-3 py-2 text-sm text-white focus:border-[#5865f2] focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#b5bac1]">
            Imagen (URL)
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-md bg-[#1e1f22] border border-[#3f4147] px-3 py-2 text-sm text-white placeholder-[#6d6f78] focus:border-[#5865f2] focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#b5bac1]">
            Embed URL (YouTube, etc.)
          </label>
          <input
            type="url"
            value={embedUrl}
            onChange={(e) => setEmbedUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full rounded-md bg-[#1e1f22] border border-[#3f4147] px-3 py-2 text-sm text-white placeholder-[#6d6f78] focus:border-[#5865f2] focus:outline-none"
          />
        </div>

        {embedUrl && (
          <>
            {isFetchingEmbed && (
              <div className="flex items-center gap-2 text-xs text-[#b5bac1]">
                <Loader2 className="h-3 w-3 animate-spin" />
                Obteniendo información del video...
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#b5bac1]">
                Título del video
              </label>
              <input
                type="text"
                value={embedTitle}
                onChange={(e) => setEmbedTitle(e.target.value)}
                placeholder="Título del video..."
                className="w-full rounded-md bg-[#1e1f22] border border-[#3f4147] px-3 py-2 text-sm text-white placeholder-[#6d6f78] focus:border-[#5865f2] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#b5bac1]">
                Canal / Autor
              </label>
              <input
                type="text"
                value={embedAuthor}
                onChange={(e) => setEmbedAuthor(e.target.value)}
                placeholder="Nombre del canal..."
                className="w-full rounded-md bg-[#1e1f22] border border-[#3f4147] px-3 py-2 text-sm text-white placeholder-[#6d6f78] focus:border-[#5865f2] focus:outline-none"
              />
            </div>
          </>
        )}

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-md border border-[#3f4147] py-2 text-sm font-medium text-[#b5bac1] hover:bg-[#35373c] hover:text-white"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 rounded-md bg-[#5865f2] py-2 text-sm font-medium text-white hover:bg-[#4752c4]"
          >
            {message ? "Guardar" : "Agregar"}
          </button>
        </div>
      </form>
    </div>
  );
}

function extractYoutubeId(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match?.[1] || "";
}
