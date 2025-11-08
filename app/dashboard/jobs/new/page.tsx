"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ArrowLeft, Plus, X } from "lucide-react";
import JobCard from "@/components/JobCard";

type JobType = "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";

type JobPostValues = {
  title: string;
  description: string;
  requirements: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  salaryMin: string;
  salaryMax: string;
  location: string;
  jobType: JobType;
};

export default function NewJobPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<JobPostValues>({
    mode: "onBlur",
    defaultValues: {
      requiredSkills: [],
      niceToHaveSkills: [],
      jobType: "Full-time",
    },
  });

  const requiredSkills = watch("requiredSkills");
  const niceToHaveSkills = watch("niceToHaveSkills");

  const [skillInput, setSkillInput] = useState("");
  const [skillCategory, setSkillCategory] = useState<"required" | "nice">("required");

  const addSkill = () => {
    const skill = skillInput.trim();
    if (!skill) return;
    if (skillCategory === "required") {
      if (!requiredSkills.includes(skill)) setValue("requiredSkills", [...requiredSkills, skill], { shouldDirty: true });
    } else {
      if (!niceToHaveSkills.includes(skill)) setValue("niceToHaveSkills", [...niceToHaveSkills, skill], { shouldDirty: true });
    }
    setSkillInput("");
  };

  const removeSkill = (category: "required" | "nice", idx: number) => {
    if (category === "required") {
      const next = [...requiredSkills];
      next.splice(idx, 1);
      setValue("requiredSkills", next, { shouldDirty: true });
    } else {
      const next = [...niceToHaveSkills];
      next.splice(idx, 1);
      setValue("niceToHaveSkills", next, { shouldDirty: true });
    }
  };

  const onSubmit = async (data: JobPostValues) => {
    // Basic cross-field validation
    const min = Number(data.salaryMin);
    const max = Number(data.salaryMax);
    if (!Number.isNaN(min) && !Number.isNaN(max) && min > max) {
      alert("Salary min should not be greater than max");
      return;
    }
    await new Promise((r) => setTimeout(r, 700));
    alert("Job posted (demo)");
  };

  // Preview data mapping
  const previewTitle = watch("title") || "Job Title";
  const previewCompany = "Your Company";
  const previewSalary = (() => {
    const min = watch("salaryMin");
    const max = watch("salaryMax");
    if (min && max) return `$${min} - $${max}`;
    if (min) return `$${min}`;
    if (max) return `$${max}`;
    return "$—";
  })();
  const previewLocation = watch("location") || "Remote";
  const previewSkills = [...requiredSkills, ...niceToHaveSkills].slice(0, 6);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-semibold">Create Job Posting</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div>
              <label className="mb-1 block text-sm font-medium">Job Title</label>
              <input
                type="text"
                placeholder="Senior Frontend Engineer"
                className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition placeholder:text-zinc-400 dark:bg-zinc-900 ${
                  errors.title ? "border-red-500" : "border-zinc-300 focus:border-indigo-500 dark:border-zinc-700"
                }`}
                {...register("title", { required: "Title is required", minLength: { value: 3, message: "At least 3 characters" } })}
              />
              {errors.title ? <p className="mt-1 text-xs text-red-600">{errors.title.message}</p> : null}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Description</label>
              <textarea
                rows={5}
                placeholder="Describe the role, team, and impact"
                className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition placeholder:text-zinc-400 dark:bg-zinc-900 ${
                  errors.description ? "border-red-500" : "border-zinc-300 focus:border-indigo-500 dark:border-zinc-700"
                }`}
                {...register("description", { required: "Description is required", minLength: { value: 20, message: "At least 20 characters" } })}
              />
              {errors.description ? <p className="mt-1 text-xs text-red-600">{errors.description.message}</p> : null}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Requirements</label>
              <textarea
                rows={4}
                placeholder="List key responsibilities and qualifications"
                className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition placeholder:text-zinc-400 dark:bg-zinc-900 ${
                  errors.requirements ? "border-red-500" : "border-zinc-300 focus:border-indigo-500 dark:border-zinc-700"
                }`}
                {...register("requirements", { required: "Requirements are required", minLength: { value: 10, message: "At least 10 characters" } })}
              />
              {errors.requirements ? <p className="mt-1 text-xs text-red-600">{errors.requirements.message}</p> : null}
            </div>

            {/* Skills Selector */}
            <div>
              <label className="mb-2 block text-sm font-medium">Skills</label>
              <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                    placeholder="Add a skill and press Enter"
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                  />
                  <div className="flex items-center gap-2">
                    <select
                      value={skillCategory}
                      onChange={(e) => setSkillCategory(e.target.value as any)}
                      className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                    >
                      <option value="required">Required</option>
                      <option value="nice">Nice-to-have</option>
                    </select>
                    <button
                      type="button"
                      onClick={addSkill}
                      className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
                    >
                      <Plus className="h-4 w-4" /> Add
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Required</p>
                    <div className="flex flex-wrap gap-2">
                      {requiredSkills.map((s, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
                          {s}
                          <button type="button" onClick={() => removeSkill("required", idx)} className="rounded-full p-0.5 hover:bg-indigo-100 dark:hover:bg-indigo-900/40">
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Nice-to-have</p>
                    <div className="flex flex-wrap gap-2">
                      {niceToHaveSkills.map((s, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                          {s}
                          <button type="button" onClick={() => removeSkill("nice", idx)} className="rounded-full p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-700">
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Salary, Location, Type */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Salary Min (USD)</label>
                <input
                  type="number"
                  min="0"
                  placeholder="90000"
                  className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition placeholder:text-zinc-400 dark:bg-zinc-900 ${
                    errors.salaryMin ? "border-red-500" : "border-zinc-300 focus:border-indigo-500 dark:border-zinc-700"
                  }`}
                  {...register("salaryMin", { required: "Enter min salary" })}
                />
                {errors.salaryMin ? <p className="mt-1 text-xs text-red-600">{errors.salaryMin.message}</p> : null}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Salary Max (USD)</label>
                <input
                  type="number"
                  min="0"
                  placeholder="140000"
                  className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition placeholder:text-zinc-400 dark:bg-zinc-900 ${
                    errors.salaryMax ? "border-red-500" : "border-zinc-300 focus:border-indigo-500 dark:border-zinc-700"
                  }`}
                  {...register("salaryMax", { required: "Enter max salary" })}
                />
                {errors.salaryMax ? <p className="mt-1 text-xs text-red-600">{errors.salaryMax.message}</p> : null}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Location</label>
                <input
                  type="text"
                  placeholder="Remote / City, State"
                  className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition placeholder:text-zinc-400 dark:bg-zinc-900 ${
                    errors.location ? "border-red-500" : "border-zinc-300 focus:border-indigo-500 dark:border-zinc-700"
                  }`}
                  {...register("location", { required: "Location is required" })}
                />
                {errors.location ? <p className="mt-1 text-xs text-red-600">{errors.location.message}</p> : null}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Job Type</label>
                <select
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                  {...register("jobType", { required: true })}
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                  <option>Freelance</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Link href="/dashboard" className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900">Cancel</Link>
              <button type="submit" disabled={isSubmitting} className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70">
                {isSubmitting ? "Posting..." : "Post Job"}
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <p className="mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">Live Preview</p>
            <JobCard
              title={previewTitle}
              company={previewCompany}
              matchPercentage={88}
              skills={previewSkills.length ? previewSkills : ["React", "Node.js", "TypeScript"]}
              salary={previewSalary}
              location={previewLocation}
              onApply={() => alert("Preview apply")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


