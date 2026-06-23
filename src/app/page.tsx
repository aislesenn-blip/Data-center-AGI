"use client"

import Link from "next/link"
import { NetworkLogo } from "@/components/ui/NetworkLogo"
import { ScanLine, History, ArrowRight } from "lucide-react"

export default function UserNetworkHome() {
  return (
    <div className="flex flex-col min-h-full bg-stone-gray">

      {/* Infrastructure Header */}
      <header className="px-6 py-6 flex items-center justify-between bg-electric-white border-b border-border sticky top-0 z-50">
        <NetworkLogo />
        <Link href="/history" className="p-2 -mr-2 text-midnight-black hover:bg-stone-gray rounded-sm transition-colors">
          <History className="h-5 w-5" />
        </Link>
      </header>

      <div className="flex-1 flex flex-col p-6 space-y-8">

        {/* Balance Structure */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate uppercase tracking-widest">Network Balance</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-bold text-slate">TZS</span>
            <h1 className="text-5xl font-black text-midnight-black tracking-tight">450,000</h1>
          </div>
          <div className="inline-flex items-center space-x-2 bg-electric-white border border-border px-3 py-1.5 rounded-sm mt-2">
            <div className="h-2 w-2 rounded-full bg-navy-blue" />
            <span className="text-xs font-bold text-midnight-black">Flex Extension Active</span>
          </div>
        </div>

        {/* Primary Action Area */}
        <div className="mt-auto pb-8">
          <Link href="/pay">
            <div className="bg-navy-blue rounded-sm p-8 shadow-xl flex flex-col items-center justify-center space-y-6 hover:bg-navy-blue/95 transition-colors cursor-pointer group active:scale-[0.99] duration-200">
               <div className="relative">
                 <div className="absolute inset-0 bg-subtle-gold/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                 <ScanLine className="h-16 w-16 text-electric-white relative z-10" />
               </div>
               <div className="text-center">
                 <h2 className="text-electric-white font-bold text-xl mb-1">Pay / Authorize</h2>
                 <p className="text-slate text-sm font-medium flex items-center justify-center">
                   Tap to scan terminal <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                 </p>
               </div>
            </div>
          </Link>
        </div>

      </div>
    </div>
  )
}
