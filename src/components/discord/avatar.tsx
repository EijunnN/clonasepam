import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

export function DiscordAvatar({
  src,
  alt,
  size = "md",
  className,
}: AvatarProps) {
  return (
    <div
      className={cn(
        "relative flex-shrink-0 overflow-hidden rounded-full bg-[#313338]",
        sizeClasses[size],
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 5)}.png`;
        }}
      />
    </div>
  );
}
