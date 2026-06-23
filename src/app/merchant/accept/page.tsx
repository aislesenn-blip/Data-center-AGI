"use client"

import { QrCode, Smartphone } from "lucide-react"

export default function MerchantAcceptPage() {
  return (
    <div className="flex-1 flex flex-col bg-navy-blue text-electric-white">

      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">

         <div className="text-center space-y-2">
           <h1 className="text-xl font-bold uppercase tracking-widest">Ready to Accept</h1>
           <p className="text-sm font-medium text-slate">Display to customer device</p>
         </div>

         {/* Core Acceptance Interface */}
         <div className="bg-electric-white p-8 rounded-sm shadow-2xl flex flex-col items-center">
            {/* Minimalist QR representation - would be a real generated code */}
            <div className="h-48 w-48 border-4 border-midnight-black p-2 flex flex-col items-center justify-center">
               <QrCode className="h-full w-full text-midnight-black" strokeWidth={1} />
            </div>

            <div className="mt-8 flex items-center space-x-3 w-full justify-center">
              <div className="h-px bg-border flex-1" />
              <span className="text-xs font-bold text-slate uppercase tracking-widest">OR TAP</span>
              <div className="h-px bg-border flex-1" />
            </div>

            <div className="mt-6 flex flex-col items-center text-midnight-black">
               <Smartphone className="h-8 w-8 mb-2" />
               <span className="text-xs font-bold uppercase tracking-wider">NFC Active</span>
            </div>
         </div>

         <div className="text-center">
           <p className="text-xs font-bold text-subtle-gold uppercase tracking-widest">Node: Shoppers Cafe</p>
         </div>

      </div>
    </div>
  )
}
