"use client";

import { CirclePlus, Gift, Mic, Smile, Sticker } from "lucide-react";
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

export function DiscordChat({
  messages,
  chatSettings,
  onEditMessage,
  onDeleteMessage,
}: ChatProps) {
  const sortedMessages = [...messages].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
  );

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[#1c1d22]">
        <div 
          className="min-h-0 flex-1 overflow-y-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
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
          <div className="flex-shrink-0 px-4 pb-6">
            <div className="flex items-center gap-4 rounded-lg bg-[#383a40] px-4 py-2.5">
              <button
                type="button"
                className="flex-shrink-0 text-[#b5bac1] hover:text-[#dbdee1] transition-colors"
              >
                <CirclePlus className="h-6 w-6" />
              </button>
              <div className="h-6 w-px bg-[#4e5058]" />
              <input
                type="text"
                value={chatSettings.inputValue}
                placeholder={chatSettings.inputPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-[#dbdee1] placeholder-[#6d6f78] outline-none text-base"
                disabled
              />
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="text-[#b5bac1] hover:text-[#dbdee1] transition-colors"
                >
                  <Gift className="h-6 w-6" />
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
                <button
                  type="button"
                  className="text-[#b5bac1] hover:text-[#dbdee1] transition-colors"
                >
                  <Mic className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}
