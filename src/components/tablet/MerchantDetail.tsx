"use client"

import { motion } from "framer-motion"
import { mockMerchants } from "@/lib/mockData"
import { QrCode, MapPin, Navigation, X } from "lucide-react"
import Image from "next/image"

interface Props {
  merchantId: string
  onClose: () => void
}

export function MerchantDetail({ merchantId, onClose }: Props) {
  const merchant = mockMerchants.find(m => m.id === merchantId) || mockMerchants[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="absolute inset-0 w-full h-full bg-slate-50 z-50 flex"
    >
      <div className="w-1/2 h-full relative">
        <Image
          src={merchant.image}
          alt={merchant.name}
          fill
          className="object-cover"
          priority
        />
        <button
          onClick={onClose}
          className="absolute top-8 left-8 p-5 bg-white/90 backdrop-blur-md shadow-lg rounded-full active:scale-95 transition-transform"
        >
          <X className="w-8 h-8 text-slate-800" />
        </button>
      </div>

      <div className="w-1/2 h-full p-16 flex flex-col bg-slate-50">
        <div className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-extrabold text-xl self-start mb-6 uppercase tracking-wider">
          {merchant.category}
        </div>

        <h1 className="text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">{merchant.name}</h1>
        <div className="flex items-center gap-4 text-3xl text-slate-500 font-medium mb-12">
          <MapPin className="w-8 h-8 text-blue-600" />
          <span>{merchant.location}</span>
        </div>

        <div className="bg-white rounded-3xl p-10 mb-auto border-2 border-slate-200 shadow-sm">
          <h2 className="text-4xl font-bold text-slate-800 mb-2">{merchant.product}</h2>
          <div className="flex items-end gap-5 mb-8">
            <span className="text-7xl font-extrabold text-green-600 tracking-tight">{merchant.price}</span>
            {merchant.originalPrice && (
              <span className="text-3xl text-slate-400 font-medium line-through pb-2">{merchant.originalPrice}</span>
            )}
          </div>
          <div className="inline-block px-8 py-4 rounded-full bg-orange-100 text-orange-600 font-extrabold text-2xl border border-orange-200">
            {merchant.discount}
          </div>
        </div>

        <div className="flex items-center gap-8 bg-blue-600 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl shadow-blue-600/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -mr-16 -mt-16 blur-3xl" />

          <div className="bg-white p-5 rounded-[2rem] shrink-0 relative z-10 shadow-lg">
            <div className="w-48 h-48 bg-slate-100 rounded-2xl flex items-center justify-center">
               <QrCode className="w-32 h-32 text-slate-900" />
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="text-4xl font-extrabold text-white mb-4">Scan to get this deal</h3>
            <p className="text-2xl text-blue-100 font-medium flex items-center gap-3">
              <Navigation className="w-8 h-8" />
              Saves route to your phone
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
