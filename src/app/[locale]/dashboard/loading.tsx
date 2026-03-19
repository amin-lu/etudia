"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-12 bg-zinc-300 dark:bg-zinc-800 rounded-lg w-2/3 animate-pulse" />
        </div>
      </section>

      {/* Metrics Cards Section */}
      <section className="py-20 md:py-28 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="rounded-xl bg-card border-card-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-zinc-300 dark:bg-zinc-800 rounded-lg w-10 h-10 animate-pulse" />
                  </div>
                  <div className="h-4 bg-zinc-300 dark:bg-zinc-800 rounded w-24 mb-3 animate-pulse" />
                  <div className="h-8 bg-zinc-300 dark:bg-zinc-800 rounded w-16 animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* MRR Chart Skeleton */}
            <Card className="rounded-xl bg-card border-card-border">
              <CardHeader className="border-b border-card-border">
                <div className="h-6 bg-zinc-300 dark:bg-zinc-800 rounded w-32 animate-pulse" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="w-full h-80 bg-zinc-300 dark:bg-zinc-800 rounded animate-pulse" />
              </CardContent>
            </Card>

            {/* Niche Chart Skeleton */}
            <Card className="rounded-xl bg-card border-card-border">
              <CardHeader className="border-b border-card-border">
                <div className="h-6 bg-zinc-300 dark:bg-zinc-800 rounded w-40 animate-pulse" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="w-full h-80 bg-zinc-300 dark:bg-zinc-800 rounded animate-pulse" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
