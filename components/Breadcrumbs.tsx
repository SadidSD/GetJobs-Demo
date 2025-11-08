"use client";

import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
  className?: string;
};

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{item.label}</span>
              )}
              {!isLast ? <span className="text-zinc-400">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}


