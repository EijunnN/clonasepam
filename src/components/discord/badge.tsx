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
        "inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-medium leading-none",
      )}
      style={{
        backgroundColor: "#303038",
        color: "#c1c1ca"
      }}
    >
      {IconComponent && <IconComponent className="h-[11px] w-[11px]" />}
      <span className="mt-[0.5px]">{badge.label}</span>
    </span>
  );
}
