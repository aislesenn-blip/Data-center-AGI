"use client"

import { motion } from "framer-motion"
import { mockMerchants } from "@/lib/mockData"
import { MapPin, Star } from "lucide-react"

interface Props {
  category: string
  destination: string
  onSelect: (merchantId: string) => void
  onBack: () => void
}

export function SearchResults({ category, destination, onSelect, onBack }: Props) {
  // In a real app, we'd filter mockMerchants by category and destination here
  const results = mockMerchants

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="absolute inset-0 w-full h-full bg-[#0a0a0a] flex flex-col pt-12"
    >
      <div className="px-12 flex items-center gap-4 mb-8 shrink-0">
        <button onClick={onBack} className="p-4 bg-[#171717] rounded-full active:scale-95 transition-transform">
          <span className="text-2xl text-white">←</span>
        </button>
        <div>
          <h2 className="text-4xl font-bold text-white capitalize">{category} near {destination}</h2>
          <p className="text-xl text-gray-400 mt-2">Found {results.length} great places to shop.</p>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-12 px-12 hide-scrollbar snap-x snap-mandatory flex items-center gap-8">
        {results.map((merchant, i) => (
          <motion.button
            key={merchant.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(merchant.id)}
            className="shrink-0 w-[600px] bg-[#171717] rounded-[3rem] overflow-hidden snap-center flex flex-col text-left border border-gray-800"
          >
            <div
              className="h-[300px] w-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${merchant.image})` }}
            >
              <div className="absolute top-6 left-6 bg-white text-black px-4 py-2 rounded-full font-bold text-lg">
                {merchant.discount}
              </div>
              <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full font-bold text-lg text-yellow-400 flex items-center gap-2">
                <Star className="w-5 h-5 fill-current" />
                {merchant.rating}
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-4xl font-bold text-white mb-2">{merchant.name}</h3>
              <p className="text-2xl text-gray-400 mb-6">{merchant.product}</p>

              <div className="flex items-center justify-between mt-auto">
                <div>
                  <p className="text-4xl font-bold text-green-400">{merchant.price}</p>
                  {merchant.originalPrice && (
                    <p className="text-xl text-gray-500 line-through mt-1">{merchant.originalPrice}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-300 bg-[#262626] px-5 py-3 rounded-2xl">
                  <MapPin className="w-6 h-6" />
                  <span className="text-xl font-medium">{merchant.distance}</span>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </motion.div>
  )
}
