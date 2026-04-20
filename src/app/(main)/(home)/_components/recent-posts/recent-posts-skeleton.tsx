const RecentPostsSkeleton = ({ previewCount }: { previewCount: number }) => (
  <section className="mt-10">
    <div className="mb-4 flex items-center justify-between">
      <div className="h-6 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-5 w-14 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
    </div>
    <div className="flex flex-col gap-2">
      {Array.from({ length: previewCount }).map((_, i) => (
        <div key={i} className="rounded-xl border bg-white p-4 dark:bg-gray-900">
          <div className="mb-3 h-5 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-3 h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      ))}
    </div>
  </section>
);

export default RecentPostsSkeleton;
