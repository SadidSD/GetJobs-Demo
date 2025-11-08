"use client";

import React from "react";
import { useParams } from "next/navigation";
import JobDetailPage from "@/components/JobDetailPage";

export default function JobDetailsRoute() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <main className="page-transition min-h-screen bg-zinc-50 dark:bg-black">
      {/* Optional: show id badge for context when using mock data */}
      <div className="mx-auto max-w-7xl px-4 pt-4 text-xs text-zinc-500 dark:text-zinc-400">
        Viewing job #{id}
      </div>
      <JobDetailPage />
    </main>
  );
}