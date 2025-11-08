"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";

type SkillGap = {
  skill: string;
  status: "missing" | "needs-improvement" | "good";
};

type SkillGapCardProps = {
  gaps: SkillGap[];
  careerHealthScore: number;
};

export default function SkillGapCard({ gaps, careerHealthScore }: SkillGapCardProps) {
  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-blue-600 dark:text-blue-400";
    return "text-yellow-600 dark:text-yellow-400";
  };

  const getStatusIcon = (status: SkillGap["status"]) => {
    if (status === "good") {
      return <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />;
    }
    return <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />;
  };

  const getStatusLabel = (status: SkillGap["status"]) => {
    if (status === "good") return "Strong";
    if (status === "needs-improvement") return "Needs work";
    return "Missing";
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Career Health Score</h3>
      <div className="mb-6">
        <div className={`text-4xl font-bold ${getHealthColor(careerHealthScore)}`}>
          {careerHealthScore}
        </div>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Based on skill demand and your profile</p>
      </div>

      <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
        <h4 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Skill Gap Analysis</h4>
        <div className="space-y-3">
          {gaps.map((gap, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(gap.status)}
                <span className="text-sm text-zinc-700 dark:text-zinc-300">{gap.skill}</span>
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">{getStatusLabel(gap.status)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

