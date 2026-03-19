export default function CatalogueLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-3/4 animate-pulse" />
          <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-1/2 animate-pulse" />
        </div>
      </section>

      {/* Content Section Skeleton */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Skeleton */}
            <aside className="lg:col-span-1">
              <div className="space-y-6">
                <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-20 animate-pulse" />
                <div className="space-y-3">
                  <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                  <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-full w-16 animate-pulse" />
                  <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-full w-20 animate-pulse" />
                </div>
              </div>
            </aside>

            {/* Grid Skeleton */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
                    <div className="flex justify-between">
                      <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2 animate-pulse" />
                      <div className="h-5 bg-zinc-300 dark:bg-zinc-700 rounded-full w-12 animate-pulse" />
                    </div>
                    <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded-full w-20 animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-3 bg-zinc-300 dark:bg-zinc-700 rounded animate-pulse" />
                      <div className="h-3 bg-zinc-300 dark:bg-zinc-700 rounded w-5/6 animate-pulse" />
                    </div>
                    <div className="space-y-2 pt-4">
                      <div className="h-3 bg-zinc-300 dark:bg-zinc-700 rounded animate-pulse" />
                      <div className="h-3 bg-zinc-300 dark:bg-zinc-700 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
