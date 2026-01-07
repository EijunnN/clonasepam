"use client";

import { CirclePlus, Gift, Smile, Sticker } from "lucide-react";
import { forwardRef } from "react";
import type { DiscordMessage } from "@/types/discord";
import { DateSeparator } from "./date-separator";
import { DiscordMessageItem } from "./message";

interface ChatProps {
  messages: DiscordMessage[];
  chatSettings?: {
    inputValue: string;
    inputPlaceholder: string;
    showInput: boolean;
  };
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
  function DiscordChat(
    { messages, chatSettings, onEditMessage, onDeleteMessage },
    ref,
  ) {
    const sortedMessages = [...messages].sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
    );

    return (
      <div ref={ref} className="flex flex-1 flex-col bg-[#1c1d22]">
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
        {chatSettings?.showInput && (
          <div className="px-4 pb-6">
            <div className="flex items-center gap-3 rounded-lg bg-[#383a40] px-4 py-2.5">
              <button
                type="button"
                className="flex-shrink-0 rounded-full bg-[#b5bac1] p-0.5 text-[#383a40] hover:text-white transition-colors"
              >
                <CirclePlus className="h-5 w-5 fill-current" />
              </button>
              <input
                type="text"
                value={chatSettings.inputValue}
                placeholder={chatSettings.inputPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-[#dbdee1] placeholder-[#949ba4] outline-none text-sm font-medium"
                disabled
              />
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="text-[#b5bac1] hover:text-[#dbdee1] transition-colors"
                >
                  <Gift className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  className="rounded bg-[#b5bac1] px-1.5 py-0.5 text-xs font-bold text-[#383a40] hover:text-white transition-colors"
                >
                  GIF
                </button>
                <button
                  type="button"
                  className="text-[#b5bac1] hover:text-[#dbdee1] transition-colors"
                >
                  <Sticker className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  className="text-[#b5bac1] hover:text-[#dbdee1] transition-colors"
                >
                  <Smile className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);
