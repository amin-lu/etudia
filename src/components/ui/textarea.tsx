"use client"

import React, { forwardRef, useState } from "react"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  showCharCount?: boolean
  maxCharacters?: number
  className?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      showCharCount = false,
      maxCharacters,
      className = "",
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = useState(
      typeof value === "string" ? value.length : 0
    )

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length)
      onChange?.(e)
    }

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-zinc-950 dark:text-zinc-50 mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          value={value}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-xl border transition-colors duration-200
            bg-white dark:bg-zinc-900
            border-zinc-300 dark:border-zinc-700
            text-zinc-950 dark:text-zinc-50
            placeholder-zinc-400 dark:placeholder-zinc-500
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            disabled:opacity-50
            resize-vertical
            ${error ? "border-red-500 dark:border-red-500" : ""}
            ${className}`}
          {...props}
        />
        <div className="mt-1 flex items-center justify-between gap-2">
          <div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            {helperText && !error && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {helperText}
              </p>
            )}
          </div>
          {showCharCount && maxCharacters && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {charCount} / {maxCharacters}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }
