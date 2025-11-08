"use client";

import Link from "next/link";
import Image from "next/image";
import { Brain, ShieldCheck, BadgeCheck, Scale } from "lucide-react";

export default function Home() {
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
              <a href="#candidate" className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500">
                Find Your Dream Job
              </a>
              <a href="#employer" className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900">
                Hire Talent
              </a>
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
