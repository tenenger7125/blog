const PostLoading = () => (
  <div className="relative mx-auto flex w-full max-w-5xl flex-col justify-center gap-5">
    <div className="w-full min-w-0">
      {/* breadcrumb + edit button skeleton */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="h-8 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* title skeleton */}
      <div className="mb-8 flex justify-center">
        <div className="h-8 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* content skeleton */}
      <div className="min-h-screen space-y-3">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
            style={{ width: `${70 + ((i * 13) % 30)}%` }}
          />
        ))}
      </div>
    </div>
  </div>
);

export default PostLoading;
