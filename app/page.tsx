"use client";

import Link from "next/link";
import Image from "next/image";
import { Brain, ShieldCheck, BadgeCheck, Scale } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Simple extractor: supports comma-separated or free-text descriptions
const STOPWORDS = new Set([
  "i",
  "am",
  "a",
  "an",
  "and",
  "with",
  "of",
  "for",
  "to",
  "in",
  "on",
  "the",
  "my",
  "as",
  "have",
  "has",
  "experienced",
  "experience",
  "work",
  "working",
  "developer",
  "engineer",
  "build",
  "built",
  "using",
  "use",
  "used",
]);

function extractSkills(input: string): string[] {
  const text = (input || "").toLowerCase();
  // Prefer comma-separated if given
  const commaParts = text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (commaParts.length > 1) {
    return Array.from(new Set(commaParts));
  }

  // Otherwise parse free text
  const tokens = text
    .split(/[^a-z0-9+#.]/i)
    .map((t) => t.trim())
    .filter(Boolean);
  const filtered = tokens.filter((t) => t.length > 2 && !STOPWORDS.has(t));
  return Array.from(new Set(filtered));
}

export default function Home() {
  const router = useRouter();
  const [openCandidate, setOpenCandidate] = useState(false);
  const [openRecruiter, setOpenRecruiter] = useState(false);
  const [candidateSkills, setCandidateSkills] = useState("");
  const [recruiterReqs, setRecruiterReqs] = useState("");

  const submitCandidate = async () => {
    const skills = extractSkills(candidateSkills);
    if (!skills.length) return;
    try {
      const res = await fetch("/api/jobs/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills }),
      });
      const data = await res.json();
      localStorage.setItem("jobsSuggestions", JSON.stringify(data.jobs || []));
      setOpenCandidate(false);
      router.push("/dashboard");
    } catch (e) {
      // noop
    }
  };

  const submitRecruiter = async () => {
    const requirements = recruiterReqs
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    if (!requirements.length) return;
    try {
      const res = await fetch("/api/talents/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requirements }),
      });
      const data = await res.json();
      localStorage.setItem("talentSuggestions", JSON.stringify(data.talents || []));
      setOpenRecruiter(false);
      router.push("/recruiter");
    } catch (e) {
      // noop
    }
  };
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="#" className="text-xl font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent">GetJobs</span> <span>AI</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-700 dark:text-zinc-300 md:flex">
            <a href="#features" className="hover:text-zinc-900 dark:hover:text-white">Features</a>
            <a href="#pricing" className="hover:text-zinc-900 dark:hover:text-white">Pricing</a>
            <Link href="/login" className="rounded-full border border-zinc-300 px-4 py-2 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900">Login</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 via-white to-white dark:from-indigo-950/40 dark:via-black dark:to-black" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Let skills speak louder than resumes
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
              Match talent and roles using verified skills, not keywords. AI-powered matching, bias-free screening, and trustworthy profiles.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="primary" onClick={() => setOpenCandidate(true)}>
                Find Your Dream Job
              </Button>
              <Button variant="secondary" onClick={() => setOpenRecruiter(true)}>
                Hire Talent
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-3xl bg-gradient-to-tr from-indigo-500/10 via-fuchsia-500/10 to-orange-400/10 blur-2xl" />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-200 shadow-sm dark:border-zinc-800">
              <Image
                src="/home.png"
                alt="GetJobs AI illustration"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Built for fair, accurate hiring</h2>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">Four pillars that power GetJobs AI</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<Brain className="h-6 w-6 text-indigo-600" />}
            title="AI Matching"
            description="Understand skills and experience context to surface the best-fit roles and candidates."
          />
          <FeatureCard
            icon={<BadgeCheck className="h-6 w-6 text-indigo-600" />}
            title="Skill Verification"
            description="Validated assessments and portfolios ensure real proficiency beyond buzzwords."
          />
          <FeatureCard
            icon={<Scale className="h-6 w-6 text-indigo-600" />}
            title="Bias-Free Hiring"
            description="Reduce noise with anonymized screening and structured, consistent evaluations."
          />
          <FeatureCard
            icon={<ShieldCheck className="h-6 w-6 text-indigo-600" />}
            title="Trust Scores"
            description="Transparent credibility metrics built from signals, endorsements, and outcomes."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 py-10 dark:border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-sm text-zinc-600 dark:text-zinc-400 md:flex-row">
          <div className="font-semibold text-zinc-900 dark:text-zinc-100">
            GetJobs AI
          </div>
          <nav className="flex items-center gap-6">
            <a href="#features" className="hover:text-zinc-900 dark:hover:text-white">Features</a>
            <a href="#pricing" className="hover:text-zinc-900 dark:hover:text-white">Pricing</a>
            <a href="#privacy" className="hover:text-zinc-900 dark:hover:text-white">Privacy</a>
            <a href="#terms" className="hover:text-zinc-900 dark:hover:text-white">Terms</a>
          </nav>
        </div>
      </footer>
      {/* Forms */}
      <CandidateModal
        open={openCandidate}
        onClose={() => setOpenCandidate(false)}
        value={candidateSkills}
        setValue={setCandidateSkills}
        onSubmit={submitCandidate}
      />
      <RecruiterModal
        open={openRecruiter}
        onClose={() => setOpenRecruiter(false)}
        value={recruiterReqs}
        setValue={setRecruiterReqs}
        onSubmit={submitRecruiter}
      />
    </div>
  );
}

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow md:p-7 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/40">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}

// Modals
function CandidateModal({ open, onClose, value, setValue, onSubmit }: { open: boolean; onClose: () => void; value: string; setValue: (v: string) => void; onSubmit: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Describe your skills" size="lg" footer={
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={onSubmit}>Get Suggestions</Button>
      </div>
    }>
      <div className="space-y-2">
        <label className="text-sm font-medium">Skill description (free text or comma-separated)</label>
        <Input placeholder="e.g. I build React apps with TypeScript and Tailwind" value={value} onChange={(e) => setValue(e.target.value)} />
        <p className="text-xs text-zinc-600 dark:text-zinc-400">We’ll extract skills and match jobs for you.</p>
      </div>
    </Modal>
  );
}

function RecruiterModal({ open, onClose, value, setValue, onSubmit }: { open: boolean; onClose: () => void; value: string; setValue: (v: string) => void; onSubmit: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Describe the role requirements" size="lg" footer={
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={onSubmit}>Find Talents</Button>
      </div>
    }>
      <div className="space-y-2">
        <label className="text-sm font-medium">Requirements (comma-separated)</label>
        <Input placeholder="e.g. node, express, postgresql" value={value} onChange={(e) => setValue(e.target.value)} />
        <p className="text-xs text-zinc-600 dark:text-zinc-400">We’ll generate matching candidates for your role.</p>
      </div>
    </Modal>
  );
}
