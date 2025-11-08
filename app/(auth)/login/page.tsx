"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { Linkedin } from "lucide-react";
import AuthCard from "../AuthCard";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    mode: "onBlur",
  });

  const onSubmit = async (_data: LoginFormValues) => {
    await new Promise((r) => setTimeout(r, 600));
    // Replace with actual auth call
    alert("Logged in (demo)");
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

          <AuthCard title="Welcome back" subtitle="Sign in to your account">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>

              <div className="relative py-2 text-center text-xs text-zinc-500">
                <span className="bg-white px-2 dark:bg-zinc-900">or continue with</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900">
                  <span className="h-3 w-3 rounded-full bg-[#EA4335]" />
                  Google
                </button>
                <button type="button" className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </button>
              </div>

              <p className="pt-2 text-center text-xs text-zinc-600 dark:text-zinc-400">
                Don&apos;t have an account? <Link href="/signup" className="text-indigo-600 hover:underline">Sign up</Link>
              </p>
            </form>
          </AuthCard>
        </div>
      </div>
    </div>
  );
}


