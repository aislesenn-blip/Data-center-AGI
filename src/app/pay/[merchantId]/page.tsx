"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Check, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function PayPage() {
  const [amount, setAmount] = useState("")
  const [step, setStep] = useState<"amount" | "ready" | "processing" | "success">("amount")
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
         setStep("success")
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [step])

  return (
    <div className="flex flex-col h-full bg-background">
      {step === "amount" && (
        <header className="flex items-center justify-between px-6 pt-12 pb-6">
          <Link href="/">
            <button className="w-10 h-10 rounded-full bg-surface-700 border border-surface-600 flex items-center justify-center hover:bg-surface-600 transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
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
              className="w-10 h-10 rounded-full bg-surface-700 border border-surface-600 flex items-center justify-center hover:bg-surface-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
        </header>
      )}

      <AnimatePresence mode="wait">
        {step === "amount" && (
          <motion.div
            key="amount-form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 overflow-y-auto px-6 hide-scrollbar pb-[calc(2rem+env(safe-area-inset-bottom))]">
              <h1 className="text-2xl font-medium tracking-tight mb-2 text-foreground">New Payment</h1>
              <p className="text-surface-200 text-sm mb-8">Enter the amount to pay.</p>

              <div className="space-y-6">
                <div>
                   <label className="text-[10px] font-bold text-surface-200 uppercase tracking-widest mb-2 block">Amount to pay</label>
                   <div className="relative flex items-center h-14 bg-surface-700 border border-surface-600 rounded-xl focus-within:border-brand focus-within:bg-surface-600 transition-colors overflow-hidden">
                      <span className="pl-4 pr-2 text-surface-200 font-medium text-sm">TZS</span>
                      <input
                        autoFocus
                        type="number"
                        inputMode="numeric"
                        placeholder="0"
                        className="w-full h-full bg-transparent text-lg text-foreground outline-none"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                   </div>
                </div>

                <div className="pt-2">
                  <Button
                    className="w-full h-14 text-base"
                    disabled={!amount || parseFloat(amount) <= 0}
                    onClick={() => setStep("ready")}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === "ready" && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
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
              <div className="w-24 h-24 bg-surface-700 border border-surface-600 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(59,130,246,0.15)] relative">
                <svg className="w-10 h-10 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2C10.6667 6.66667 10.6667 17.3333 6 22M10.6667 4.33333C14.0762 7.74281 14.0762 16.2572 10.6667 19.6667M15.3333 6.66667C17.4856 8.81896 17.4856 15.181 15.3333 17.3333M20 9C20.6667 9.66667 20.6667 14.3333 20 15" />
                </svg>
              </div>
              <h2 className="text-2xl font-medium tracking-tight mb-2 text-foreground">Ready to Pay</h2>
              <p className="text-surface-200 text-center max-w-[250px]">
                Hold your phone near the reader to authorize TZS {parseInt(amount || "0").toLocaleString()}
              </p>

              {/* HIDDEN BUTTON TO TRIGGER PROCESSING FOR TESTING / SIMULATION */}
              <button
                onClick={() => setStep("processing")}
                className="mt-12 text-surface-400 text-xs uppercase tracking-widest font-bold hover:text-surface-200 transition-colors"
              >
                (Simulate Tap)
              </button>
            </div>
          </motion.div>
        )}

        {step === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="flex-1 flex flex-col items-center justify-center"
          >
            <Loader2 className="w-12 h-12 animate-spin text-brand mb-6" />
            <p className="text-surface-200 font-medium animate-pulse">Authorizing payment...</p>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="flex-1 flex flex-col overflow-hidden px-6 pt-6 pb-6"
          >
            {/* The Digital Receipt Object - Massive and Official */}
             <div className="flex-1 flex flex-col relative w-full bg-surface-800 border border-surface-600 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

                 {/* Premium Security Header Area */}
                 <div className="bg-surface-700/80 px-8 py-6 flex justify-between items-center border-b border-surface-600">
                   <div className="flex flex-col">
                      <span className="text-[10px] text-surface-200 font-bold uppercase tracking-widest mb-1">SpaceCard Network</span>
                      <span className="text-sm font-medium text-foreground">Verified Receipt</span>
                   </div>
                   <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center shadow-[0_0_15px_rgba(0,168,132,0.3)]">
                      <Check className="w-5 h-5 text-brand-foreground stroke-[3]" />
                   </div>
                 </div>

                 {/* Receipt Body */}
                 <div className="flex-1 overflow-y-auto px-8 py-8 hide-scrollbar">

                    <div className="flex flex-col items-center mb-10">
                      <p className="text-surface-200 text-sm font-medium uppercase tracking-widest mb-3">Amount Paid</p>
                      <div className="flex items-baseline justify-center">
                         <span className="text-surface-200 text-2xl font-medium mr-2">TZS</span>
                         <h1 className="text-5xl font-medium tracking-tighter text-foreground">{parseInt(amount).toLocaleString()}</h1>
                      </div>
                    </div>

                    <div className="w-full space-y-6">
                      <div className="flex justify-between items-start border-b border-surface-600 pb-4">
                        <span className="text-surface-200 text-sm">Partner</span>
                        <div className="text-right">
                           <span className="font-medium text-foreground block">Coffee Roasters</span>
                           <span className="text-xs text-surface-200 font-mono">Terminal #CR-8492</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-b border-surface-600 pb-4">
                        <span className="text-surface-200 text-sm">Date</span>
                        <span className="font-medium text-foreground">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>

                      <div className="flex justify-between items-center border-b border-surface-600 pb-4">
                        <span className="text-surface-200 text-sm">SpaceCard ID</span>
                        <span className="font-mono text-sm text-foreground bg-surface-700 px-2 py-1 rounded">$jules</span>
                      </div>

                      <div className="flex justify-between items-center border-b border-surface-600 pb-4">
                        <span className="text-surface-200 text-sm">Ref</span>
                        <span className="font-mono text-xs text-surface-200 uppercase tracking-wider">SC-{refCode}</span>
                      </div>
                    </div>

                    {/* Live Trust Element */}
                    <div className="mt-8 flex justify-between items-center bg-background/50 p-4 rounded-2xl border border-surface-600">
                      <div className="flex items-center gap-3 text-surface-200">
                        <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                        <span className="text-[11px] uppercase tracking-widest font-bold text-foreground">Live Status</span>
                      </div>
                      <span className="font-mono text-sm font-medium text-brand">{currentTime}</span>
                    </div>

                 </div>
              </div>

              <div className="pt-6 pb-[env(safe-area-inset-bottom)] text-center">
                <p className="mb-6 text-surface-200 text-sm font-medium uppercase tracking-widest">Show this to the partner</p>
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