import { ChevronLeft, ChevronRight, Phone, Search, Video } from "lucide-react";
import { DiscordAvatar } from "./avatar";

interface HeaderProps {
  name: string;
  avatar?: string;
  status?: string;
  isOnline?: boolean;
}

export function DiscordHeader({ name, avatar, status, isOnline }: HeaderProps) {
  return (
    <div className="flex items-center justify-between bg-[#313338] px-3 py-2 shadow-md">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-full p-1 text-[#b5bac1] hover:text-white"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="relative">
          <DiscordAvatar
            src={avatar || "https://cdn.discordapp.com/embed/avatars/0.png"}
            alt={name}
            size="md"
          />
          {isOnline !== undefined && (
            <span
              className={`absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-[3px] border-[#313338] ${
                isOnline ? "bg-[#23a559]" : "bg-[#80848e]"
              }`}
            />
          )}
        </div>
        <div className="ml-1">
          <div className="flex items-center gap-1">
            <h1 className="font-semibold text-white">{name}</h1>
            <ChevronRight className="h-4 w-4  text-[#b5bac1]" />
          </div>
          {status && (
            <p className="flex items-center gap-1 text-xs text-[#23a559]">
              <span className="inline-block h-2 w-2 rounded-sm bg-[#23a559]" />
              {status}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-full p-2 text-[#b5bac1] hover:text-white"
        >
          <Phone className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="rounded-full p-2 text-[#b5bac1] hover:text-white"
        >
          <Video className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="rounded-full p-2 text-[#b5bac1] hover:text-white"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
