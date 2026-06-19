"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, ArrowRight, Loader2, Check } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function DepositPage() {
  const [step, setStep] = useState<"details" | "processing" | "success">("details")
  const [phone, setPhone] = useState("")
  const [amount, setAmount] = useState("")

  const handleDeposit = () => {
    setStep("processing")
    setTimeout(() => setStep("success"), 1500)
  }

  return (
    <div className="flex flex-col min-h-[100dvh] px-6 pt-12 pb-8">
      {step === "details" && (
        <header className="flex items-center mb-10">
          <Link href="/">
            <button className="w-10 h-10 rounded-full bg-surface-900 border border-surface-800 flex items-center justify-center hover:bg-surface-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
        </header>
      )}

      <AnimatePresence mode="wait">
        {step === "details" && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1">
              <h1 className="text-3xl font-medium tracking-tight mb-2">Deposit Funds</h1>
              <p className="text-surface-400 mb-10">Enter your mobile money details.</p>

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-medium text-surface-400 uppercase tracking-wider mb-2 block">Phone Number</label>
                  <input
                    type="tel"
                    inputMode="tel"
                    placeholder="07XX XXX XXX"
                    className="w-full h-16 bg-surface-900 border border-surface-800 rounded-2xl px-6 text-xl text-white outline-none focus:border-surface-600 transition-colors"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-surface-400 uppercase tracking-wider mb-2 block">Amount (TZS)</label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-surface-500 font-medium">TZS</span>
                    <input
                      type="number"
                      inputMode="decimal"
                      placeholder="0"
                      className="w-full h-16 bg-surface-900 border border-surface-800 rounded-2xl pl-16 pr-6 text-xl text-white outline-none focus:border-surface-600 transition-colors"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Button
                className="w-full h-16 text-lg"
                disabled={phone.length < 9 || !amount || parseFloat(amount) <= 0}
                onClick={handleDeposit}
              >
                Deposit TZS {amount ? parseInt(amount).toLocaleString() : "0"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <Loader2 className="w-12 h-12 animate-spin text-white mb-6" />
            <p className="text-surface-400 font-medium animate-pulse">Requesting deposit...</p>
            <p className="text-sm text-surface-500 mt-2">Please check your phone to confirm the PIN.</p>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 flex flex-col items-center justify-center">
               <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <Check className="w-10 h-10" />
              </div>
              <h1 className="text-3xl font-medium tracking-tight mb-2">Deposit Successful</h1>
              <p className="text-surface-400 text-lg">
                TZS {parseInt(amount).toLocaleString()} added to your SpaceCard.
              </p>
            </div>

            <Link href="/" className="w-full pt-6">
              <Button variant="secondary" className="w-full h-16 text-lg">Done</Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}