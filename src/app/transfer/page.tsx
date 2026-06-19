"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function TransferPage() {
  const [handle, setHandle] = useState("")
  const [amount, setAmount] = useState("")
  const [step, setStep] = useState<"recipient" | "amount" | "success">("recipient")

  return (
    <div className="flex flex-col min-h-screen px-6 pt-12 pb-8">
      {step !== "success" && (
        <header className="flex items-center mb-12">
          <Link href="/">
            <button className="w-10 h-10 rounded-full bg-surface-900 border border-surface-800 flex items-center justify-center hover:bg-surface-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
        </header>
      )}

      <AnimatePresence mode="wait">
        {step === "recipient" && (
          <motion.div
            key="recipient"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1">
              <h1 className="text-3xl font-medium tracking-tight mb-2">Send money</h1>
              <p className="text-surface-400 mb-8">Enter a SpaceCard handle.</p>

              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-surface-400 text-lg">$</span>
                <Input
                  autoFocus
                  className="pl-10 text-xl font-mono tracking-wide"
                  placeholder="handle"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))}
                />
              </div>
            </div>

            <Button
              className="w-full"
              disabled={handle.length < 2}
              onClick={() => setStep("amount")}
            >
              Continue
            </Button>
          </motion.div>
        )}

        {step === "amount" && (
          <motion.div
            key="amount"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 flex flex-col items-center justify-center -mt-20">
              <div className="w-16 h-16 rounded-3xl bg-surface-900 border border-surface-800 flex items-center justify-center mb-6">
                <span className="font-mono text-xl">${handle.slice(0, 2).toUpperCase()}</span>
              </div>
              <p className="text-surface-400 font-mono mb-8">${handle}</p>

              <div className="flex items-center justify-center text-6xl font-medium tracking-tighter">
                <span className="text-surface-500 mr-1">$</span>
                <input
                  autoFocus
                  type="number"
                  placeholder="0.00"
                  className="bg-transparent outline-none w-[200px] text-center"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <Button
              className="w-full"
              disabled={!amount || parseFloat(amount) <= 0}
              onClick={() => setStep("success")}
            >
              Send ${amount || "0"}
            </Button>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              <Check className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-medium tracking-tight mb-2">Sent successfully</h1>
            <p className="text-surface-400 text-lg">
              ${amount} has been sent to ${handle}.
            </p>

            <div className="absolute bottom-8 left-6 right-6">
              <Link href="/">
                <Button variant="secondary" className="w-full">Done</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}