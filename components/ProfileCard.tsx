"use client";

import { TrendingUp, Star } from "lucide-react";

type ProfileCardProps = {
  name: string;
  avatar: string;
  matchScore: number;
  skills: string[];
};

export default function ProfileCard({ name, avatar, matchScore, skills }: ProfileCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center gap-4">
        <div className="h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-500">
          {avatar ? (
            <img src={avatar} alt={name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-white">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{name}</h3>
          <div className="mt-1 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{matchScore}% match</span>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Skills</p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

