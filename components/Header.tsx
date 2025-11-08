"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Bell, ChevronDown, LogOut, User, Settings } from "lucide-react";

type NavLink = { label: string; href: string };

type HeaderProps = {
  navLinks?: NavLink[];
  user?: { name: string; avatarUrl?: string } | null;
};

export default function Header({
  navLinks = [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  user = { name: "Alex Johnson" },
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            className="rounded-lg p-2 md:hidden hover:bg-zinc-100 dark:hover:bg-zinc-900"
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link href="/" className="text-xl font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent">GetJobs</span> <span>AI</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-700 dark:text-zinc-300 md:flex">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-zinc-900 dark:hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </button>
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full border border-zinc-300 px-2 py-1 pl-1 pr-2 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              <div className="h-7 w-7 overflow-hidden rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-500">
                <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-white">
                  {user?.name?.charAt(0) ?? "U"}
                </div>
              </div>
              <span className="hidden sm:block">{user?.name ?? "User"}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {menuOpen ? (
              <div
                className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
                onMouseLeave={() => setMenuOpen(false)}
              >
                <Link href="/dashboard/profile" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <User className="h-4 w-4" /> Profile
                </Link>
                <Link href="/dashboard/settings" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <Settings className="h-4 w-4" /> Settings
                </Link>
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-black/5 bg-white px-6 py-4 dark:border-white/10 dark:bg-black md:hidden">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}


