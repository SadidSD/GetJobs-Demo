"use client";

import { MapPin, DollarSign, Briefcase } from "lucide-react";

type JobCardProps = {
  title: string;
  company: string;
  matchPercentage: number;
  skills: string[];
  salary: string;
  location: string;
  onApply?: () => void;
};

export default function JobCard({
  title,
  company,
  matchPercentage,
  skills,
  salary,
  location,
  onApply,
}: JobCardProps) {
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    if (percentage >= 60) return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
  };

  return (
    <div className="group rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm transition-all duration-200 hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-700">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-3">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getMatchColor(matchPercentage)}`}
            >
              {matchPercentage}% match
            </span>
          </div>
          <p className="mb-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">{company}</p>

          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-4 w-4" />
              <span>{salary}</span>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onApply}
        className="mt-4 w-full rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-500 hover:shadow-md active:scale-[0.98] min-h-[44px] sm:min-h-[40px] touch-manipulation"
      >
        Quick Apply
      </button>
    </div>
  );
}

