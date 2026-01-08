import { Mic, Paperclip, Smile } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WhatsAppChatSettings } from "@/types/whatsapp";

interface WhatsAppInputProps {
  settings: WhatsAppChatSettings;
}

export function WhatsAppInput({ settings }: WhatsAppInputProps) {
  if (!settings.showInput) return null;

  const isDark = settings.darkMode;

  return (
    <div 
      className={cn(
        "flex items-center gap-2 px-2 py-2",
        isDark ? "bg-[#202c33]" : "bg-[#f0f2f5]"
      )}
    >
      <button className={cn("p-1", isDark ? "text-[#8696a0]" : "text-[#54656f]")}>
        <Smile className="h-6 w-6" />
      </button>
      <button className={cn("p-1", isDark ? "text-[#8696a0]" : "text-[#54656f]")}>
        <Paperclip className="h-6 w-6" />
      </button>
      
      <div 
        className={cn(
          "flex-1 rounded-lg px-4 py-2",
          isDark ? "bg-[#2a3942]" : "bg-white"
        )}
      >
        <input
          type="text"
          value={settings.inputValue}
          placeholder={settings.inputPlaceholder}
          className={cn(
            "w-full bg-transparent outline-none text-base",
            isDark ? "text-[#e9edef] placeholder-[#8696a0]" : "text-[#111b21] placeholder-[#667781]"
          )}
          disabled
        />
      </div>

      <button 
        className={cn(
          "flex items-center justify-center rounded-full p-2 shadow-sm",
          isDark ? "bg-[#00a884] text-white" : "bg-[#00a884] text-white"
        )}
      >
        <Mic className="h-5 w-5" />
      </button>
    </div>
  );
}
