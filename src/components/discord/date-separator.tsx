interface DateSeparatorProps {
  date: Date;
}

export function DateSeparator({ date }: DateSeparatorProps) {
  const formattedDate = date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="my-4 flex items-center justify-center px-4">
      <div className="h-px flex-1 bg-[#3f4147]" />
      <span className="px-2 text-xs font-medium text-[#949ba4]">
        {formattedDate}
      </span>
      <div className="h-px flex-1 bg-[#3f4147]" />
    </div>
  );
}
