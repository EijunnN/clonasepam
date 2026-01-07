import { Pencil, Trash2 } from "lucide-react";
import type { DiscordMessage } from "@/types/discord";
import { DiscordAvatar } from "./avatar";
import { DiscordBadge } from "./badge";
import { DiscordEmbedCard } from "./embed";

interface MessageProps {
  message: DiscordMessage;
  showAvatar?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

function formatTimestamp(date: Date): string {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const time = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) {
    return `hoy a las ${time}`;
  }
  if (isYesterday) {
    return `ayer a las ${time}`;
  }
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }) + ` ${time}`;
}

function parseContent(content: string): React.ReactNode[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = content.split(urlRegex);

  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={i}
          href={part}
          className="text-[#00a8fc] hover:underline break-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function DiscordMessageItem({
  message,
  showAvatar = true,
  onEdit,
  onDelete,
}: MessageProps) {
  return (
    <div className="group relative flex gap-4 px-4 py-0.5 hover:bg-[#2e3035]">
      {showAvatar ? (
        <div className="mt-1 flex-shrink-0">
          <DiscordAvatar
            src={message.user.avatar}
            alt={message.user.username}
            size="md"
          />
        </div>
      ) : (
        <div className="w-10 flex-shrink-0" />
      )}

      <div className="min-w-0 flex-1">
        {showAvatar && (
          <div className="flex flex-wrap items-center gap-1">
            <span className="font-medium text-[#f2f3f5]">
              {message.user.username}
            </span>
            {message.user.badges?.map((badge) => (
              <DiscordBadge key={badge.id} badge={badge} />
            ))}
            <span className="ml-1 text-xs text-[#949ba4]">
              {formatTimestamp(message.timestamp)}
            </span>
          </div>
        )}

        <div className="whitespace-pre-wrap break-words text-[#dbdee1]">
          {parseContent(message.content)}
          {message.isEdited && (
            <span className="ml-1 text-[10px] text-[#949ba4]">(editado)</span>
          )}
        </div>

        {message.attachments?.map((attachment) => (
          <div key={attachment.id} className="mt-2">
            {attachment.type === "image" && (
              <img
                src={attachment.url}
                alt={attachment.name || "Attachment"}
                className="max-h-80 max-w-full rounded-lg"
              />
            )}
          </div>
        ))}

        {message.embeds?.map((embed, i) => (
          <DiscordEmbedCard key={i} embed={embed} />
        ))}
      </div>

      {(onEdit || onDelete) && (
        <div className="absolute -top-3 right-4 hidden rounded border border-[#1e1f22] bg-[#313338] shadow-lg group-hover:flex">
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(message.id)}
              className="p-2 text-[#b5bac1] hover:bg-[#393c41] hover:text-white"
            >
              <Pencil className="h-4 w-4" />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(message.id)}
              className="p-2 text-[#ed4245] hover:bg-[#393c41]"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
