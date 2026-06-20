"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, Loader2, Check, SmartphoneNfc } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function PartnerSetupPage() {
  const [step, setStep] = useState<"intro" | "scanning" | "processing" | "success">("intro")
  const [terminalId] = useState("#CR-8492")

  const handleStartScan = () => {
    setStep("scanning")
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {(step === "intro" || step === "scanning") && (
        <header className="flex items-center justify-between px-6 pt-12 pb-6">
          <Link href="/partner">
            <button className="w-10 h-10 rounded-full bg-surface-900 border border-surface-800 flex items-center justify-center hover:bg-surface-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
          </Link>
          <div className="flex-1" />
        </header>
      )}

      <AnimatePresence mode="wait">
        {step === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 overflow-y-auto px-6 hide-scrollbar pb-[calc(2rem+env(safe-area-inset-bottom))] flex flex-col justify-center items-center text-center">
              <div className="w-24 h-24 bg-surface-900 border border-surface-800 rounded-full flex items-center justify-center mb-8">
                <SmartphoneNfc className="w-10 h-10 text-brand" />
              </div>
              <h1 className="text-2xl font-medium tracking-tight mb-2 text-foreground">Provision NFC Tag</h1>
              <p className="text-surface-400 text-sm mb-8 max-w-[260px]">
                Link a new physical SpaceCard NFC tag to this terminal.
              </p>

              <div className="bg-surface-800 border border-surface-600 rounded-2xl p-5 mb-8 w-full max-w-xs text-left">
                <p className="text-xs text-surface-400 uppercase tracking-wider mb-1">Target Terminal</p>
                <p className="text-lg font-mono text-foreground">{terminalId}</p>
              </div>

              <div className="w-full pt-4">
                <Button
                  className="w-full h-14 text-base"
                  onClick={handleStartScan}
                >
                  Start Scanning
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {step === "scanning" && (
          <motion.div
            key="scanning"
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
                className="w-48 h-48 rounded-full bg-brand/20"
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
                className="absolute w-48 h-48 rounded-full bg-brand/20"
              />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-surface-900 border border-surface-800 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,168,132,0.15)] relative">
                 <SmartphoneNfc className="w-10 h-10 text-brand animate-pulse" />
              </div>
              <h2 className="text-2xl font-medium tracking-tight mb-2 text-foreground">Ready to Scan</h2>
              <p className="text-surface-400 text-center max-w-[250px]">
                Hold the blank NFC tag near the top of your phone.
              </p>

              {/* HIDDEN BUTTON TO TRIGGER PROCESSING FOR TESTING / SIMULATION */}
              <button
                onClick={() => {
                   setStep("processing")
                   setTimeout(() => setStep("success"), 2000)
                }}
                className="mt-12 text-surface-600 text-xs uppercase tracking-widest font-bold hover:text-surface-400 transition-colors"
              >
                (Simulate Scan)
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
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <Loader2 className="w-12 h-12 animate-spin text-brand mb-6" />
            <p className="text-surface-400 font-medium animate-pulse">Writing secure payload...</p>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 flex flex-col items-center justify-center">
               <div className="w-24 h-24 rounded-full bg-brand text-brand-foreground flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(0,168,132,0.2)]">
                <Check className="w-10 h-10" />
              </div>
              <h1 className="text-3xl font-medium tracking-tight mb-2 text-foreground">Tag Provisioned</h1>
              <p className="text-surface-400 text-lg text-center px-6">
                This NFC tag is now securely linked to Terminal {terminalId}.
              </p>
            </div>

            <Link href="/partner" className="w-full pt-6 px-6 pb-[env(safe-area-inset-bottom,2rem)]">
              <Button variant="secondary" className="w-full h-16 text-lg">Done</Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
