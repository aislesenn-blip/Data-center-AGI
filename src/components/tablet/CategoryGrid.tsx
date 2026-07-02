"use client"

import { motion } from "framer-motion"
import { categories } from "@/lib/mockData"
import { ShoppingBag, Utensils, Smartphone, Pill, ShoppingCart, Sparkles, MapPin, LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  ShoppingBag, Utensils, Smartphone, Pill, ShoppingCart, Sparkles
}

interface Props {
  destination: string
  onSelect: (category: string) => void
  onBack: () => void
}

export function CategoryGrid({ destination, onSelect, onBack }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="absolute inset-0 w-full h-full bg-[#0a0a0a] flex flex-col p-12"
    >
      <div className="flex items-center gap-4 mb-12">
        <button onClick={onBack} className="p-4 bg-[#171717] rounded-full active:scale-95 transition-transform">
          <span className="text-2xl text-white">←</span>
        </button>
        <div className="flex items-center gap-3 bg-[#171717] px-6 py-3 rounded-full border border-gray-800">
          <MapPin className="w-6 h-6 text-blue-400" />
          <span className="text-xl font-medium text-white">{destination}</span>
        </div>
      </div>

      <div className="flex-1 max-w-6xl mx-auto w-full flex flex-col justify-center pb-24">
        <h2 className="text-6xl font-bold text-white mb-12 text-center">
          What are you looking for?
        </h2>

        <div className="grid grid-cols-3 gap-8">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon]
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(cat.id)}
                className={`relative overflow-hidden rounded-[2.5rem] p-8 min-h-[220px] flex flex-col items-start justify-end group ${cat.color}`}
              >
                <div className="absolute inset-0 bg-black/20 group-active:bg-black/40 transition-colors" />
                <Icon className="w-24 h-24 text-white/30 absolute top-8 right-8" />
                <span className="relative z-10 text-4xl font-bold text-white leading-tight text-left">
                  {cat.title}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
