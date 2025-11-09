import { computeMatchPercentage } from "./matching";
import type {
  Job,
  Talent,
  JobSuggestionRequest,
  TalentSuggestionRequest,
} from "../types";

const randomId = () => Math.random().toString(36).slice(2, 10);

// Optional: external AI config via env vars
const AI_API_URL = process.env.AI_API_URL; // e.g. https://openrouter.ai/api/v1
const AI_API_KEY = process.env.AI_API_KEY;
const AI_MODEL = process.env.AI_MODEL || "openrouter/auto";

const isOpenRouter = !!AI_API_URL && /openrouter\.ai\/api\/v1/.test(AI_API_URL);

async function callOpenRouterJobs(skills: string[]): Promise<Job[]> {
  const url = `${AI_API_URL}/chat/completions`;
  const system =
    "You are an expert job recommender. Given a list of candidate skills, return strict JSON only. The JSON should have the shape: {\n  \"jobs\": [{\n    \"title\": string,\n    \"description\": string,\n    \"skills\": string[]\n  } ...]\n}. Do not include code fences or any extra commentary.";
  const user = `Skills: ${skills.join(", ")}. Generate 5 realistic job suggestions, varied seniority and roles, closely matched to these skills. Return strict JSON.`;
  const body = {
    model: AI_MODEL,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    temperature: 0.2,
    max_tokens: 700,
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_API_KEY}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let msg = "";
    try {
      msg = await res.text();
    } catch {}
    console.error("OpenRouter jobs request failed:", res.status, res.statusText, msg);
    return [];
  }
  const data = await res.json();
  const content: string | undefined = data?.choices?.[0]?.message?.content;
  if (!content) return [];
  // Attempt to extract JSON even if wrapped in fences
  const start = content.indexOf("{");
  const end = content.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return [];
  const jsonStr = content.slice(start, end + 1);
  try {
    const parsed = JSON.parse(jsonStr) as { jobs?: Omit<Job, "id" | "match">[] };
    return (parsed.jobs || []).map((j) => ({
      id: randomId(),
      title: j.title,
      description: j.description,
      skills: j.skills || [],
      match: computeMatchPercentage(skills, j.skills || []),
    }));
  } catch {
    return [];
  }
}

async function callOpenRouterTalents(requirements: string[]): Promise<Talent[]> {
  const url = `${AI_API_URL}/chat/completions`;
  const system =
    "You are an expert talent recommender. Given a list of role requirements, return strict JSON only. The JSON should have the shape: {\n  \"talents\": [{\n    \"name\": string,\n    \"skills\": string[]\n  } ...]\n}. Do not include code fences or any extra commentary.";
  const user = `Requirements: ${requirements.join(", ")}. Generate 5 realistic candidate profiles with representative names and skills. Return strict JSON.`;
  const body = {
    model: AI_MODEL,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    temperature: 0.2,
    max_tokens: 700,
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_API_KEY}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let msg = "";
    try {
      msg = await res.text();
    } catch {}
    console.error("OpenRouter talents request failed:", res.status, res.statusText, msg);
    return [];
  }
  const data = await res.json();
  const content: string | undefined = data?.choices?.[0]?.message?.content;
  if (!content) return [];
  const start = content.indexOf("{");
  const end = content.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return [];
  const jsonStr = content.slice(start, end + 1);
  try {
    const parsed = JSON.parse(jsonStr) as { talents?: Omit<Talent, "id" | "match">[] };
    return (parsed.talents || []).map((t) => ({
      id: randomId(),
      name: t.name,
      skills: t.skills || [],
      match: computeMatchPercentage(t.skills || [], requirements),
    }));
  } catch {
    return [];
  }
}

// Normalize common aliases/short forms to canonical skill names
function normalizeSkills(arr: string[]): string[] {
  const map: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    "node.js": "node",
    nodejs: "node",
    reactjs: "react",
    "tailwind css": "tailwind",
    tailwindcss: "tailwind",
    postgres: "postgresql",
    sql: "postgresql",
    mongo: "mongodb",
    "aws cloud": "aws",
    nx: "nextjs",
    next: "nextjs",
  };
  const canonical = arr.map((s) => map[s.toLowerCase()] || s.toLowerCase());
  return Array.from(new Set(canonical));
}

function titleFor(skill: string): string {
  switch (skill) {
    case "react":
      return "React Frontend Developer";
    case "typescript":
      return "TypeScript Frontend Engineer";
    case "node":
      return "Node.js Backend Developer";
    case "nextjs":
      return "Full-Stack Engineer (Next.js)";
    case "tailwind":
      return "UI Engineer (Tailwind CSS)";
    case "aws":
      return "Cloud Engineer (AWS)";
    case "postgresql":
      return "Backend Engineer (PostgreSQL)";
    case "mongodb":
      return "Backend Engineer (MongoDB)";
    default:
      return `${skill.charAt(0).toUpperCase()}${skill.slice(1)} Engineer`;
  }
}

function descriptionFor(primary: string, supporting: string[]): string {
  const list = [primary, ...supporting].join(", ");
  return `Build and ship features using ${list}. Collaborate across product and platform.`;
}

function pickSupporting(skills: string[], primary: string, count = 2): string[] {
  const pool = skills.filter((s) => s !== primary);
  const defaults = ["react", "typescript", "node", "nextjs", "tailwind", "aws", "postgresql"];
  const combined = Array.from(new Set([...pool, ...defaults]));
  return combined.slice(0, count);
}

export async function generateJobSuggestions(
  req: JobSuggestionRequest
): Promise<Job[]> {
  const skills = normalizeSkills((req?.skills || []).map((s) => s.trim()).filter(Boolean));
  // Attempt external AI provider if configured
  if (AI_API_URL && AI_API_KEY) {
    try {
      if (isOpenRouter) {
        const jobs = await callOpenRouterJobs(skills);
        if (jobs.length) return jobs;
      } else {
        const res = await fetch(`${AI_API_URL}/jobs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AI_API_KEY}`,
          },
          body: JSON.stringify({ skills }),
        });
        if (res.ok) {
          const data = (await res.json()) as { jobs: Omit<Job, "id" | "match">[] };
          const out = (data?.jobs || []).map((j) => ({
            id: randomId(),
            title: j.title,
            description: j.description,
            skills: j.skills || [],
            match: computeMatchPercentage(skills, j.skills || []),
          }));
          if (out.length) return out;
        }
      }
    } catch (err) {
      console.error("AI job suggestion failed:", err);
    }
  }

  // No mock fallback: require external AI to be configured
  return [];
}

export async function generateTalentSuggestions(
  req: TalentSuggestionRequest
): Promise<Talent[]> {
  const requirements = (req?.requirements || [])
    .map((s) => s.trim())
    .filter(Boolean);

  if (AI_API_URL && AI_API_KEY) {
    try {
      if (isOpenRouter) {
        const talents = await callOpenRouterTalents(requirements);
        if (talents.length) return talents;
      } else {
        const res = await fetch(`${AI_API_URL}/talents`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AI_API_KEY}`,
          },
          body: JSON.stringify({ requirements }),
        });
        if (res.ok) {
          const data = (await res.json()) as { talents: Omit<Talent, "id" | "match">[] };
          const out = (data?.talents || []).map((t) => ({
            id: randomId(),
            name: t.name,
            skills: t.skills || [],
            match: computeMatchPercentage(t.skills || [], requirements),
          }));
          if (out.length) return out;
        }
      }
    } catch (err) {
      console.error("AI talent suggestion failed:", err);
    }
  }

  // No mock fallback: require external AI to be configured
  return [];
}