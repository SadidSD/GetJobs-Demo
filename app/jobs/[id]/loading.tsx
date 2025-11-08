export default function LoadingJobDetails() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-2/3 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-6 w-1/2 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-24 w-full rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}