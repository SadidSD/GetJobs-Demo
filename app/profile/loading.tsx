export default function LoadingProfile() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/3 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-12 w-full rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-12 w-full rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-12 w-full rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}