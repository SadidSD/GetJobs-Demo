"use client";

import Link from "next/link";
import { Home, Briefcase, User, Settings, Bell, Search } from "lucide-react";
import JobCard from "@/components/JobCard";
import ProfileCard from "@/components/ProfileCard";
import SkillGapCard from "@/components/SkillGapCard";

// Mock data
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    matchPercentage: 92,
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    salary: "$120k - $150k",
    location: "San Francisco, CA (Remote)",
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    matchPercentage: 87,
    skills: ["React", "Node.js", "PostgreSQL", "AWS"],
    salary: "$100k - $130k",
    location: "New York, NY (Hybrid)",
  },
  {
    id: 3,
    title: "React Developer",
    company: "Digital Agency",
    matchPercentage: 85,
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    salary: "$90k - $115k",
    location: "Austin, TX (Remote)",
  },
  {
    id: 4,
    title: "Software Engineer II",
    company: "Enterprise Solutions",
    matchPercentage: 78,
    skills: ["React", "Node.js", "TypeScript", "Docker"],
    salary: "$110k - $140k",
    location: "Seattle, WA",
  },
];

const mockProfile = {
  name: "Alex Johnson",
  avatar: "",
  matchScore: 85,
  skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "PostgreSQL"],
};

const mockSkillGaps = [
  { skill: "React", status: "good" as const },
  { skill: "TypeScript", status: "good" as const },
  { skill: "Docker", status: "needs-improvement" as const },
  { skill: "Kubernetes", status: "missing" as const },
  { skill: "GraphQL", status: "good" as const },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100 pb-20 lg:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/60">
        <div className="mx-auto flex max-w-[1920px] items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent">GetJobs</span> <span>AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <button className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900">
              <Search className="h-5 w-5" />
            </button>
            <button className="relative rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-500">
              <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-white">
                {mockProfile.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1920px] gap-4 p-4 sm:gap-6 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Left Sidebar */}
          <aside className="w-full shrink-0 lg:w-80">
            <div className="sticky top-24 space-y-4 sm:space-y-6">
              <ProfileCard
                name={mockProfile.name}
                avatar={mockProfile.avatar}
                matchScore={mockProfile.matchScore}
                skills={mockProfile.skills}
              />

              {/* Navigation Menu - Hidden on mobile (using bottom nav instead) */}
              <nav className="hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:block">
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <Home className="h-5 w-5" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/jobs"
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    >
                      <Briefcase className="h-5 w-5" />
                      My Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    >
                      <User className="h-5 w-5" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    >
                      <Settings className="h-5 w-5" />
                      Settings
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">Job Recommendations</h1>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Personalized matches based on your skills</p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {mockJobs.map((job) => (
                <JobCard
                  key={job.id}
                  title={job.title}
                  company={job.company}
                  matchPercentage={job.matchPercentage}
                  skills={job.skills}
                  salary={job.salary}
                  location={job.location}
                  onApply={() => alert(`Applying to ${job.title} at ${job.company}`)}
                />
              ))}
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="w-full shrink-0 lg:w-80 xl:block">
            <div className="sticky top-24">
              <SkillGapCard gaps={mockSkillGaps} careerHealthScore={82} />
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/60 lg:hidden">
        <div className="flex items-center justify-around px-2 py-2 sm:px-4 sm:py-3">
          <Link
            href="/dashboard"
            className="flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-zinc-900 transition active:scale-95 dark:text-zinc-100 touch-manipulation min-h-[56px] min-w-[56px] justify-center sm:px-4"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link
            href="/dashboard/jobs"
            className="flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-zinc-600 transition active:scale-95 dark:text-zinc-400 touch-manipulation min-h-[56px] min-w-[56px] justify-center sm:px-4"
          >
            <Briefcase className="h-5 w-5" />
            <span>Jobs</span>
          </Link>
          <Link
            href="/dashboard/profile"
            className="flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-zinc-600 transition active:scale-95 dark:text-zinc-400 touch-manipulation min-h-[56px] min-w-[56px] justify-center sm:px-4"
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-zinc-600 transition active:scale-95 dark:text-zinc-400 touch-manipulation min-h-[56px] min-w-[56px] justify-center sm:px-4"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

