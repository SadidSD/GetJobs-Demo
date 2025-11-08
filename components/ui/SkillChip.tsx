import React from "react";
import { X } from "lucide-react";
import { cn } from "./utils";

type SkillChipProps = {
  label: string;
  onRemove?: () => void;
  selected?: boolean;
  className?: string;
};

export default function SkillChip({ label, onRemove, selected, className }: SkillChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
        selected ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300" : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
        className
      )}
    >
      {label}
      {onRemove ? (
        <button type="button" onClick={onRemove} className="rounded-full p-0.5 hover:bg-black/5 dark:hover:bg-white/10">
          <X className="h-3 w-3" />
        </button>
      ) : null}
    </span>
  );
}


