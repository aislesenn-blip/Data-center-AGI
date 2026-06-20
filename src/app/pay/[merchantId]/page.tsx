"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Check, ArrowLeft, Loader2, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useRef } from "react"

export default function PayPage() {
  const [amount, setAmount] = useState("")
  const [step, setStep] = useState<"details" | "processing" | "success">("details")
  const [pin, setPin] = useState(["", "", "", ""])
  const [currentTime, setCurrentTime] = useState("")
  const [refCode, setRefCode] = useState("000000")
  const pinRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const handlePinChange = (index: number, value: string) => {
    const newPin = [...pin]
    // Only allow digits
    const cleanValue = value.replace(/\D/g, '').slice(-1)
    newPin[index] = cleanValue
    setPin(newPin)

    // Auto advance
    if (cleanValue !== "" && index < 3) {
      pinRefs[index + 1].current?.focus()
    }

  }

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && pin[index] === "" && index > 0) {
      pinRefs[index - 1].current?.focus()
    }
  }

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
      const timer = setTimeout(() => setStep("success"), 1200)
      return () => clearTimeout(timer)
    }
  }, [step])

  return (
    <div className="flex flex-col h-full bg-black">
      {step === "details" && (
        <header className="flex items-center justify-between px-6 pt-12 pb-6">
          <div className="flex items-center gap-3">
            <Link href="/">
              <button className="w-10 h-10 rounded-full bg-surface-900 border border-surface-800 flex items-center justify-center hover:bg-surface-800 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div className="flex flex-col">
              <p className="font-medium text-sm">Coffee Roasters</p>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-surface-400 font-bold uppercase tracking-widest">Verified</span>
                <div className="w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                  <Check className="w-2 h-2 text-black stroke-[3]" />
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="default"
            size="sm"
            className="h-10 px-6 font-semibold"
            disabled={!amount || parseFloat(amount) <= 0 || pin.some(p => p === "")}
            onClick={() => setStep("processing")}
          >
            Pay
          </Button>
        </header>
      )}

      <AnimatePresence mode="wait">
        {step === "details" && (
          <motion.div
            key="payment-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col px-6 space-y-6"
          >
            {/* Amount Section */}
            <div className="bg-surface-900/50 border border-surface-800 rounded-3xl p-6 mt-2">
              <label className="text-xs font-medium text-surface-400 uppercase tracking-wider mb-3 block">Amount to Pay</label>
              <div className="flex items-baseline">
                <span className="text-surface-500 text-2xl font-medium mr-3">TZS</span>
                <input
                  autoFocus
                  type="number"
                  inputMode="numeric"
                  placeholder="0"
                  className="w-full bg-transparent outline-none text-[48px] font-medium tracking-tighter text-white placeholder:text-surface-700"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            {/* PIN Section */}
            <div className={`transition-opacity duration-500 ${amount && parseFloat(amount) > 0 ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
              <div className="bg-surface-900/50 border border-surface-800 rounded-3xl p-6">
                <label className="text-xs font-medium text-surface-400 uppercase tracking-wider mb-6 block flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Enter PIN to Authorize
                </label>

                <div className="flex gap-4 relative z-10 justify-center mb-2">
                  {[0, 1, 2, 3].map((i) => (
                    <input
                      key={i}
                      ref={pinRefs[i]}
                      type="tel"
                      inputMode="numeric"
                      maxLength={1}
                      className="w-14 h-16 bg-surface-900 border border-surface-800 rounded-xl text-center text-2xl font-medium text-white outline-none focus:border-surface-600 transition-colors disabled:opacity-50"
                      value={pin[i]}
                      onChange={(e) => handlePinChange(i, e.target.value)}
                      onKeyDown={(e) => handlePinKeyDown(i, e)}
                      disabled={!amount || parseFloat(amount) <= 0}
                    />
                  ))}
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
            <p className="text-surface-400 font-medium animate-pulse">Processing secure payment...</p>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col px-6 pt-6 pb-6"
          >
            {/* The Digital Receipt Object - Massive and Official */}
             <div className="flex-1 flex flex-col relative w-full bg-surface-950 border border-surface-800 rounded-3xl overflow-hidden">

                 {/* Premium Security Header Area */}
                 <div className="bg-surface-900 px-6 py-5 flex justify-between items-center border-b border-surface-800">
                   <div className="flex flex-col">
                      <span className="text-[10px] text-surface-400 font-bold uppercase tracking-widest mb-0.5">SpaceCard Network</span>
                      <span className="text-sm font-medium text-white">Verified Receipt</span>
                   </div>
                   <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-black stroke-[3]" />
                   </div>
                 </div>

                 {/* Receipt Body */}
                 <div className="flex-1 flex flex-col overflow-y-auto px-6 py-8 hide-scrollbar">

                    <div className="flex flex-col items-center mb-8">
                      <p className="text-surface-400 text-xs font-medium uppercase tracking-widest mb-2">Amount Paid</p>
                      <div className="flex items-baseline justify-center">
                         <span className="text-surface-500 text-xl font-medium mr-2">TZS</span>
                         <h1 className="text-4xl font-medium tracking-tight text-white">{parseInt(amount).toLocaleString()}</h1>
                      </div>
                    </div>

                    <div className="w-full space-y-6">
                      <div className="flex justify-between items-start border-b border-surface-800/50 pb-4">
                        <span className="text-surface-500 text-sm">Partner</span>
                        <div className="text-right">
                           <span className="font-medium text-white block">Coffee Roasters</span>
                           <span className="text-xs text-surface-400 font-mono">Term #CR-8492</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-b border-surface-800/50 pb-4">
                        <span className="text-surface-500 text-sm">Date</span>
                        <span className="font-medium text-white text-sm">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>

                      <div className="flex justify-between items-center border-b border-surface-800/50 pb-4">
                        <span className="text-surface-500 text-sm">SpaceCard ID</span>
                        <span className="font-mono text-sm text-white bg-surface-800/50 px-2 py-1 rounded-md">$jules</span>
                      </div>

                      <div className="flex justify-between items-center pb-2">
                        <span className="text-surface-500 text-sm">Ref</span>
                        <span className="font-mono text-xs text-surface-400 uppercase tracking-wider">SC-{refCode}</span>
                      </div>
                    </div>

                    {/* Live Trust Element */}
                    <div className="mt-auto pt-6">
                      <div className="flex justify-between items-center bg-surface-900/50 p-4 rounded-2xl border border-surface-800/50">
                        <div className="flex items-center gap-2.5 text-surface-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] uppercase tracking-widest font-bold">Live Status</span>
                        </div>
                        <span className="font-mono text-xs font-medium text-emerald-400">{currentTime}</span>
                      </div>
                    </div>

                 </div>
              </div>

              <div className="mt-6">
                <Link href="/" className="block w-full">
                  <Button variant="secondary" className="w-full h-14 font-medium">Done</Button>
                </Link>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}