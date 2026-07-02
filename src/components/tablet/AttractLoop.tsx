"use client"

import { motion } from "framer-motion"
import { mockMerchants } from "@/lib/mockData"
import { useState, useEffect } from "react"

export function AttractLoop() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Rotate images every 5 seconds
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
      className="absolute inset-0 w-full h-full bg-black flex flex-col justify-end"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
        style={{ backgroundImage: `url(${currentDeal.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="relative z-10 p-12 pb-24 w-full text-center">
        <motion.div
          key={currentDeal.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 20 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-2xl uppercase tracking-widest">
            Tap anywhere to discover
          </div>
          <h1 className="text-7xl font-bold text-white drop-shadow-xl mt-4">
            {currentDeal.discount} at {currentDeal.name}
          </h1>
          <p className="text-3xl text-gray-300 mt-2 font-medium">
            Only {currentDeal.distance}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
