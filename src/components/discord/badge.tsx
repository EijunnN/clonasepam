import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import type { DiscordBadge as DiscordBadgeType } from "@/types/discord";

interface BadgeProps {
  badge: DiscordBadgeType;
}

export function DiscordBadge({ badge }: BadgeProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons as any)[badge.icon || ""] || null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded px-1 py-0.5 text-[10px] font-semibold text-white",
      )}
      style={{ backgroundColor: badge.color }}
    >
      {IconComponent && <IconComponent className="h-2.5 w-2.5" />}
      {badge.label}
    </span>
  );
}
