"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MOCK_CATEGORIES, MOCK_DISCOVERY_MERCHANTS, Merchant } from "@/lib/mockData"
import { Star, MapPin } from "lucide-react"
import { MerchantProfile } from "./MerchantProfile"

export function DiscoverFlow() {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null)

  const displayedMerchants = activeCategory === "All"
    ? MOCK_DISCOVERY_MERCHANTS
    : MOCK_DISCOVERY_MERCHANTS.filter(m => m.category === activeCategory)

  if (selectedMerchant) {
    return <MerchantProfile merchant={selectedMerchant} onBack={() => setSelectedMerchant(null)} />
  }

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 relative">

      {/* Header */}
      <div className="px-6 pt-6 pb-4 shrink-0 bg-slate-50">
        <h1 className="text-3xl font-bold text-slate-900 mb-1">Discover</h1>
        <p className="text-slate-500 font-medium text-sm">Find participating merchants to save instantly.</p>
      </div>

      {/* Categories (Horizontal Scroll) */}
      <div className="px-6 pb-6 pt-2 overflow-x-auto hide-scrollbar shrink-0 flex gap-3 border-b border-slate-100">
        <button
          onClick={() => setActiveCategory("All")}
          className={`shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
            activeCategory === "All"
              ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
              : "bg-white text-slate-600 shadow-sm border border-slate-200"
          }`}
        >
          All
        </button>
        {MOCK_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
              activeCategory === cat
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                : "bg-white text-slate-600 shadow-sm border border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Merchant Feed */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24 space-y-4 bg-slate-50">
        <AnimatePresence mode="popLayout">
          {displayedMerchants.map((merchant, i) => (
            <motion.button
              key={merchant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMerchant(merchant)}
              className="w-full bg-white rounded-3xl p-5 shadow-xl shadow-slate-200/50 border-0 flex items-start gap-4 text-left group hover:shadow-2xl hover:shadow-slate-200/60 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl border border-slate-100 shrink-0">
                {merchant.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-lg text-slate-900 truncate pr-2">{merchant.name}</h3>
                  <span className="shrink-0 bg-blue-50 text-blue-700 font-extrabold text-sm px-2.5 py-0.5 rounded-full">
                    {merchant.discount}% OFF
                  </span>
                </div>
                <p className="text-sm text-slate-500 mb-2 truncate">{merchant.category}</p>

                <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span>{merchant.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{merchant.distance}</span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}

          {displayedMerchants.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center text-slate-400 py-12 px-6"
            >
              No merchants found in this category yet.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
