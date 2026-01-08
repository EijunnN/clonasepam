import * as LucideIcons from "lucide-react";
import type { ComponentType } from "react";
import { cn } from "@/lib/utils";
import type { DiscordBadge as DiscordBadgeType } from "@/types/discord";
import { type BadgeIconName, BadgeIcons } from "./badge-icons";

interface BadgeProps {
  badge: DiscordBadgeType;
}

export function DiscordBadge({ badge }: BadgeProps) {
  // Check if it's a custom badge icon
  const CustomIcon = BadgeIcons[badge.icon as BadgeIconName];

  // Fallback to Lucide icons if not found in custom set (for backward compatibility)
  const IconComponent =
    CustomIcon ||
    (
      LucideIcons as unknown as Record<
        string,
        ComponentType<{ className?: string }>
      >
    )[badge.icon || ""] ||
    null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-medium leading-none",
      )}
      style={{
        backgroundColor: "#2a3435",
        color: "#c1c1ca",
      }}
    >
      {IconComponent && <IconComponent className="h-[11px] w-[11px]" />}
      <span className="mt-[0.5px]">{badge.label}</span>
    </span>
  );
}
