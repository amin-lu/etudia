"use client"

import React, { forwardRef } from "react"
import { motion } from "framer-motion"

interface CardProps {
  variant?: "default" | "interactive"
  className?: string
  children?: React.ReactNode
  onClick?: () => void
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", className = "", children, onClick }, ref) => {
    const baseStyles =
      "rounded-2xl border bg-white dark:bg-white/[0.03] border-slate-200 dark:border-white/10 p-6"
    const variantStyles = {
      default: "",
      interactive: "cursor-pointer card-glow",
    }

    if (variant === "interactive") {
      return (
        <motion.div
          ref={ref}
          className={`${baseStyles} ${variantStyles[variant]} ${className}`}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          onClick={onClick}
        >
          {children}
        </motion.div>
      )
    }

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${className}`}
        onClick={onClick}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = "Card"

interface CardSectionProps {
  className?: string
  children?: React.ReactNode
}

const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className = "", children }, ref) => (
    <div ref={ref} className={`px-6 py-4 border-b border-card-border ${className}`}>
      {children}
    </div>
  )
)

CardHeader.displayName = "CardHeader"

const CardContent = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className = "", children }, ref) => (
    <div ref={ref} className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  )
)

CardContent.displayName = "CardContent"

const CardFooter = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className = "", children }, ref) => (
    <div ref={ref} className={`px-6 py-4 border-t border-card-border ${className}`}>
      {children}
    </div>
  )
)

CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardContent, CardFooter }
