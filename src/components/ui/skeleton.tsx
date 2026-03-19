"use client"

import React, { forwardRef } from "react"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "card" | "image"
  lines?: number
  className?: string
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = "text", lines = 1, className = "", ...props }, ref) => {
    if (variant === "text") {
      return (
        <div ref={ref} className={`space-y-2 ${className}`} {...props}>
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse"
            />
          ))}
        </div>
      )
    }

    if (variant === "image") {
      return (
        <div
          ref={ref}
          className={`w-full aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse ${className}`}
          {...props}
        />
      )
    }

    return (
      <div
        ref={ref}
        className={`w-full rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden ${className}`}
        {...props}
      >
        <div className="h-40 bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-3/4 animate-pulse" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-full animate-pulse" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-1/2 animate-pulse" />
        </div>
      </div>
    )
  }
)

Skeleton.displayName = "Skeleton"

export { Skeleton }
