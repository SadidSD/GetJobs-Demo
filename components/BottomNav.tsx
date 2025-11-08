"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, User, Settings } from "lucide-react";

type Item = { label: string; href: string; icon: React.ReactNode };

type BottomNavProps = {
  items?: Item[];
};

export default function BottomNav({
  items = [
    { label: "Home", href: "/dashboard", icon: <Home className="h-5 w-5" /> },
    { label: "Jobs", href: "/dashboard/jobs", icon: <Briefcase className="h-5 w-5" /> },
    { label: "Profile", href: "/dashboard/profile", icon: <User className="h-5 w-5" /> },
    { label: "Settings", href: "/dashboard/settings", icon: <Settings className="h-5 w-5" /> },
  ],
}: BottomNavProps) {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/60 lg:hidden">
      <div className="flex items-center justify-around px-4 py-3">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 rounded-lg px-4 py-2 text-xs font-medium ${
                active ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


