"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

import { HTMLMotionProps } from "framer-motion"

interface SpaceCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  name?: string
  handle?: string
  balance?: number
}

export function SpaceCard({ name = "John Doe", handle = "john", balance = 0, className, ...props }: SpaceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative w-full max-w-sm aspect-[1.586/1] rounded-[24px] bg-gradient-to-tr from-surface-900 to-surface-800 text-white p-7 shadow-[0_20px_40px_-15px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col justify-between border border-white/10",
        className
      )}
      {...props}
    >
      {/* Premium subtle glow effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      {/* NFC / Chip Icon representation (minimalist) */}
      <div className="absolute top-7 right-7 opacity-30 flex gap-1">
         <div className="w-1 h-5 rounded-full bg-white/80" />
         <div className="w-1 h-8 rounded-full bg-white" />
         <div className="w-1 h-5 rounded-full bg-white/80" />
      </div>

      <div className="z-10 mt-2">
        <p className="text-xs font-medium text-surface-400 tracking-wider uppercase">Available Balance</p>
        <p className="text-[40px] leading-tight font-medium tracking-tight mt-1 flex items-baseline gap-1.5">
          <span className="text-surface-400 text-xl font-medium tracking-normal">TZS</span>
          {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>

      <div className="z-10 flex justify-between items-end">
        <div>
          <p className="font-medium text-lg tracking-wide">{name}</p>
          <p className="text-sm text-surface-400 font-mono mt-0.5">${handle}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-90">SpaceCard</p>
        </div>
      </div>
    </motion.div>
  )
}