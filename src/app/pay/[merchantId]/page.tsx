"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Check, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function PayPage() {
  const [amount, setAmount] = useState("")
  const [step, setStep] = useState<"amount" | "processing" | "ready" | "success">("amount")
  const [currentTime, setCurrentTime] = useState("")
  const [refCode, setRefCode] = useState("000000")

  useEffect(() => {
    // Generate ref code only on the client
    const timeoutId = setTimeout(() => {
      setRefCode((Math.random() * 1000000).toFixed(0).padStart(6, '0'))
    }, 0)
    return () => clearTimeout(timeoutId)
  }, [])

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
      const timer = setTimeout(() => {
         setStep("ready")
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [step])

  return (
    <div className="flex flex-col h-full bg-black">
      {step === "amount" && (
        <header className="flex items-center justify-between px-6 pt-12 pb-6">
          <Link href="/">
            <button className="w-10 h-10 rounded-full bg-surface-900 border border-surface-800 flex items-center justify-center hover:bg-surface-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div className="flex-1" />
        </header>
      )}

      {step === "ready" && (
        <header className="flex items-center px-6 pt-12 pb-6">
            <button
              onClick={() => {
                setStep("amount")
              }}
              className="w-10 h-10 rounded-full bg-surface-900 border border-surface-800 flex items-center justify-center hover:bg-surface-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
        </header>
      )}

      <AnimatePresence mode="wait">
        {step === "amount" && (
          <motion.div
            key="amount-form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 overflow-y-auto px-6 hide-scrollbar pb-[calc(2rem+env(safe-area-inset-bottom))]">
              <h1 className="text-2xl font-medium tracking-tight mb-2">Pay Partner</h1>
              <p className="text-surface-400 text-sm mb-8">Enter payment details below.</p>

              <div className="space-y-6">
                <div className="bg-surface-900/50 border border-surface-800 rounded-2xl p-5 flex items-center justify-between">
                  <div>
                    <label className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-1 block">Partner</label>
                    <p className="font-medium text-white text-lg">Coffee Roasters</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-surface-400 font-bold uppercase tracking-widest">Verified</span>
                      <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                        <Check className="w-2.5 h-2.5 text-black stroke-[3]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                   <label className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-2 block">Amount to pay</label>
                   <div className="relative flex items-center h-14 bg-surface-900/50 border border-surface-800 rounded-xl focus-within:border-surface-600 focus-within:bg-surface-900 transition-colors overflow-hidden">
                      <span className="pl-4 pr-2 text-surface-500 font-medium text-sm">TZS</span>
                      <input
                        autoFocus
                        type="number"
                        inputMode="numeric"
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
                    disabled={!amount || parseFloat(amount) <= 0}
                    onClick={() => setStep("processing")}
                  >
                    Create Payment
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
            className="flex-1 flex flex-col items-center justify-center"
          >
            <Loader2 className="w-12 h-12 animate-spin text-white mb-6" />
            <p className="text-surface-400 font-medium animate-pulse">Saving payment info...</p>
          </motion.div>
        )}

        {step === "ready" && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col items-center justify-center px-6 relative"
          >
            {/* Pulsing background effect */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
              <motion.div
                animate={{
                  scale: [1, 2, 2],
                  opacity: [0.3, 0.1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="w-48 h-48 rounded-full bg-blue-500/20"
              />
              <motion.div
                animate={{
                  scale: [1, 2.5, 2.5],
                  opacity: [0.2, 0.05, 0],
                }}
                transition={{
                  duration: 2,
                  delay: 0.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute w-48 h-48 rounded-full bg-blue-500/20"
              />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-surface-900 border border-surface-800 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(59,130,246,0.15)] relative">
                <svg className="w-10 h-10 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2C10.6667 6.66667 10.6667 17.3333 6 22M10.6667 4.33333C14.0762 7.74281 14.0762 16.2572 10.6667 19.6667M15.3333 6.66667C17.4856 8.81896 17.4856 15.181 15.3333 17.3333M20 9C20.6667 9.66667 20.6667 14.3333 20 15" />
                </svg>
              </div>
              <h2 className="text-2xl font-medium tracking-tight mb-2 text-white">Ready to Pay</h2>
              <p className="text-surface-400 text-center max-w-[250px]">
                Hold your phone near the reader to authorize TZS {parseInt(amount || "0").toLocaleString()}
              </p>

              {/* HIDDEN BUTTON TO TRIGGER SUCCESS FOR TESTING / SIMULATION */}
              <button
                onClick={() => setStep("success")}
                className="mt-12 text-surface-600 text-xs uppercase tracking-widest font-bold hover:text-surface-400 transition-colors"
              >
                (Simulate Tap)
              </button>
            </div>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col overflow-hidden px-6 pt-6 pb-6"
          >
            {/* The Digital Receipt Object - Massive and Official */}
             <div className="flex-1 flex flex-col relative w-full bg-surface-950 border border-surface-800 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

                 {/* Premium Security Header Area */}
                 <div className="bg-surface-900/80 px-8 py-6 flex justify-between items-center border-b border-surface-800">
                   <div className="flex flex-col">
                      <span className="text-[10px] text-surface-400 font-bold uppercase tracking-widest mb-1">SpaceCard Network</span>
                      <span className="text-sm font-medium">Verified Receipt</span>
                   </div>
                   <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                      <Check className="w-5 h-5 text-black stroke-[3]" />
                   </div>
                 </div>

                 {/* Receipt Body */}
                 <div className="flex-1 overflow-y-auto px-8 py-8 hide-scrollbar">

                    <div className="flex flex-col items-center mb-10">
                      <p className="text-surface-400 text-sm font-medium uppercase tracking-widest mb-3">Amount Paid</p>
                      <div className="flex items-baseline justify-center">
                         <span className="text-surface-500 text-2xl font-medium mr-2">TZS</span>
                         <h1 className="text-5xl font-medium tracking-tighter text-white">{parseInt(amount).toLocaleString()}</h1>
                      </div>
                    </div>

                    <div className="w-full space-y-6">
                      <div className="flex justify-between items-start border-b border-surface-800 pb-4">
                        <span className="text-surface-500 text-sm">Partner</span>
                        <div className="text-right">
                           <span className="font-medium text-white block">Coffee Roasters</span>
                           <span className="text-xs text-surface-400 font-mono">Terminal #CR-8492</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-b border-surface-800 pb-4">
                        <span className="text-surface-500 text-sm">Date</span>
                        <span className="font-medium text-white">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>

                      <div className="flex justify-between items-center border-b border-surface-800 pb-4">
                        <span className="text-surface-500 text-sm">SpaceCard ID</span>
                        <span className="font-mono text-sm text-white bg-surface-900 px-2 py-1 rounded">$jules</span>
                      </div>

                      <div className="flex justify-between items-center border-b border-surface-800 pb-4">
                        <span className="text-surface-500 text-sm">Ref</span>
                        <span className="font-mono text-xs text-surface-300 uppercase tracking-wider">SC-{refCode}</span>
                      </div>
                    </div>

                    {/* Live Trust Element */}
                    <div className="mt-8 flex justify-between items-center bg-black/50 p-4 rounded-2xl border border-surface-800">
                      <div className="flex items-center gap-3 text-surface-400">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11px] uppercase tracking-widest font-bold">Live Status</span>
                      </div>
                      <span className="font-mono text-sm font-medium text-emerald-400">{currentTime}</span>
                    </div>

                 </div>
              </div>

              <div className="pt-6 pb-[env(safe-area-inset-bottom)] text-center">
                <p className="mb-6 text-surface-500 text-sm font-medium uppercase tracking-widest">Show this to the partner</p>
                <Link href="/" className="block w-full">
                  <Button variant="secondary" className="w-full h-16 text-lg">Done</Button>
                </Link>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}