"use client"

import React, { useState, forwardRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Array<{
    id: string | number
    title: React.ReactNode
    content: React.ReactNode
  }>
  allowMultiple?: boolean
  className?: string
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ items, allowMultiple = false, className = "", ...props }, ref) => {
    const [openIds, setOpenIds] = useState<(string | number)[]>([])

    const toggleItem = (id: string | number) => {
      if (allowMultiple) {
        setOpenIds((prev) =>
          prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
      } else {
        setOpenIds((prev) => (prev.includes(id) ? [] : [id]))
      }
    }

    return (
      <div ref={ref} className={`space-y-2 ${className}`} {...props}>
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-4 py-3 text-left font-medium text-zinc-900 dark:text-white
                hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors duration-200
                flex items-center justify-between"
            >
              <span>{item.title}</span>
              <motion.svg
                className="w-5 h-5 text-zinc-600 dark:text-zinc-400"
                animate={{
                  rotate: openIds.includes(item.id) ? 180 : 0,
                }}
                transition={{ duration: 0.2 }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </motion.svg>
            </button>
            <AnimatePresence>
              {openIds.includes(item.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-zinc-200 dark:border-zinc-800"
                >
                  <div className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    )
  }
)

Accordion.displayName = "Accordion"

export { Accordion }
