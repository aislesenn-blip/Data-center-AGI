"use client"

import { motion } from "framer-motion"
import { mockMerchants } from "@/lib/mockData"
import { QrCode, MapPin, Navigation, X, Store, Info } from "lucide-react"
import Image from "next/image"

interface Props {
  merchantId: string
  onClose: () => void
}

export function MerchantDetail({ merchantId, onClose }: Props) {
  const merchant = mockMerchants.find(m => m.id === merchantId) || mockMerchants[0]
  const product = merchant.heroProduct

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="absolute inset-0 w-full h-full bg-slate-50 z-50 overflow-y-auto touch-pan-y"
    >
      <div className="relative w-full h-[600px]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

        <button
          onClick={onClose}
          className="absolute top-8 left-8 p-5 bg-white/90 backdrop-blur-md shadow-lg rounded-full active:scale-95 transition-transform"
        >
          <X className="w-8 h-8 text-slate-800" />
        </button>

        <div className="absolute bottom-12 left-12 right-12 flex items-end justify-between">
          <div className="text-white max-w-3xl">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-lg mb-4">
               <Store className="w-5 h-5" />
               {merchant.name}
            </div>
            <h1 className="text-7xl font-extrabold tracking-tight mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 text-2xl font-medium text-slate-200">
              <MapPin className="w-7 h-7 text-blue-400" />
              <span>{merchant.location} ({merchant.distance})</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl text-slate-900 shrink-0 min-w-[300px]">
             <div className="flex items-end gap-4 mb-2">
                <span className="text-5xl font-extrabold text-green-600 tracking-tight">{product.price}</span>
             </div>
             {product.originalPrice && (
                <span className="text-2xl text-slate-400 font-medium line-through">{product.originalPrice}</span>
             )}
             {product.discount && (
                <div className="mt-4 inline-block px-4 py-2 rounded-xl bg-orange-100 text-orange-600 font-extrabold text-xl">
                  {product.discount}
                </div>
             )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-12 flex gap-12">
        <div className="flex-1 space-y-12">
          {/* Description */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">About this item</h2>
            <p className="text-2xl text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </section>

          {/* Recommendation */}
          {product.recommendationReason && (
            <section className="bg-blue-50 border-2 border-blue-100 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-900">Why we recommend it</h2>
              </div>
              <p className="text-xl text-slate-700">
                {product.recommendationReason}
              </p>
            </section>
          )}

          {/* QR Handoff */}
          <section className="flex items-center gap-8 bg-blue-600 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl shadow-blue-600/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -mr-16 -mt-16 blur-3xl" />

            <div className="bg-white p-5 rounded-[2rem] shrink-0 relative z-10 shadow-lg">
              <div className="w-40 h-40 bg-slate-100 rounded-2xl flex items-center justify-center">
                 <QrCode className="w-24 h-24 text-slate-900" />
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-4xl font-extrabold text-white mb-4">Scan to get this deal</h3>
              <p className="text-2xl text-blue-100 font-medium flex items-center gap-3">
                <Navigation className="w-8 h-8" />
                Saves route to your phone
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* More from this store */}
      {merchant.otherProducts.length > 0 && (
        <div className="bg-slate-100 pt-16 pb-24 mt-8">
          <div className="max-w-7xl mx-auto px-12">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-8">More from {merchant.name}</h2>

            <div className="flex overflow-x-auto gap-8 hide-scrollbar snap-x snap-mandatory">
              {merchant.otherProducts.map(p => (
                <div key={p.id} className="shrink-0 w-[400px] bg-white rounded-3xl overflow-hidden shadow-md snap-start border border-slate-200">
                   <div className="h-[250px] w-full relative">
                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                   </div>
                   <div className="p-8">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 truncate">{p.name}</h3>
                      <p className="text-lg text-slate-500 line-clamp-2 mb-6 h-[56px]">{p.description}</p>
                      <p className="text-3xl font-extrabold text-green-600">{p.price}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </motion.div>
  )
}
