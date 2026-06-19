"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Check, ArrowLeft, Loader2, ShieldCheck, Clock } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function PayPage() {
  const [amount, setAmount] = useState("")
  const [step, setStep] = useState<"amount" | "pin" | "processing" | "success">("amount")
  const [pin, setPin] = useState("")
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    if (step === "success") {
      const updateTime = () => {
        const now = new Date()
        setCurrentTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' }))
      }
      updateTime()
      const interval = setInterval(updateTime, 1000)
      return () => clearInterval(interval)
    }
  }, [step])

  useEffect(() => {
    if (step === "processing") {
      const timer = setTimeout(() => setStep("success"), 1200)
      return () => clearTimeout(timer)
    }
  }, [step])

  return (
    <div className="flex flex-col min-h-[100dvh] bg-black px-6 pt-12 pb-8">
      {step === "amount" && (
        <header className="flex items-center justify-between mb-12">
          <Link href="/">
            <button className="w-10 h-10 rounded-full bg-surface-900 border border-surface-800 flex items-center justify-center hover:bg-surface-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div className="text-right">
            <p className="font-medium text-lg">Coffee Roasters</p>
            <p className="text-xs text-surface-400 flex items-center justify-end gap-1 mt-0.5">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              Verified Partner
            </p>
          </div>
        </header>
      )}

      <AnimatePresence mode="wait">
        {step === "amount" && (
          <motion.div
            key="amount"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 flex flex-col items-center justify-center -mt-10">
              <p className="text-surface-400 mb-6 uppercase tracking-widest text-xs font-semibold">Enter Amount</p>
              <div className="flex items-baseline justify-center">
                <span className="text-surface-500 text-2xl font-medium mr-3">TZS</span>
                <input
                  autoFocus
                  type="number"
                  inputMode="numeric"
                  placeholder="0"
                  className="bg-transparent outline-none w-[200px] text-[64px] font-medium tracking-tighter leading-none"
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
              Pay TZS {amount ? parseInt(amount).toLocaleString() : "0"}
            </Button>
          </motion.div>
        )}

        {step === "pin" && (
          <motion.div
            key="pin"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center relative"
          >
            <h2 className="text-2xl font-medium mb-12">Enter SpaceCard PIN</h2>

            <div className="flex gap-6 mb-16 pointer-events-none">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-5 h-5 rounded-full transition-all duration-300 ${
                    pin.length > i ? "bg-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.5)]" : "bg-surface-800"
                  }`}
                />
              ))}
            </div>

            <input
              autoFocus
              type="tel"
              inputMode="numeric"
              maxLength={4}
              className="opacity-0 absolute inset-0 w-full h-full text-[0px]"
              value={pin}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '')
                setPin(val)
                if (val.length === 4) {
                  setStep("processing")
                }
              }}
            />

            <p className="text-surface-500 text-sm">Secure authorization</p>
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
            {/* The Digital Receipt Object */}
             <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-sm bg-surface-900 border border-surface-800 rounded-3xl p-8 overflow-hidden shadow-2xl">
                 {/* Security Pattern Background */}
                 <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }} />

                 <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6">
                      <Check className="w-8 h-8" />
                    </div>

                    <p className="text-surface-400 text-sm font-medium tracking-widest uppercase mb-2">Verified Receipt</p>
                    <div className="flex items-baseline justify-center mb-8">
                       <span className="text-surface-400 text-lg mr-2 font-medium">TZS</span>
                       <h1 className="text-5xl font-medium tracking-tight">{parseInt(amount).toLocaleString()}</h1>
                    </div>

                    <div className="w-full space-y-4 border-t border-surface-800 pt-6">
                      <div className="flex justify-between items-center">
                        <span className="text-surface-500 text-sm">Paid To</span>
                        <span className="font-medium text-white">Coffee Roasters</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-surface-500 text-sm">Network ID</span>
                        <span className="font-mono text-sm text-white">#CR-8492-AX</span>
                      </div>
                      <div className="flex justify-between items-center bg-surface-950 p-3 rounded-xl mt-4 border border-surface-800/50">
                        <div className="flex items-center gap-2 text-surface-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs uppercase tracking-wider font-medium">Live Time</span>
                        </div>
                        <span className="font-mono text-sm font-medium text-emerald-400">{currentTime}</span>
                      </div>
                    </div>
                 </div>
              </div>
              <p className="mt-8 text-surface-500 text-sm">Show this receipt to the partner.</p>
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