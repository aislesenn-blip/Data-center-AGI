"use client"

import { motion } from "framer-motion"
import { destinations } from "@/lib/mockData"

interface Props {
  onSelect: (dest: string) => void
}

export function DestinationSelect({ onSelect }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 w-full h-full bg-[#0a0a0a] flex flex-col p-12"
    >
      <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full">
        <h1 className="text-6xl font-bold text-white mb-4">
          Where are you heading today?
        </h1>
        <p className="text-2xl text-gray-400 mb-12">
          Select your destination to see what&apos;s nearby.
        </p>

        <div className="grid grid-cols-4 gap-6">
          {destinations.map((dest, i) => (
            <motion.button
              key={dest}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, type: "spring" }}
              whileTap={{ scale: 0.95, backgroundColor: "#262626" }}
              onClick={() => onSelect(dest)}
              className="bg-[#171717] border border-gray-800 rounded-3xl p-8 text-center flex items-center justify-center min-h-[160px]"
            >
              <span className="text-3xl font-semibold text-white">{dest}</span>
            </motion.button>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => onSelect("Anywhere")}
            className="text-gray-500 text-2xl font-medium px-8 py-4 rounded-full active:bg-gray-900 transition-colors"
          >
            Skip, I&apos;m just browsing &rarr;
          </button>
        </div>
      </div>
    </motion.div>
  )
}
