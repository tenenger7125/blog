const PostCardSkeleton = () => (
  <div className="w-full animate-pulse rounded-xl border bg-white dark:bg-gray-900">
    <div className="p-6">
      <div className="mb-3 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
    </div>
    <div className="px-6 pb-4">
      <div className="mb-2 h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
    </div>
    <div className="px-6 pb-6">
      <div className="h-4 w-28 rounded bg-gray-200 dark:bg-gray-700" />
    </div>
  </div>
);

const PostsLoading = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col justify-between">
    <div className="flex flex-wrap gap-2 leading-loose">
      {Array.from({ length: 10 }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
    <div className="py-7">
      <div className="flex justify-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-9 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        ))}
      </div>
    </div>
  </div>
);

export default PostsLoading;
