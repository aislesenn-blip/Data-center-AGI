"use client"

import { cn } from "@/lib/utils"
import { MapPin } from "lucide-react"
import { motion } from "framer-motion"

interface MapPlaceholderProps {
  className?: string
  children?: React.ReactNode
  destination?: string
  isFocused?: boolean
}

export function MapPlaceholder({ className, children, destination, isFocused = false }: MapPlaceholderProps) {
  return (
    <div className={cn("absolute inset-0 bg-[#E8EAED] overflow-hidden z-0", className)}>
      {/* Abstract Map Roads / Infrastructure */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none origin-center"
        animate={{
          scale: isFocused ? 1.5 : 1,
          x: isFocused ? "-10%" : "0%",
          y: isFocused ? "10%" : "0%"
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#000" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Main Artery */}
          <path d="M -50 200 C 150 150, 200 400, 500 350" fill="none" stroke="#FFF" strokeWidth="12" />
          <path d="M -50 200 C 150 150, 200 400, 500 350" fill="none" stroke="#FCE79A" strokeWidth="8" />
          {/* Secondary Road */}
          <path d="M 150 -50 L 250 800" fill="none" stroke="#FFF" strokeWidth="8" />
        </svg>
      </motion.div>

      {/* Target Destination Marker (If provided) */}
      {destination && (
        <motion.div
          className="absolute top-1/3 right-1/4 flex flex-col items-center"
          animate={{
            y: [0, -10, 0],
            scale: isFocused ? 1.2 : 1
          }}
          transition={{
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          <div className="bg-rich-black text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg mb-1 whitespace-nowrap">
            {destination}
          </div>
          <div className="h-6 w-6 rounded-full bg-rich-black flex items-center justify-center shadow-lg relative">
            <MapPin className="h-3 w-3 text-white" />
            <div className="absolute -bottom-1 h-2 w-2 bg-rich-black/30 rounded-full blur-sm" />
          </div>
        </motion.div>
      )}

      {children}
    </div>
  )
}
