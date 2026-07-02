"use client"

import { motion } from "framer-motion"
import { mockMerchants } from "@/lib/mockData"
import { MapPin, Star, ArrowLeft } from "lucide-react"
import Image from "next/image"

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
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="absolute inset-0 w-full h-full bg-slate-50 flex flex-col pt-12"
    >
      <div className="px-12 flex items-center gap-6 mb-8 shrink-0">
        <button onClick={onBack} className="p-5 bg-white border-2 border-slate-200 shadow-sm rounded-full active:scale-95 transition-transform">
          <ArrowLeft className="w-8 h-8 text-slate-700" />
        </button>
        <div>
          <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight capitalize">{category} near {destination}</h2>
          <p className="text-2xl text-slate-500 font-medium mt-2">Found {results.length} great places to shop.</p>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-12 px-12 hide-scrollbar snap-x snap-mandatory flex items-center gap-8">
        {results.map((merchant, i) => (
          <motion.button
            key={merchant.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(merchant.id)}
            className="shrink-0 w-[600px] bg-white shadow-xl shadow-slate-200/50 rounded-[3rem] overflow-hidden snap-center flex flex-col text-left border-2 border-slate-100"
          >
            <div className="h-[300px] w-full relative">
              <Image
                src={merchant.image}
                alt={merchant.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-6 left-6 bg-white text-slate-900 px-5 py-2 rounded-full font-bold text-xl shadow-md">
                {merchant.discount}
              </div>
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full font-bold text-xl text-slate-800 flex items-center gap-2 shadow-md">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                {merchant.rating}
              </div>
            </div>

            <div className="p-10">
              <h3 className="text-4xl font-extrabold text-slate-900 mb-2">{merchant.name}</h3>
              <p className="text-2xl text-slate-500 font-medium mb-8">{merchant.product}</p>

              <div className="flex items-center justify-between mt-auto">
                <div>
                  <p className="text-4xl font-extrabold text-green-600">{merchant.price}</p>
                  {merchant.originalPrice && (
                    <p className="text-xl text-slate-400 font-medium line-through mt-1">{merchant.originalPrice}</p>
                  )}
                </div>
                <div className="flex items-center gap-3 text-slate-700 bg-slate-100 px-6 py-4 rounded-2xl font-bold">
                  <MapPin className="w-7 h-7 text-blue-600" />
                  <span className="text-2xl">{merchant.distance}</span>
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
