"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, Check, Search } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

import { useRef } from "react"

export default function TransferPage() {
  const [step, setStep] = useState<"form" | "success">("form")
  const [handle, setHandle] = useState("")
  const [amount, setAmount] = useState("")
  const amountInputRef = useRef<HTMLInputElement>(null)

  // Simulate handle verification logic
  const isValidating = handle.length > 0 && handle.length < 3
  const isVerified = handle.length >= 3

  const handleHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "")
    setHandle(val)
  }

  return (
    <div className="flex flex-col h-full bg-black">
      {step === "form" && (
        <header className="flex items-center justify-between px-6 pt-12 pb-6">
          <div className="flex items-center">
            <Link href="/">
              <button className="w-10 h-10 rounded-full bg-surface-900 border border-surface-800 flex items-center justify-center hover:bg-surface-800 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <h1 className="ml-4 text-xl font-medium tracking-tight">Send Money</h1>
          </div>
          <Button
            variant="default"
            size="sm"
            className="h-10 px-6 font-semibold"
            disabled={!isVerified || !amount || parseFloat(amount) <= 0}
            onClick={() => setStep("success")}
          >
            Send
          </Button>
        </header>
      )}

      <AnimatePresence mode="wait">
        {step === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col px-6"
          >
            <div className="space-y-6">
              <div className="bg-surface-900/50 border border-surface-800 rounded-3xl p-6">
                <label className="text-xs font-medium text-surface-400 uppercase tracking-wider mb-3 block">Recipient Handle</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-0 text-white text-2xl font-medium">$</span>
                    <input
                      type="text"
                      inputMode="text"
                      autoCapitalize="none"
                      autoComplete="off"
                      autoCorrect="off"
                      placeholder="handle"
                      className="w-full bg-transparent pl-7 text-2xl font-medium tracking-wide text-white outline-none placeholder:text-surface-600"
                      value={handle}
                      onChange={handleHandleChange}
                    />
                    {isVerified && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-0 flex items-center gap-2 bg-emerald-500/10 text-emerald-400 pl-2 pr-3 py-1 rounded-full border border-emerald-500/20"
                      >
                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                          <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-widest">Verified</span>
                      </motion.div>
                    )}
                    {isValidating && (
                      <div className="absolute right-0 flex items-center gap-2 text-surface-500 px-3 py-1.5">
                         <Search className="w-4 h-4 animate-pulse" />
                      </div>
                    )}
                  </div>

                  {/* Simulated recipient display card */}
                  <AnimatePresence>
                    {isVerified && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center gap-4 pt-4 border-t border-surface-800">
                          <div className="w-10 h-10 rounded-full bg-surface-800 flex items-center justify-center">
                            <span className="font-mono text-sm uppercase">{handle.slice(0,2)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{handle.charAt(0).toUpperCase() + handle.slice(1)} SpaceCard</p>
                            <p className="text-xs text-surface-500">SpaceCard Identity</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
              </div>

              <div className="bg-surface-900/50 border border-surface-800 rounded-3xl p-6">
                 <label className="text-xs font-medium text-surface-400 uppercase tracking-wider mb-3 block">Amount</label>
                 <div className="flex items-baseline">
                    <span className="text-surface-500 text-xl font-medium mr-2">TZS</span>
                    <input
                      ref={amountInputRef}
                      type="number"
                      inputMode="numeric"
                      placeholder="0"
                      className="w-full bg-transparent text-4xl font-medium tracking-tight text-white outline-none placeholder:text-surface-700"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                 </div>
              </div>
              </div>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <Check className="w-10 h-10" />
              </div>
              <h1 className="text-3xl font-medium tracking-tight mb-2">Sent successfully</h1>
              <p className="text-surface-400 text-lg">
                TZS {parseInt(amount).toLocaleString()} has been sent to ${handle}.
              </p>
            </div>

            <div className="pt-6">
              <Link href="/">
                <Button variant="secondary" className="w-full h-16 text-lg">Done</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}