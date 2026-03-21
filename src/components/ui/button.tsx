"use client"

import React, { forwardRef } from "react"
import { motion } from "framer-motion"

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "cta"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  icon?: React.ReactNode
  className?: string
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      children,
      className = "",
      disabled,
      type = "button",
      onClick,
    },
    ref
  ) => {
    const baseStyles =
      "font-medium rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"

    const variantStyles = {
      primary:
        "bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-500 dark:hover:bg-indigo-400 disabled:opacity-50",
      secondary:
        "bg-transparent border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-50",
      ghost:
        "text-slate-600 dark:text-white/60 hover:text-slate-950 dark:hover:text-white disabled:opacity-50",
      cta:
        "bg-amber-500 text-slate-950 font-semibold hover:bg-amber-400 shadow-lg shadow-amber-500/25 disabled:opacity-50",
    }

    const sizeStyles = {
      sm: "px-3.5 py-1.5 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-8 py-3.5 text-base",
    }

    return (
      <motion.button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        disabled={disabled || isLoading}
        type={type}
        onClick={onClick}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      >
        {isLoading ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : icon ? (
          icon
        ) : null}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = "Button"

export { Button }
export type { ButtonProps }
