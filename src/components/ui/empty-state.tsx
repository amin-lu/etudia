"use client"

import React, { forwardRef } from "react"
import { LucideIcon } from "lucide-react"
import { Button } from "./button"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon
  title: string
  description: string
  action?: { label: string; onClick: () => void }
  className?: string
}

const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon: Icon, title, description, action, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col items-center justify-center gap-6 py-20 ${className}`}
        {...props}
      >
        <div className="rounded-xl bg-zinc-100 dark:bg-zinc-900 p-4">
          <Icon className="h-12 w-12 text-zinc-500 dark:text-zinc-400" />
        </div>
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            {title}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {description}
          </p>
        </div>
        {action && (
          <Button variant="primary" size="sm" onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </div>
    )
  }
)

EmptyState.displayName = "EmptyState"

export { EmptyState }
export type { EmptyStateProps }
