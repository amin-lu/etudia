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
      "rounded-xl border bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 p-6"
    const variantStyles = {
      default: "",
      interactive: "cursor-pointer transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-700",
    }

    if (variant === "interactive") {
      return (
        <motion.div
          ref={ref}
          className={`${baseStyles} ${variantStyles[variant]} ${className}`}
          whileHover={{ y: -4, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
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
