"use client";

import React from "react";
import { cn } from "./utils";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
};

export default function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth,
  children,
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98] touch-manipulation";
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-md active:bg-indigo-700",
    secondary: "bg-zinc-900 text-white hover:bg-zinc-800 hover:shadow-md active:bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:active:bg-zinc-300",
    outline: "border border-zinc-300 text-zinc-900 hover:bg-zinc-100 hover:border-zinc-400 active:bg-zinc-200 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900 dark:hover:border-zinc-600 dark:active:bg-zinc-800",
  };
  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-2 text-xs min-h-[36px] sm:min-h-[32px]",
    md: "px-4 py-3 text-sm min-h-[44px] sm:min-h-[40px]",
    lg: "px-6 py-3.5 text-base min-h-[48px] sm:min-h-[44px]",
  };

  return (
    <button
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className
      )}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}


