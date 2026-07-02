"use client"

import { motion } from "framer-motion"
import { mockMerchants, categoryStructure, Merchant } from "@/lib/mockData"
import { MapPin, Star, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { BrandHeader } from "./BrandHeader"
import { useState } from "react"

interface Props {
  category: string
  destination: string
  onSelect: (merchantId: string) => void
  onBack: () => void
}

function Carousel({ title, merchants, onSelect }: { title: string, merchants: Merchant[], onSelect: (id: string) => void }) {
  if (merchants.length === 0) return null;
  return (
    <div className="mb-16">
      <h3 className="text-3xl font-bold text-slate-900 px-12 mb-6">{title}</h3>
      <div className="overflow-x-auto pb-8 px-12 hide-scrollbar snap-x snap-mandatory flex items-center gap-8">
        {merchants.map((merchant, i) => (
          <motion.button
            key={merchant.id + title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(merchant.id)}
            className="shrink-0 w-[500px] bg-white shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden snap-start flex flex-col text-left border-0"
          >
            <div className="h-[250px] w-full relative">
              <Image
                src={merchant.heroProduct.image}
                alt={merchant.heroProduct.name}
                fill
                className="object-cover"
              />
              {(merchant.heroProduct.discount || merchant.premium) && (
                <div className="absolute top-4 left-4 bg-white text-slate-900 px-4 py-2 rounded-full font-bold text-lg shadow-md">
                  {merchant.heroProduct.discount || "Premium"}
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-lg text-slate-800 flex items-center gap-2 shadow-md">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                {merchant.rating}
              </div>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-3xl font-extrabold text-slate-900">{merchant.heroProduct.name}</h3>
              </div>
              <p className="text-xl text-slate-500 font-medium mb-6">by {merchant.name}</p>

              <div className="flex items-center justify-between mt-auto">
                <div>
                  <p className="text-3xl font-extrabold text-green-600">{merchant.heroProduct.price}</p>
                  {merchant.heroProduct.originalPrice && (
                    <p className="text-lg text-slate-400 font-medium line-through mt-1">{merchant.heroProduct.originalPrice}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 text-slate-700 bg-slate-100 px-4 py-3 rounded-2xl font-bold">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <span className="text-xl">{merchant.distance}</span>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export function SearchResults({ category, destination, onSelect, onBack }: Props) {
  const catStruct = categoryStructure.find(c => c.id === category) || categoryStructure[0]
  const [activeSubCat, setActiveSubCat] = useState("All")

  // In a real app, this would filter by destination, category, and subcategory
  const results = mockMerchants

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="absolute inset-0 w-full h-full bg-slate-50 flex flex-col pt-12 overflow-y-auto touch-pan-y"
    >
      <BrandHeader />

      <div className="px-12 flex items-center gap-6 mb-8 mt-20 shrink-0">
        <button onClick={onBack} className="p-4 bg-white border-0 shadow-md shadow-slate-200/50 rounded-full active:scale-95 transition-transform">
          <ArrowLeft className="w-8 h-8 text-slate-700" />
        </button>
        <div>
          <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight capitalize">{catStruct.title} near {destination}</h2>
          <p className="text-2xl text-slate-500 font-medium mt-2">Discover products and offers.</p>
        </div>
      </div>

      {/* Sticky Subcategory Tabs */}
      <div className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur-md pb-6 pt-4 px-12 mb-8">
        <div className="flex gap-4 overflow-x-auto hide-scrollbar">
          {catStruct.subcategories.map(sub => (
            <button
              key={sub}
              onClick={() => setActiveSubCat(sub)}
              className={`shrink-0 px-8 py-3 rounded-full text-xl font-bold transition-all ${
                activeSubCat === sub
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                  : "bg-white text-slate-600 border-0 shadow-sm shadow-slate-200/50 hover:shadow-md"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 pb-12">
        <Carousel title={`Trending in ${destination}`} merchants={results.filter(m => m.premium)} onSelect={onSelect} />
        <Carousel title="Best Deals Nearby" merchants={results.filter(m => m.heroProduct.discount)} onSelect={onSelect} />
        <Carousel title="All Businesses" merchants={results} onSelect={onSelect} />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </motion.div>
  )
}
