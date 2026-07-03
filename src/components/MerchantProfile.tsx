"use client"

import { motion } from "framer-motion"
import { Merchant } from "@/lib/mockData"
import { ArrowLeft, MapPin, Clock, Phone, Navigation } from "lucide-react"

interface Props {
  merchant: Merchant
  onBack: () => void
}

export function MerchantProfile({ merchant, onBack }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="absolute inset-0 z-20 bg-white flex flex-col"
    >
      {/* Header / Hero */}
      <div className="relative h-64 bg-slate-100 shrink-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10" />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 z-20 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Mock Photo Area */}
        <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-20">
          {merchant.logo}
        </div>

        {/* Floating Logo & Details */}
        <div className="absolute -bottom-8 left-6 flex items-end gap-4 z-20">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-4xl border border-slate-50">
            {merchant.logo}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-12 pb-24">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-3xl font-bold text-slate-900 leading-tight pr-4">{merchant.name}</h1>
          <div className="shrink-0 bg-blue-100 text-blue-700 font-extrabold px-3 py-1 rounded-full text-lg shadow-sm">
            {merchant.discount}% OFF
          </div>
        </div>
        <p className="text-slate-500 font-medium mb-6">{merchant.category}</p>

        <p className="text-slate-700 leading-relaxed mb-8">
          {merchant.description}
        </p>

        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900 mb-0.5">Location</p>
              <p className="text-slate-500 text-sm">{merchant.address}</p>
              <p className="text-slate-400 text-xs mt-0.5">{merchant.distance} away</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900 mb-0.5">Hours</p>
              <p className="text-slate-500 text-sm">{merchant.hours}</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900 mb-0.5">Contact</p>
              <p className="text-slate-500 text-sm">{merchant.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="shrink-0 p-6 bg-white border-t border-slate-100 shadow-[0_-10px_20px_-15px_rgba(0,0,0,0.1)] z-30 relative">
        <a
          href={merchant.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold text-lg py-4 rounded-full shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all"
        >
          <Navigation className="w-5 h-5" />
          Open in Google Maps
        </a>
      </div>

    </motion.div>
  )
}
