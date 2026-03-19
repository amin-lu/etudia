export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero skeleton */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <div className="h-16 md:h-20 lg:h-24 bg-foreground/10 rounded mb-6 animate-pulse" />
          <div className="h-6 bg-foreground/10 rounded mb-12 max-w-2xl mx-auto animate-pulse" />
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <div className="h-12 w-48 bg-foreground/10 rounded animate-pulse" />
            <div className="h-12 w-48 bg-foreground/10 rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* Metrics skeleton */}
      <section className="py-16 sm:py-20 bg-card border-t border-b border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-16 bg-foreground/10 rounded mb-3 animate-pulse" />
                <div className="h-6 bg-foreground/10 rounded w-24 mx-auto animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works skeleton */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 bg-foreground/10 rounded max-w-md mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-foreground/10 rounded-full animate-pulse" />
                </div>
                <div className="h-6 bg-foreground/10 rounded mb-3 w-32 mx-auto animate-pulse" />
                <div className="h-4 bg-foreground/10 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured SaaS skeleton */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 bg-foreground/10 rounded max-w-md mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-card-border p-6">
                <div className="h-6 bg-foreground/10 rounded mb-4 w-32 animate-pulse" />
                <div className="h-4 bg-foreground/10 rounded mb-6 animate-pulse" />
                <div className="h-4 bg-foreground/10 rounded mb-4 animate-pulse" />
                <div className="border-t border-card-border pt-4">
                  <div className="h-4 bg-foreground/10 rounded w-20 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideas teaser skeleton */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-foreground/10 rounded-full animate-pulse" />
          </div>
          <div className="h-12 bg-foreground/10 rounded max-w-sm mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-foreground/10 rounded max-w-md mx-auto mb-8 animate-pulse" />
          <div className="h-12 w-48 bg-foreground/10 rounded mx-auto animate-pulse" />
        </div>
      </section>

      {/* Testimonials skeleton */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 bg-foreground/10 rounded max-w-md mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-card-border p-6">
                <div className="h-24 bg-foreground/10 rounded mb-4 animate-pulse" />
                <div className="h-4 bg-foreground/10 rounded mb-3 animate-pulse" />
                <div className="h-4 bg-foreground/10 rounded mb-6 w-3/4 animate-pulse" />
                <div className="border-t border-card-border pt-4">
                  <div className="h-4 bg-foreground/10 rounded mb-2 w-1/2 animate-pulse" />
                  <div className="h-3 bg-foreground/10 rounded w-1/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
