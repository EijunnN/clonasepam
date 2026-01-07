"use client";

import { Gift, Mic, Plus, Smile, Sticker } from "lucide-react";
import { forwardRef } from "react";
import type { DiscordMessage } from "@/types/discord";
import { DateSeparator } from "./date-separator";
import { DiscordMessageItem } from "./message";

interface ChatProps {
  messages: DiscordMessage[];
  onEditMessage?: (id: string) => void;
  onDeleteMessage?: (id: string) => void;
}

function isSameDay(d1: Date, d2: Date): boolean {
  return d1.toDateString() === d2.toDateString();
}

function shouldShowAvatar(
  message: DiscordMessage,
  prevMessage: DiscordMessage | undefined,
): boolean {
  if (!prevMessage) return true;
  if (prevMessage.user.id !== message.user.id) return true;

  const timeDiff =
    message.timestamp.getTime() - prevMessage.timestamp.getTime();
  if (timeDiff > 5 * 60 * 1000) return true;

  return false;
}

export const DiscordChat = forwardRef<HTMLDivElement, ChatProps>(
  function DiscordChat({ messages, onEditMessage, onDeleteMessage }, ref) {
    const sortedMessages = [...messages].sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
    );

    return (
      <div ref={ref} className="flex flex-1 flex-col bg-[#313338]">
        <div className="flex-1 overflow-y-auto pb-4">
          {sortedMessages.map((message, index) => {
            const prevMessage = sortedMessages[index - 1];
            const showDateSeparator =
              !prevMessage ||
              !isSameDay(message.timestamp, prevMessage.timestamp);
            const showAvatar = shouldShowAvatar(message, prevMessage);

            return (
              <div key={message.id}>
                {showDateSeparator && (
                  <DateSeparator date={message.timestamp} />
                )}
                <DiscordMessageItem
                  message={message}
                  showAvatar={showAvatar}
                  onEdit={onEditMessage}
                  onDelete={onDeleteMessage}
                />
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="px-4 pb-6">
          <div className="flex items-center gap-2 rounded-lg bg-[#383a40] px-4">
            <button
              type="button"
              className="flex-shrink-0 rounded-full p-1 text-[#b5bac1] hover:text-white"
            >
              <Plus className="h-6 w-6" />
            </button>
            <input
              type="text"
              placeholder="Mensaje @..."
              className="min-w-0 flex-1 bg-transparent py-3 text-[#dbdee1] placeholder-[#6d6f78] outline-none"
              disabled
            />
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded-full p-1.5 text-[#b5bac1] hover:text-white"
              >
                <Gift className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="rounded-full p-1.5 text-[#b5bac1] hover:text-white"
              >
                <Sticker className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="rounded-full p-1.5 text-[#b5bac1] hover:text-white"
              >
                <Smile className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="rounded-full p-1.5 text-[#b5bac1] hover:text-white"
              >
                <Mic className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
