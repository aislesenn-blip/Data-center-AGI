"use client"

import { motion } from "framer-motion"
import { mockMerchants } from "@/lib/mockData"
import { QrCode, MapPin, Navigation } from "lucide-react"

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
      className="absolute inset-0 w-full h-full bg-[#0a0a0a] z-50 flex"
    >
      <div
        className="w-1/2 h-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${merchant.image})` }}
      >
        <button
          onClick={onClose}
          className="absolute top-8 left-8 p-4 bg-black/50 backdrop-blur-md rounded-full active:scale-95 transition-transform"
        >
          <span className="text-3xl text-white">✕</span>
        </button>
      </div>

      <div className="w-1/2 h-full p-16 flex flex-col">
        <div className="inline-block px-4 py-2 rounded-full bg-[#262626] text-blue-400 font-bold text-xl self-start mb-6">
          {merchant.category.toUpperCase()}
        </div>

        <h1 className="text-6xl font-bold text-white mb-4">{merchant.name}</h1>
        <div className="flex items-center gap-4 text-2xl text-gray-400 mb-12">
          <MapPin className="w-8 h-8" />
          <span>{merchant.location}</span>
        </div>

        <div className="bg-[#171717] rounded-3xl p-8 mb-auto border border-gray-800">
          <h2 className="text-3xl text-white mb-2">{merchant.product}</h2>
          <div className="flex items-end gap-4 mb-6">
            <span className="text-6xl font-bold text-green-400">{merchant.price}</span>
            {merchant.originalPrice && (
              <span className="text-3xl text-gray-500 line-through pb-1">{merchant.originalPrice}</span>
            )}
          </div>
          <div className="inline-block px-6 py-3 rounded-full bg-orange-500/20 text-orange-400 font-bold text-2xl">
            {merchant.discount}
          </div>
        </div>

        <div className="flex items-center gap-8 bg-blue-600 rounded-[3rem] p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />

          <div className="bg-white p-4 rounded-3xl shrink-0 relative z-10">
            {/* Mock QR Code visually represented by icon for now */}
            <div className="w-48 h-48 bg-gray-100 rounded-xl flex items-center justify-center">
               <QrCode className="w-32 h-32 text-black" />
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="text-4xl font-bold text-white mb-4">Scan to get this deal</h3>
            <p className="text-2xl text-blue-100 flex items-center gap-3">
              <Navigation className="w-8 h-8" />
              Saves route to your phone
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
