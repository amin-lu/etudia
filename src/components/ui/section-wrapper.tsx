"use client"

import React from "react"
import { motion, useInView } from "framer-motion"

interface SectionWrapperProps {
  children: React.ReactNode
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full"
  padding?: "sm" | "md" | "lg"
  animated?: boolean
  className?: string
}

function SectionWrapper({
  children,
  maxWidth = "lg",
  padding = "lg",
  animated = true,
  className = "",
}: SectionWrapperProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-full",
  }

  const paddingClasses = {
    sm: "px-4 py-8 sm:px-6",
    md: "px-4 py-12 sm:px-6",
    lg: "px-4 py-16 sm:px-6 md:px-8",
  }

  if (animated) {
    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        className={`mx-auto w-full ${paddingClasses[padding]} ${maxWidthClasses[maxWidth]} ${className}`}
      >
        {children}
      </motion.section>
    )
  }

  return (
    <section
      ref={ref}
      className={`mx-auto w-full ${paddingClasses[padding]} ${maxWidthClasses[maxWidth]} ${className}`}
    >
      {children}
    </section>
  )
}

export { SectionWrapper }
