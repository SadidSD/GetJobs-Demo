"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import AuthCard from "../AuthCard";

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
  role: "Candidate" | "Recruiter" | "";
};

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    mode: "onBlur",
    defaultValues: { role: "" },
  });

  const onSubmit = async (_data: SignupFormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    // Replace with actual signup call
    alert("Account created (demo)");
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-16">
        <div className="w-full">
          <div className="mb-8 text-center">
            <Link href="/" className="text-2xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent">GetJobs</span> <span>AI</span>
            </Link>
          </div>

          <AuthCard title="Create your account" subtitle="Join GetJobs AI in minutes">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition placeholder:text-zinc-400 dark:bg-zinc-900 ${
                    errors.name ? "border-red-500 dark:border-red-500" : "border-zinc-300 focus:border-indigo-500 dark:border-zinc-700"
                  }`}
                  {...register("name", { required: "Name is required", minLength: { value: 2, message: "Enter your full name" } })}
                />
                {errors.name ? (
                  <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition placeholder:text-zinc-400 dark:bg-zinc-900 ${
                    errors.email ? "border-red-500 dark:border-red-500" : "border-zinc-300 focus:border-indigo-500 dark:border-zinc-700"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                {errors.email ? (
                  <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition placeholder:text-zinc-400 dark:bg-zinc-900 ${
                    errors.password ? "border-red-500 dark:border-red-500" : "border-zinc-300 focus:border-indigo-500 dark:border-zinc-700"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                  })}
                />
                {errors.password ? (
                  <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Role</label>
                <select
                  className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition dark:bg-zinc-900 ${
                    errors.role ? "border-red-500 dark:border-red-500" : "border-zinc-300 focus:border-indigo-500 dark:border-zinc-700"
                  }`}
                  {...register("role", { required: "Please select a role" })}
                >
                  <option value="">Select role</option>
                  <option value="Candidate">Candidate</option>
                  <option value="Recruiter">Recruiter</option>
                </select>
                {errors.role ? (
                  <p className="mt-1 text-xs text-red-600">{errors.role.message}</p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>

              <p className="pt-2 text-center text-xs text-zinc-600 dark:text-zinc-400">
                Already have an account? <Link href="/login" className="text-indigo-600 hover:underline">Sign in</Link>
              </p>
            </form>
          </AuthCard>
        </div>
      </div>
    </div>
  );
}


