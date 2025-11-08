import React from "react";
import { cn } from "./utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
};

export default function Skeleton({
  className,
  variant = "rectangular",
  width,
  height,
  ...props
}: SkeletonProps) {
  const base = "animate-pulse bg-zinc-200 dark:bg-zinc-800";
  
  const variants = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height) style.height = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={cn(base, variants[variant], className)}
      style={style}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <Skeleton variant="text" width="60%" height={24} className="mb-2" />
      <Skeleton variant="text" width="40%" height={16} className="mb-4" />
      <Skeleton variant="rectangular" height={100} className="mb-4" />
      <div className="flex gap-2">
        <Skeleton variant="rectangular" width={80} height={24} />
        <Skeleton variant="rectangular" width={80} height={24} />
      </div>
    </div>
  );
}

export function SkeletonJobCard() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center gap-3">
        <Skeleton variant="text" width="50%" height={20} />
        <Skeleton variant="rectangular" width={80} height={24} className="rounded-full" />
      </div>
      <Skeleton variant="text" width="40%" height={16} className="mb-4" />
      <div className="mb-4 flex gap-4">
        <Skeleton variant="text" width={120} height={16} />
        <Skeleton variant="text" width={100} height={16} />
      </div>
      <div className="mb-4 flex gap-2">
        <Skeleton variant="rectangular" width={60} height={24} className="rounded-full" />
        <Skeleton variant="rectangular" width={70} height={24} className="rounded-full" />
        <Skeleton variant="rectangular" width={80} height={24} className="rounded-full" />
      </div>
      <Skeleton variant="rectangular" width="100%" height={44} className="rounded-full" />
    </div>
  );
}

