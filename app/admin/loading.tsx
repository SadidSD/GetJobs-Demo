export default function LoadingAdmin() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="animate-pulse grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="h-40 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-40 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-40 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-40 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}