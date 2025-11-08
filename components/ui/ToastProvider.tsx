"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { X } from "lucide-react";

type Toast = {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "warning" | "error";
  durationMs?: number;
};

type ToastContextValue = {
  toasts: Toast[];
  addToast: (t: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    const entry: Toast = { id, durationMs: 3500, ...toast };
    setToasts((prev) => [...prev, entry]);
    if (entry.durationMs && entry.durationMs > 0) {
      setTimeout(() => removeToast(id), entry.durationMs);
    }
  }, [removeToast]);

  const value = useMemo(() => ({ toasts, addToast, removeToast }), [toasts, addToast, removeToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

function ToastViewport({ toasts, onClose }: { toasts: Toast[]; onClose: (id: string) => void }) {
  const variantClass = (v?: Toast["variant"]) => {
    switch (v) {
      case "success":
        return "border-green-600/30 bg-green-600/10";
      case "warning":
        return "border-yellow-600/30 bg-yellow-600/10";
      case "error":
        return "border-red-600/30 bg-red-600/10";
      default:
        return "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900";
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-full max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto overflow-hidden rounded-xl border p-3 shadow-lg backdrop-blur ${variantClass(t.variant)}`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-1">
              {t.title ? <div className="text-sm font-semibold">{t.title}</div> : null}
              {t.description ? (
                <div className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">{t.description}</div>
              ) : null}
            </div>
            <button
              onClick={() => onClose(t.id)}
              className="rounded-md p-1 text-zinc-500 hover:bg-black/5 hover:text-zinc-800 dark:hover:bg-white/10 dark:hover:text-zinc-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}


