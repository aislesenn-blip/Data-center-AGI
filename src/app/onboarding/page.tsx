"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { ArrowRight, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export default function OnboardingPage() {
  const [step, setStep] = useState<"phone" | "verify" | "profile" | "pin">("phone")
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [handle, setHandle] = useState("")
  const [pin, setPin] = useState("")
  const router = useRouter()

  return (
    <div className="flex flex-col h-full bg-black px-6 pt-12 pb-[env(safe-area-inset-bottom,2rem)]">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-12">
         {["phone", "verify", "profile", "pin"].map((s, i) => {
           const steps = ["phone", "verify", "profile", "pin"]
           const currentIndex = steps.indexOf(step)
           const isActive = i <= currentIndex
           return (
             <div key={s} className={`h-1 flex-1 rounded-full ${isActive ? 'bg-white' : 'bg-surface-800'}`} />
           )
         })}
      </div>

      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full">
        <AnimatePresence mode="wait">
          {step === "phone" && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <div className="mb-10">
                <h1 className="text-3xl font-medium tracking-tight mb-2">Join SpaceCard.</h1>
                <p className="text-surface-400">Enter your phone number to start.</p>
              </div>

              <div className="flex-1">
                <label className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-2 block">Phone Number</label>
                <div className="relative flex items-center h-14 bg-surface-900/50 border border-surface-800 rounded-xl focus-within:border-surface-600 transition-colors">
                  <span className="pl-4 pr-2 text-surface-500 font-medium">+255</span>
                  <input
                    autoFocus
                    type="tel"
                    inputMode="numeric"
                    placeholder="712 345 678"
                    className="w-full h-full bg-transparent text-lg text-white outline-none"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                  />
                </div>
              </div>

              <Button
                className="w-full h-14 text-base"
                disabled={phone.length < 9}
                onClick={() => setStep("verify")}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}

          {step === "verify" && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <div className="mb-10">
                <h1 className="text-3xl font-medium tracking-tight mb-2">Verify phone.</h1>
                <p className="text-surface-400">We sent a 6-digit code to +255 {phone.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')}</p>
              </div>

              <div className="flex-1">
                <label className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-2 block">SMS Code</label>
                <input
                  autoFocus
                  type="number"
                  inputMode="numeric"
                  placeholder="000000"
                  className="w-full h-14 bg-surface-900/50 border border-surface-800 rounded-xl px-4 text-2xl tracking-[0.5em] font-mono text-center text-white outline-none focus:border-surface-600 transition-colors"
                  value={code}
                  onChange={(e) => {
                    const val = e.target.value.slice(0, 6)
                    setCode(val)
                    if (val.length === 6) setTimeout(() => setStep("profile"), 300)
                  }}
                />
              </div>

              <Button
                className="w-full h-14 text-base"
                disabled={code.length < 6}
                onClick={() => setStep("profile")}
              >
                Verify Code
              </Button>
            </motion.div>
          )}

          {step === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <div className="mb-10">
                <h1 className="text-3xl font-medium tracking-tight mb-2">Claim your handle.</h1>
                <p className="text-surface-400">This is how friends will find and pay you.</p>
              </div>

              <div className="flex-1">
                <label className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-2 block">SpaceCard ID</label>
                <div className="relative flex items-center h-14 bg-surface-900/50 border border-surface-800 rounded-xl focus-within:border-surface-600 transition-colors">
                  <span className="pl-4 pr-1 text-surface-500 font-medium text-xl">$</span>
                  <input
                    autoFocus
                    type="text"
                    placeholder="jules"
                    className="w-full h-full bg-transparent text-xl text-white outline-none lowercase"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                  />
                  {handle.length > 2 && (
                    <div className="pr-4">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-surface-500 mt-3">Handles must be unique and alphanumeric.</p>
              </div>

              <Button
                className="w-full h-14 text-base"
                disabled={handle.length < 3}
                onClick={() => setStep("pin")}
              >
                Claim $ {handle}
              </Button>
            </motion.div>
          )}

          {step === "pin" && (
            <motion.div
              key="pin"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <div className="mb-10">
                <h1 className="text-3xl font-medium tracking-tight mb-2">Secure account.</h1>
                <p className="text-surface-400">Create a 4-digit PIN for logging in to your SpaceCard.</p>
              </div>

              <div className="flex-1">
                <label className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-2 block">Create PIN</label>
                <div className="relative h-16 bg-surface-900/50 border border-surface-800 rounded-xl overflow-hidden focus-within:border-surface-600">
                  <input
                    autoFocus
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={4}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-text z-10"
                    value={pin}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '')
                      setPin(val)
                      if (val.length === 4) {
                         setTimeout(() => router.push("/"), 500)
                      }
                    }}
                  />

                  <div className="absolute inset-0 flex items-center justify-center gap-6 pointer-events-none">
                    {[0, 1, 2, 3].map((index) => (
                      <div
                        key={index}
                        className={`w-4 h-4 rounded-full transition-all duration-200 ${
                          pin.length > index
                            ? "bg-white scale-100"
                            : "bg-surface-800 scale-75"
                        } ${
                          pin.length === index ? "ring-2 ring-white/20 ring-offset-2 ring-offset-surface-900" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <Button
                className="w-full h-14 text-base"
                disabled={pin.length < 4}
                onClick={() => router.push("/")}
              >
                Complete Setup
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
