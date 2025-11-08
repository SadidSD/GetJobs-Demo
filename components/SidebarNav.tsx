"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, User, Settings, FilePlus2 } from "lucide-react";

type Item = { label: string; href: string; icon: React.ReactNode };

type SidebarNavProps = {
  items?: Item[];
  className?: string;
};

export default function SidebarNav({
  items = [
    { label: "Dashboard", href: "/dashboard", icon: <Home className="h-5 w-5" /> },
    { label: "My Jobs", href: "/dashboard/jobs", icon: <Briefcase className="h-5 w-5" /> },
    { label: "Post a Job", href: "/dashboard/jobs/new", icon: <FilePlus2 className="h-5 w-5" /> },
    { label: "Profile", href: "/dashboard/profile", icon: <User className="h-5 w-5" /> },
    { label: "Settings", href: "/dashboard/settings", icon: <Settings className="h-5 w-5" /> },
  ],
  className,
}: SidebarNavProps) {
  const pathname = usePathname();
  return (
    <nav className={`rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${className ?? ""}`}>
      <ul className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}


