import { Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WhatsAppMessage } from "@/types/whatsapp";

interface WhatsAppMessageItemProps {
  message: WhatsAppMessage;
  isDark?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
}

export function WhatsAppMessageItem({ message, isDark, onEdit, onDelete }: WhatsAppMessageItemProps) {
  const isMe = message.user.isMe;

  // Colors for dark mode
  const bubbleColor = isMe 
    ? (isDark ? "bg-[#005c4b]" : "bg-[#e7ffdb]") 
    : (isDark ? "bg-[#202c33]" : "bg-white");
    
  const tailColor = isMe
    ? (isDark ? "border-t-[#005c4b] border-l-[#005c4b]" : "border-t-[#e7ffdb] border-l-[#e7ffdb]")
    : (isDark ? "border-t-[#202c33] border-r-[#202c33]" : "border-t-white border-r-white");

  const textColor = isDark ? "text-[#e9edef]" : "text-[#111b21]";
  const timeColor = isDark ? "text-[#8696a0]" : "text-[#667781]";
  const checkColor = isDark ? "text-[#53bdeb]" : "text-[#53bdeb]"; // Read color is similar
  const checkPendingColor = isDark ? "text-[#8696a0]" : "text-[#667781]";

  return (
    <div
      className={cn(
        "group relative mb-2 flex w-full",
        isMe ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "relative max-w-[80%] rounded-lg px-2 py-1 shadow-sm text-sm",
          bubbleColor,
          isMe ? "rounded-tr-none" : "rounded-tl-none"
        )}
      >
        {/* Triangle for bubble tail */}
        <div
          className={cn(
            "absolute top-0 w-0 h-0 border-[6px] border-transparent",
            isMe
              ? "-right-[10px]"
              : "-left-[10px]",
            tailColor
          )}
        />
        
        {/* Sender Name in group chats (if not me) */}
        {!isMe && !message.isSystem && (
           null
        )}

        <div className={cn("break-words", textColor)}>
          {message.content}
        </div>

        <div className="flex items-center justify-end gap-1 mt-0.5 select-none">
          <span className={cn("text-[10px]", timeColor)}>
            {formatTime(message.timestamp)}
          </span>
          {isMe && (
            <span className={cn(
              "text-[10px]",
              message.status === "read" ? checkColor : checkPendingColor
            )}>
              {message.status === "sent" && <Check className="h-3 w-3" />}
              {(message.status === "delivered" || message.status === "read") && (
                <CheckCheck className="h-3 w-3" />
              )}
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute top-0 -right-16 hidden group-hover:flex bg-white/90 rounded shadow-sm border border-gray-100 z-10">
          <button
            onClick={() => onEdit?.(message.id)}
            className="p-1.5 hover:bg-gray-100 text-gray-600"
            title="Edit"
          >
             ✏️
          </button>
          <button
            onClick={() => onDelete?.(message.id)}
            className="p-1.5 hover:bg-red-50 text-red-500"
            title="Delete"
          >
             🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
