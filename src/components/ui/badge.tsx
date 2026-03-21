"use client"

import React, { forwardRef } from "react"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "info" | "danger" | "niche" | "secondary" | "emerald"
  className?: string
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", className = "", ...props }, ref) => {
    const baseStyles = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide"

    const variantStyles = {
      default: "bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white/70",
      success: "bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400",
      warning: "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400",
      info: "bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-400",
      danger: "bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400",
      niche: "bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-400",
      secondary: "bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white/70",
      emerald: "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    }

    return (
      <span
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      />
    )
  }
)

Badge.displayName = "Badge"

export { Badge }
