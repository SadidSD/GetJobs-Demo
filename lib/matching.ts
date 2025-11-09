import type { Skill } from "../types";

const normalize = (skills: Skill[]): string[] =>
  (skills || [])
    .map((s) => (s ?? "").toString().trim().toLowerCase())
    .filter(Boolean);

export const computeMatchPercentage = (
  candidateSkills: Skill[],
  targetSkills: Skill[]
): number => {
  const a = new Set(normalize(candidateSkills));
  const b = new Set(normalize(targetSkills));
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const s of a) {
    if (b.has(s)) intersection += 1;
  }
  const union = new Set([...a, ...b]).size;
  const jaccard = intersection / union; // 0..1
  return Math.round(jaccard * 100);
};

export const ensureArray = (value: unknown): string[] => {
  if (Array.isArray(value)) return value as string[];
  if (typeof value === "string") return value.split(",").map((v) => v.trim());
  return [];
};