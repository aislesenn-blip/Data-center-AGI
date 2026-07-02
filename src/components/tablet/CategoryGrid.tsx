"use client"

import { motion } from "framer-motion"
import { categories } from "@/lib/mockData"
import { ShoppingBag, Utensils, Smartphone, Pill, ShoppingCart, Sparkles, MapPin, LucideIcon, ArrowLeft } from "lucide-react"

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
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="absolute inset-0 w-full h-full bg-slate-50 flex flex-col p-12"
    >
      <div className="flex items-center gap-6 mb-12">
        <button onClick={onBack} className="p-5 bg-white border-2 border-slate-200 shadow-sm rounded-full active:scale-95 transition-transform">
          <ArrowLeft className="w-8 h-8 text-slate-700" />
        </button>
        <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-full border-2 border-slate-200 shadow-sm">
          <MapPin className="w-8 h-8 text-blue-600" />
          <span className="text-2xl font-bold text-slate-800">{destination}</span>
        </div>
      </div>

      <div className="flex-1 max-w-6xl mx-auto w-full flex flex-col justify-center pb-24">
        <h2 className="text-6xl font-extrabold text-slate-900 mb-16 text-center tracking-tight">
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
                className={`relative overflow-hidden rounded-[2.5rem] p-8 min-h-[220px] flex flex-col items-start justify-end shadow-md group ${cat.color}`}
              >
                <div className="absolute inset-0 bg-black/5 group-active:bg-black/20 transition-colors" />
                <Icon className="w-24 h-24 text-white/40 absolute top-8 right-8" />
                <span className="relative z-10 text-4xl font-bold text-white leading-tight text-left drop-shadow-sm">
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
