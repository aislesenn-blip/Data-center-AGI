"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PinInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  onComplete?: (value: string) => void
  className?: string
  autoFocus?: boolean
}

export function PinInput({
  length = 4,
  value,
  onChange,
  onComplete,
  className,
  autoFocus = false,
}: PinInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  // Handle auto-completion
  React.useEffect(() => {
    if (value.length === length && onComplete) {
      onComplete(value)
    }
  }, [value, length, onComplete])

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "").slice(0, length)
    onChange(newValue)
  }

  return (
    <div
      className={cn("relative flex items-center justify-center cursor-text", className)}
      onClick={handleContainerClick}
    >
      {/* Hidden input for capturing actual keystrokes cleanly */}
      <input
        ref={inputRef}
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="one-time-code"
        maxLength={length}
        value={value}
        onChange={handleChange}
        className="absolute inset-0 opacity-0 cursor-text z-10 w-full"
      />

      {/* Visual dots */}
      <div className="flex gap-4">
        {Array.from({ length }).map((_, i) => {
          const isActive = value.length === i
          const isFilled = value.length > i

          return (
            <div
              key={i}
              className={cn(
                "flex h-16 w-14 items-center justify-center rounded-xl border-2 text-2xl font-bold transition-all",
                isFilled ? "border-corporate-green bg-corporate-green text-white" :
                isActive ? "border-corporate-green shadow-[0_0_0_4px_rgba(10,77,60,0.1)] bg-white" :
                "border-border bg-soft-gray"
              )}
            >
              {isFilled ? "•" : ""}
            </div>
          )
        })}
      </div>
    </div>
  )
}
