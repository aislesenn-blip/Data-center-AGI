"use client"

import { motion } from "framer-motion"
import { destinations } from "@/lib/mockData"
import { BrandHeader } from "./BrandHeader"

interface Props {
  onSelect: (dest: string) => void
}

export function DestinationSelect({ onSelect }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 w-full h-full bg-slate-50 flex flex-col p-12 overflow-y-auto touch-pan-y"
    >
      <BrandHeader />
      <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full pt-16">
        <h1 className="text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Where are you heading today?
        </h1>
        <p className="text-3xl text-slate-500 mb-16 font-medium">
          Select your destination to discover great places nearby.
        </p>

        <div className="grid grid-cols-4 gap-6">
          {destinations.map((dest, i) => (
            <motion.button
              key={dest}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, type: "spring", damping: 20 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(dest)}
              className="bg-white border-0 shadow-xl shadow-slate-200/50 rounded-[2rem] p-8 text-center flex items-center justify-center min-h-[160px] hover:shadow-2xl hover:shadow-blue-500/10 transition-all"
            >
              <span className="text-3xl font-bold text-slate-800">{dest}</span>
            </motion.button>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button
            onClick={() => onSelect("Anywhere")}
            className="text-slate-500 hover:text-slate-800 text-2xl font-bold px-10 py-5 rounded-full active:bg-slate-200 transition-colors"
          >
            Skip, I&apos;m just browsing &rarr;
          </button>
        </div>
      </div>
    </motion.div>
  )
}
