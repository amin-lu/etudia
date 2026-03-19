"use client"

import React, { forwardRef } from "react"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "info" | "danger" | "niche" | "secondary"
  className?: string
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", className = "", ...props }, ref) => {
    const baseStyles = "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium"

    const variantStyles = {
      default: "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
      success: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
      warning: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
      info: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400",
      danger: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
      niche: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
      secondary: "bg-zinc-700 dark:bg-zinc-700 text-zinc-100 dark:text-zinc-100",
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
