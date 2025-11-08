import React from "react";
import { cn } from "./utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export default function Input({ label, error, hint, className, id, ...props }: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  return (
    <div className={cn("w-full", className)}>
      {label ? (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium">
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={cn(
          "w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-zinc-400 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 dark:bg-zinc-900 min-h-[44px] sm:min-h-[40px]",
          error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-zinc-300 focus:border-indigo-500 dark:border-zinc-700"
        )}
        aria-invalid={!!error}
        {...props}
      />
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
      {!error && hint ? <p className="mt-1 text-xs text-zinc-500">{hint}</p> : null}
    </div>
  );
}


