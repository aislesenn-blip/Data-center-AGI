"use client"

import * as React from "react"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"

export default function PartnerDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-black px-6 pt-12 text-white">
      <header className="flex justify-between items-end mb-12 border-b border-surface-800 pb-6">
        <div>
          <h1 className="text-2xl font-medium tracking-tight">Partner Ecosystem</h1>
          <p className="text-surface-400 text-sm mt-1">Coffee Roasters</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-emerald-500 font-mono uppercase tracking-widest">Active</p>
          <p className="text-sm font-medium mt-1">Terminal ID: #8492</p>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 gap-4 mb-10"
      >
        <div className="bg-surface-900 border border-surface-800 rounded-2xl p-5">
          <p className="text-xs text-surface-400 uppercase tracking-wider mb-2">Today&apos;s Volume</p>
          <p className="text-2xl font-medium">$1,245.00</p>
        </div>
        <div className="bg-surface-900 border border-surface-800 rounded-2xl p-5">
          <p className="text-xs text-surface-400 uppercase tracking-wider mb-2">Transactions</p>
          <p className="text-2xl font-medium">84</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-sm font-medium text-surface-400 uppercase tracking-wider mb-4">Recent Settlements</h2>

        <div className="space-y-4">
          {[
            { id: "TX-992", time: "10:42 AM", amount: 12.50 },
            { id: "TX-991", time: "10:15 AM", amount: 4.00 },
            { id: "TX-990", time: "09:30 AM", amount: 28.00 },
            { id: "TX-989", time: "08:45 AM", amount: 8.50 },
          ].map((tx) => (
            <div key={tx.id} className="flex justify-between items-center bg-surface-950 border border-surface-900 p-4 rounded-xl">
              <div>
                <p className="font-mono text-sm">{tx.id}</p>
                <p className="text-xs text-surface-500 mt-1">{tx.time}</p>
              </div>
              <p className="font-medium">+ ${tx.amount.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mt-auto pt-10 pb-8">
        <Button variant="outline" className="w-full border-surface-800">
          Request Physical Tags
        </Button>
      </div>
    </div>
  )
}