"use client"

import React, { useEffect, useRef, useState, forwardRef } from "react"
import { motion } from "framer-motion"

interface AnimatedCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  duration?: number
  decimals?: number
  suffix?: string
  prefix?: string
  className?: string
}

const AnimatedCounter = forwardRef<HTMLDivElement, AnimatedCounterProps>(
  (
    {
      value,
      duration = 2,
      decimals = 0,
      suffix = "",
      prefix = "",
      className = "",
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState(0)
    const elementRef = useRef<HTMLDivElement>(null)
    const hasAnimatedRef = useRef(false)

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true

            const startTime = Date.now()
            const interval = setInterval(() => {
              const elapsed = Date.now() - startTime
              const progress = Math.min(elapsed / (duration * 1000), 1)
              const easeOut = 1 - Math.pow(1 - progress, 3)
              const currentValue = easeOut * value

              setDisplayValue(currentValue)

              if (progress === 1) {
                clearInterval(interval)
              }
            }, 16)

            return () => clearInterval(interval)
          }
        },
        { threshold: 0.1 }
      )

      if (elementRef.current) {
        observer.observe(elementRef.current)
      }

      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current)
        }
      }
    }, [value, duration])

    const formattedValue = displayValue.toFixed(decimals)

    return (
      <div
        ref={ref || elementRef}
        className={className}
        {...props}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {prefix}
          {formattedValue}
          {suffix}
        </motion.span>
      </div>
    )
  }
)

AnimatedCounter.displayName = "AnimatedCounter"

export { AnimatedCounter }
