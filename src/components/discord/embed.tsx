import { Play } from "lucide-react";
import type { DiscordEmbed } from "@/types/discord";

interface EmbedProps {
  embed: DiscordEmbed;
}

export function DiscordEmbedCard({ embed }: EmbedProps) {
  if (embed.type === "youtube") {
    return (
      <div className="mt-2 max-w-md overflow-hidden rounded border-l-4 border-[#ff0000] bg-[#2b2d31]">
        <div className="p-3">
          <p className="text-xs font-medium text-[#dbdee1]">
            {embed.siteName || "YouTube"}
          </p>
          <p className="text-xs text-[#b5bac1]">{embed.author}</p>
          <p className="mt-1 font-semibold text-[#00a8fc] hover:underline cursor-pointer">
            {embed.title}
          </p>
        </div>
        {embed.thumbnail && (
          <div className="relative">
            <img src={embed.thumbnail} alt={embed.title} className="w-full" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60 transition-transform hover:scale-110">
                <Play className="h-8 w-8 fill-white text-white" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (embed.type === "image") {
    return (
      <div className="mt-2 max-w-md overflow-hidden rounded-lg">
        <img
          src={embed.url}
          alt={embed.title || "Image"}
          className="max-h-80 w-auto rounded-lg"
        />
      </div>
    );
  }

  return (
    <div className="mt-2 max-w-md overflow-hidden rounded border-l-4 border-[#5865f2] bg-[#2b2d31] p-3">
      {embed.siteName && (
        <p className="text-xs text-[#b5bac1]">{embed.siteName}</p>
      )}
      {embed.title && (
        <p className="font-semibold text-[#00a8fc] hover:underline cursor-pointer">
          {embed.title}
        </p>
      )}
      {embed.description && (
        <p className="mt-1 text-sm text-[#dbdee1]">{embed.description}</p>
      )}
      {embed.thumbnail && (
        <img
          src={embed.thumbnail}
          alt={embed.title}
          className="mt-2 max-h-40 rounded"
        />
      )}
    </div>
  );
}
