"use client"

import * as React from "react"
import { SpaceCard } from "@/components/SpaceCard"
import { Button } from "@/components/ui/Button"
import { ArrowUpRight, ArrowDownLeft, ScanLine, } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="flex flex-col h-full overflow-y-auto hide-scrollbar px-6 pt-12 pb-24">
      {/* Hero Card */}
      <div className="mt-8 mb-10 w-full flex justify-center">
        <SpaceCard balance={12450.00} name="Jules Dev" handle="jules" />
      </div>

      {/* Primary Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-4 mb-12"
      >
        <Link href="/transfer" className="block">
          <Button variant="secondary" className="w-full h-16 rounded-2xl flex gap-3 text-base">
            <ArrowUpRight className="w-5 h-5 text-surface-400" />
            Send
          </Button>
        </Link>
        <Link href="/deposit" className="block">
          <Button variant="secondary" className="w-full h-16 rounded-2xl flex gap-3 text-base">
            <ArrowDownLeft className="w-5 h-5 text-surface-400" />
            Deposit
          </Button>
        </Link>
      </motion.div>

      {/* Activity Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex-1"
      >
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-lg font-medium">Recent Activity</h2>
          <button className="text-sm text-surface-400 hover:text-white transition-colors">See all</button>
        </div>

        <div className="space-y-6">
          {/* Transaction Item */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-surface-900 border border-surface-800 flex items-center justify-center">
                <span className="font-mono text-sm text-surface-300">WK</span>
              </div>
              <div>
                <p className="font-medium text-base">Work Cafe</p>
                <p className="text-sm text-surface-500">Today, 9:41 AM</p>
              </div>
            </div>
            <p className="font-medium text-base">- TZS 12,500</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-surface-900 border border-surface-800 flex items-center justify-center">
                <span className="font-mono text-sm text-surface-300">AL</span>
              </div>
              <div>
                <p className="font-medium text-base">$alex</p>
                <p className="text-sm text-surface-500">Yesterday</p>
              </div>
            </div>
            <p className="font-medium text-base text-white">+ TZS 45,000</p>
          </div>
        </div>
      </motion.div>

      {/* Admin Discoverability */}
      <div className="mt-16 flex justify-center">
        <Link href="/partner" className="text-[10px] uppercase tracking-widest text-surface-700 hover:text-surface-500 transition-colors">
          Partners
        </Link>
      </div>

      {/* Bottom Floating Action Bar (NFC Pay) */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-[env(safe-area-inset-bottom,2rem)] flex justify-center bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none">
        <Link href="/pay/demo-merchant" className="pointer-events-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-16 px-8 bg-white text-black rounded-full flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.15)] cursor-pointer"
          >
            <ScanLine className="w-5 h-5" />
            <span className="font-medium text-base">Tap to Pay</span>
          </motion.div>
        </Link>
      </div>
    </div>
  )
}