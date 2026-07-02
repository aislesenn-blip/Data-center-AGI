"use client"

import { motion } from "framer-motion"
import { mockMerchants } from "@/lib/mockData"
import { useState, useEffect } from "react"
import Image from "next/image"

export function AttractLoop() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockMerchants.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const currentDeal = mockMerchants[currentIndex]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 w-full h-full bg-slate-50 flex flex-col justify-end overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full">
         <Image
            src={currentDeal.image}
            alt={currentDeal.name}
            fill
            className="object-cover transition-transform duration-[6000ms] ease-out scale-110 object-center"
            priority
         />
      </div>
      {/* Light gradient overlay for text readability without being dark */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent" />

      <div className="relative z-10 p-12 pb-24 w-full text-center">
        <motion.div
          key={currentDeal.id}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="inline-block px-8 py-3 rounded-full bg-blue-600 shadow-xl shadow-blue-500/20 text-white font-bold text-2xl uppercase tracking-widest backdrop-blur-md">
            Tap anywhere to discover
          </div>
          <h1 className="text-7xl font-extrabold text-slate-900 mt-6 tracking-tight drop-shadow-sm">
            {currentDeal.discount} at {currentDeal.name}
          </h1>
          <p className="text-4xl text-slate-600 mt-2 font-semibold">
            Only {currentDeal.distance}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
