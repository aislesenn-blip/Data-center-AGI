"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, Loader2, Check } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

import { useRef } from "react"

export default function DepositPage() {
  const [step, setStep] = useState<"details" | "processing" | "success">("details")
  const [phone, setPhone] = useState("")
  const [amount, setAmount] = useState("")
  const amountInputRef = useRef<HTMLInputElement>(null)

  const handleDeposit = () => {
    setStep("processing")
    setTimeout(() => setStep("success"), 1500)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '')
    setPhone(val)
    if (val.length === 10) {
      amountInputRef.current?.focus()
    }
  }

  return (
    <div className="flex flex-col h-full bg-black">
      {step === "details" && (
        <header className="flex items-center justify-between px-6 pt-12 pb-6">
          <Link href="/">
            <button className="w-10 h-10 rounded-full bg-surface-900 border border-surface-800 flex items-center justify-center hover:bg-surface-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div className="flex-1" />
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
            <div className="flex-1 overflow-y-auto px-6 hide-scrollbar pb-[calc(2rem+env(safe-area-inset-bottom))]">
              <h1 className="text-2xl font-medium tracking-tight mb-2">Deposit Funds</h1>
              <p className="text-surface-400 text-sm mb-8">Enter your mobile money details.</p>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-2 block">Phone Number</label>
                  <input
                    type="tel"
                    inputMode="tel"
                    placeholder="07XX XXX XXX"
                    className="w-full h-14 bg-surface-900/50 border border-surface-800 rounded-xl px-4 text-lg text-white outline-none focus:border-surface-600 focus:bg-surface-900 transition-colors"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-2 block">Amount to deposit</label>
                  <div className="relative flex items-center h-14 bg-surface-900/50 border border-surface-800 rounded-xl focus-within:border-surface-600 focus-within:bg-surface-900 transition-colors overflow-hidden">
                    <span className="pl-4 pr-2 text-surface-500 font-medium text-sm">TZS</span>
                    <input
                      ref={amountInputRef}
                      type="number"
                      inputMode="decimal"
                      placeholder="0"
                      className="w-full h-full bg-transparent text-lg text-white outline-none"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    className="w-full h-14 text-base shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                    disabled={phone.length < 9 || !amount || parseFloat(amount) <= 0}
                    onClick={handleDeposit}
                  >
                    Deposit
                  </Button>
                </div>
              </div>
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