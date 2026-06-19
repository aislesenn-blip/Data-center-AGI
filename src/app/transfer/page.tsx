"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, Check, Search, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function TransferPage() {
  const [step, setStep] = useState<"form" | "success">("form")
  const [handle, setHandle] = useState("")
  const [amount, setAmount] = useState("")

  // Simulate handle verification logic
  const isValidating = handle.length > 0 && handle.length < 3
  const isVerified = handle.length >= 3

  return (
    <div className="flex flex-col min-h-[100dvh] px-6 pt-12 pb-8 bg-black">
      {step === "form" && (
        <header className="flex items-center mb-8">
          <Link href="/">
            <button className="w-10 h-10 rounded-full bg-surface-900 border border-surface-800 flex items-center justify-center hover:bg-surface-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="ml-4 text-xl font-medium tracking-tight">Send Money</h1>
        </header>
      )}

      <AnimatePresence mode="wait">
        {step === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1">
              <div className="bg-surface-900/50 border border-surface-800 rounded-3xl p-6 mb-6">
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
                    onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))}
                  />
                  {isVerified && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-0 flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-3 py-1.5 rounded-full"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">Verified</span>
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

              <AnimatePresence>
                {isVerified && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-surface-900/50 border border-surface-800 rounded-3xl p-6"
                  >
                     <label className="text-xs font-medium text-surface-400 uppercase tracking-wider mb-3 block">Amount</label>
                     <div className="flex items-baseline">
                        <span className="text-surface-500 text-xl font-medium mr-2">TZS</span>
                        <input
                          type="number"
                          inputMode="numeric"
                          placeholder="0"
                          className="w-full bg-transparent text-4xl font-medium tracking-tight text-white outline-none placeholder:text-surface-700"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-6">
              <Button
                className="w-full h-16 text-lg shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                disabled={!isVerified || !amount || parseFloat(amount) <= 0}
                onClick={() => setStep("success")}
              >
                Send {amount ? `TZS ${parseInt(amount).toLocaleString()}` : ""}
              </Button>
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