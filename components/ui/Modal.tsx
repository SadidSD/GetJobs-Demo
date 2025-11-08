"use client";

import React, { useEffect } from "react";
import { cn } from "./utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

export default function Modal({ open, onClose, title, children, footer, size = "md" }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300",
        open ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "relative w-full rounded-2xl border border-zinc-200 bg-white shadow-xl transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900",
          sizes[size],
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        {title ? (
          <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        ) : null}
        <div className="p-4">{children}</div>
        {footer ? <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">{footer}</div> : null}
      </div>
    </div>
  );
}


