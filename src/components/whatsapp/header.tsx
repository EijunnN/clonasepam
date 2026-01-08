import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WhatsAppChatSettings } from "@/types/whatsapp";

interface WhatsAppHeaderProps {
  settings: WhatsAppChatSettings;
}

export function WhatsAppHeader({ settings }: WhatsAppHeaderProps) {
  return (
    <div 
      className={cn(
        "flex items-center justify-between px-2 py-2 shadow-sm transition-colors",
        settings.darkMode ? "bg-[#202c33] text-[#e9edef]" : "bg-[#008069] text-white"
      )}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <ArrowLeft className="h-6 w-6 cursor-pointer" />
          <div className="h-9 w-9 overflow-hidden rounded-full bg-gray-300 ml-1">
            <img
              src={settings.contactAvatar}
              alt={settings.contactName}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-base font-semibold leading-tight">
            {settings.contactName}
          </span>
          <span className={cn("text-xs leading-tight", settings.darkMode ? "text-[#8696a0]" : "text-white/80")}>
            {settings.status}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 pr-2">
        <Video className="h-6 w-6 cursor-pointer" />
        <Phone className="h-5 w-5 cursor-pointer" />
        <MoreVertical className="h-5 w-5 cursor-pointer" />
      </div>
    </div>
  );
}
