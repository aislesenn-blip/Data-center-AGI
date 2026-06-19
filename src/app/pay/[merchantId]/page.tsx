"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Check, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function PayPage() {
  const [amount, setAmount] = useState("")
  const [step, setStep] = useState<"amount" | "pin" | "processing" | "success">("amount")
  const [pin, setPin] = useState("")

  // Simulate fast processing
  useEffect(() => {
    if (step === "processing") {
      const timer = setTimeout(() => setStep("success"), 800)
      return () => clearTimeout(timer)
    }
  }, [step])


  return (
    <div className="flex flex-col min-h-screen bg-black px-6 pt-12 pb-8">
      {step === "amount" && (
        <header className="flex items-center justify-between mb-12">
          <Link href="/">
            <button className="w-10 h-10 rounded-full bg-surface-900 border border-surface-800 flex items-center justify-center hover:bg-surface-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div className="text-right">
            <p className="font-medium">Coffee Roasters</p>
            <p className="text-xs text-surface-400">NFC Payment</p>
          </div>
        </header>
      )}

      <AnimatePresence mode="wait">
        {step === "amount" && (
          <motion.div
            key="amount"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 flex flex-col items-center justify-center -mt-10">
              <p className="text-surface-400 mb-6 uppercase tracking-widest text-xs font-semibold">Enter Amount</p>
              <div className="flex items-center justify-center text-[80px] font-medium tracking-tighter leading-none">
                <span className="text-surface-600 mr-2">$</span>
                <input
                  autoFocus
                  type="number"
                  placeholder="0.00"
                  className="bg-transparent outline-none w-[240px] text-center"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <Button
              className="w-full h-16 text-lg"
              disabled={!amount || parseFloat(amount) <= 0}
              onClick={() => setStep("pin")}
            >
              Pay ${amount || "0"}
            </Button>
          </motion.div>
        )}

        {step === "pin" && (
          <motion.div
            key="pin"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center"
          >
            <h2 className="text-2xl font-medium mb-12">Enter SpaceCard PIN</h2>

            <div className="flex gap-6 mb-16">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-5 h-5 rounded-full transition-all duration-300 ${
                    pin.length > i ? "bg-white scale-110" : "bg-surface-800"
                  }`}
                />
              ))}
            </div>

            {/* Hidden input to capture keystrokes */}
            <input
              autoFocus
              type="tel"
              maxLength={4}
              className="opacity-0 absolute inset-0 w-full h-full cursor-default"
              value={pin}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '')
                setPin(val)
                if (val.length === 4) {
                  setStep("processing")
                }
              }}
            />

            <p className="text-surface-500 text-sm">Use keypad to enter PIN</p>
          </motion.div>
        )}

        {step === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center"
          >
            <Loader2 className="w-12 h-12 animate-spin text-white mb-6" />
            <p className="text-surface-400 font-medium animate-pulse">Processing secure payment...</p>
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
              <div className="w-28 h-28 rounded-[2rem] bg-white text-black flex items-center justify-center mb-10 shadow-[0_0_60px_rgba(255,255,255,0.3)]">
                <Check className="w-12 h-12" />
              </div>

              <p className="text-surface-400 mb-2 font-mono">Receipt</p>
              <h1 className="text-5xl font-medium tracking-tight mb-4">${amount}</h1>
              <p className="text-xl text-surface-300">Paid to Coffee Roasters</p>
            </div>

            <Link href="/" className="w-full">
              <Button variant="secondary" className="w-full h-16 text-lg">Done</Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}