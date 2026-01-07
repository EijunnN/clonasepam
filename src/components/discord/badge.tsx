import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BadgeType } from "@/types/discord";

const badgeConfig: Record<
  BadgeType,
  { label: string; className: string; icon?: React.ReactNode }
> = {
  AUTH: {
    label: "AUTH",
    className: "bg-[#5865f2]",
    icon: <Check className="h-2.5 w-2.5" />,
  },
  CODE: {
    label: "CODE",
    className: "bg-[#23a559]",
    icon: <Zap className="h-2.5 w-2.5" />,
  },
  NITRO: {
    label: "NITRO",
    className: "bg-gradient-to-r from-[#ff73fa] to-[#7289da]",
  },
  BOOST: {
    label: "BOOST",
    className: "bg-[#ff73fa]",
  },
  BOT: {
    label: "BOT",
    className: "bg-[#5865f2]",
  },
  ADMIN: {
    label: "ADMIN",
    className: "bg-[#ed4245]",
  },
  MOD: {
    label: "MOD",
    className: "bg-[#faa61a] text-black",
  },
};

interface BadgeProps {
  type: BadgeType;
}

export function DiscordBadge({ type }: BadgeProps) {
  const config = badgeConfig[type];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded px-1 py-0.5 text-[10px] font-semibold text-white",
        config.className,
      )}
    >
      {config.icon}
      {config.label}
    </span>
  );
}
