"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { WhatsAppChatSettings, WhatsAppMessage } from "@/types/whatsapp";
import { WhatsAppHeader } from "./header";
import { WhatsAppInput } from "./input";
import { WhatsAppMessageItem } from "./message";

interface WhatsAppChatProps {
  messages: WhatsAppMessage[];
  settings: WhatsAppChatSettings;
  onEditMessage?: (id: string) => void;
  onDeleteMessage?: (id: string) => void;
}

export const WhatsAppChat = forwardRef<HTMLDivElement, WhatsAppChatProps>(
  function WhatsAppChat({ messages, settings, onEditMessage, onDeleteMessage }, ref) {
    const sortedMessages = [...messages].sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
    );

    return (
      <div 
        ref={ref} 
        className={cn(
          "flex flex-1 flex-col overflow-hidden",
          settings.darkMode ? "bg-[#0b141a]" : "bg-[#e5ddd5]"
        )}
      >
        <WhatsAppHeader settings={settings} />
        
        <div 
          className="relative flex-1 overflow-y-auto px-4 py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{
            backgroundImage: `url(${settings.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: settings.darkMode ? 0.9 : 1, // Slight dim for dark mode
          }}
        >
          {settings.darkMode && (
            <div className="absolute inset-0 bg-[#0b141a]/90 pointer-events-none -z-10" />
          )}
          
          <div className="flex flex-col justify-end min-h-full pb-2 relative z-0">
             {sortedMessages.map((msg) => (
                <WhatsAppMessageItem
                  key={msg.id}
                  message={msg}
                  isDark={settings.darkMode}
                  onEdit={onEditMessage}
                  onDelete={onDeleteMessage}
                />
             ))}
          </div>
        </div>

        <WhatsAppInput settings={settings} />
      </div>
    );
  }
);
