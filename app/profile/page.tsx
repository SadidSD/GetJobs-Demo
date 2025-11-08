"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { useToast } from "@/components/ui/ToastProvider";

export default function ProfileEditor() {
  const { addToast } = useToast();
  const [name, setName] = useState("Alex Johnson");
  const [title, setTitle] = useState("Senior Frontend Developer");
  const [location, setLocation] = useState("Remote");

  const handleSave = () => {
    addToast({ title: "Profile saved", description: "Your changes have been updated.", variant: "success" });
  };

  return (
    <main className="page-transition min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent">GetJobs</span> <span>AI</span>
          </Link>
          <Link href="/dashboard/profile" className="text-sm text-indigo-600 hover:underline">Advanced editor</Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Edit Profile</h1>

        <div className="space-y-4">
          <FormField label="Name" value={name} required onChange={(e) => setName(e.target.value)} />
          <FormField label="Title" value={title} required onChange={(e) => setTitle(e.target.value)} />
          <FormField label="Location" value={location} required onChange={(e) => setLocation(e.target.value)} />
        </div>

        <div className="mt-6 flex gap-3">
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    </main>
  );
}