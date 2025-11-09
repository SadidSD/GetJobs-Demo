"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Briefcase, Users, PlusCircle, FileText, CheckCircle2 } from "lucide-react";
import Card, { CardHeader, CardTitle, CardBody } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { useToast } from "@/components/ui/ToastProvider";
type Talent = { id: string; name: string; skills: string[]; match?: number };

export default function RecruiterDashboard() {
  const { addToast } = useToast();
  const [talents, setTalents] = useState<Talent[]>([]);

  const handleCreateJob = () => {
    addToast({ title: "Job draft created", description: "Start filling out job details.", variant: "success" });
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem("talentSuggestions");
      if (raw) {
        const arr = JSON.parse(raw) as Talent[];
        setTalents(Array.isArray(arr) ? arr : []);
      }
    } catch {}
  }, []);

  return (
    <main className="page-transition min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent">GetJobs</span> <span>AI</span>
          </Link>
          <Button variant="primary" size="sm" onClick={handleCreateJob}>
            <PlusCircle className="mr-2 h-4 w-4" /> New Job
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Overview Stats */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm"><Briefcase className="h-4 w-4" /> Active Jobs</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="text-3xl font-bold">12</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">3 new this week</div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm"><Users className="h-4 w-4" /> Candidates</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="text-3xl font-bold">248</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">57 in pipeline</div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4" /> Hires</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="text-3xl font-bold">24</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">YTD</div>
                </CardBody>
              </Card>
            </div>

            {/* Pipelines */}
            <Card>
              <CardHeader>
                <CardTitle>Candidate Pipelines</CardTitle>
              </CardHeader>
              <CardBody>
                <Tabs defaultValue="frontend">
                  <TabsList>
                    <TabsTrigger value="frontend">Frontend Dev</TabsTrigger>
                    <TabsTrigger value="backend">Backend Dev</TabsTrigger>
                    <TabsTrigger value="design">Product Design</TabsTrigger>
                  </TabsList>
                  <TabsContent value="frontend">
                    {(() => {
                      const stages = ["Applied", "Screening", "Interview"] as const;
                      const [counts, setCounts] = useState<number[]>(stages.map(() => 0));

                      useEffect(() => {
                        // Compute client-only random counts to avoid SSR/client mismatch
                        setCounts(stages.map(() => Math.floor(Math.random() * 20) + 5));
                      }, []);

                      return (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          {stages.map((stage, idx) => (
                            <div key={stage} className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                              <div className="mb-2 text-sm font-semibold">{stage}</div>
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">Candidates: {counts[idx]}</div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </TabsContent>
                  <TabsContent value="backend">
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">No candidates yet</div>
                  </TabsContent>
                  <TabsContent value="design">
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">Pipeline initializing…</div>
                  </TabsContent>
                </Tabs>
              </CardBody>
            </Card>

            {/* AI Suggested Candidates */}
            {talents.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>AI Suggested Candidates</CardTitle>
                </CardHeader>
                <CardBody>
                  <ul className="space-y-3">
                    {talents.map((t) => (
                      <li key={t.id} className="flex items-start justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                        <div>
                          <div className="text-sm font-semibold">{t.name}</div>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {t.skills.map((s, idx) => (
                              <span key={idx} className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          {Math.round(t.match || 0)}% match
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            )}
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm"><FileText className="h-4 w-4" /> Recent Activity</CardTitle>
              </CardHeader>
              <CardBody>
                <ul className="space-y-3 text-sm">
                  {[
                    "Candidate Jane Doe advanced to screening",
                    "New job 'Senior Frontend' published",
                    "Interview scheduled with John Smith",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center justify-between">
                      <span className="text-zinc-700 dark:text-zinc-300">{item}</span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">{idx + 1}h ago</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}