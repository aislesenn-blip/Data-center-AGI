"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { ArrowRight, Fingerprint } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "pin">("phone")
  const [phone, setPhone] = useState("")
  const [pin, setPin] = useState("")
  const router = useRouter()

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length >= 9) {
      setStep("pin")
    }
  }

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin.length === 4) {
      router.push("/")
    }
  }

  return (
    <div className="flex flex-col h-full bg-black px-6">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="mb-12">
          <div className="w-16 h-16 bg-surface-900 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-surface-800">
            <span className="font-bold text-2xl tracking-tighter">SC</span>
          </div>
          <h1 className="text-3xl font-medium tracking-tight mb-2">Welcome back.</h1>
          <p className="text-surface-400">Enter your details to access your SpaceCard.</p>
        </div>

        <AnimatePresence mode="wait">
          {step === "phone" && (
            <motion.form
              key="phone"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handlePhoneSubmit}
              className="space-y-6"
            >
              <div>
                <label className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-2 block">Phone Number</label>
                <div className="relative flex items-center h-14 bg-surface-900 border border-surface-600 rounded-xl focus-within:border-brand focus-within:ring-1 focus-within:ring-brand transition-colors overflow-hidden">
                  <span className="pl-4 pr-2 text-surface-400 font-medium">+255</span>
                  <input
                    autoFocus
                    type="tel"
                    inputMode="numeric"
                    placeholder="712 345 678"
                    className="w-full h-full bg-transparent text-lg text-foreground outline-none"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-14 text-base"
                disabled={phone.length < 9}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.form>
          )}

          {step === "pin" && (
            <motion.form
              key="pin"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handlePinSubmit}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-surface-900 flex items-center justify-center border border-surface-600">
                  <span className="text-surface-400 text-xs font-medium">+255</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{phone.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')}</span>
                  <button type="button" onClick={() => setStep("phone")} className="text-xs text-surface-400 text-left hover:text-foreground">Not you?</button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-2 block">Enter SpaceCard PIN</label>

                {/*
                  IMPORTANT: This is the ONLY place PIN is used now, per user request.
                  Using a robust hidden input pattern for mobile PIN entry.
                */}
                <div className="relative h-16 bg-surface-900 border border-surface-600 rounded-xl overflow-hidden focus-within:border-brand focus-within:ring-1 focus-within:ring-brand">
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
                         // Auto submit for fast UX
                         setTimeout(() => router.push("/"), 150)
                      }
                    }}
                  />

                  {/* Visual Dots */}
                  <div className="absolute inset-0 flex items-center justify-center gap-6 pointer-events-none">
                    {[0, 1, 2, 3].map((index) => (
                      <div
                        key={index}
                        className={`w-4 h-4 rounded-full transition-all duration-200 ${
                          pin.length > index
                            ? "bg-foreground scale-100"
                            : "bg-surface-600 scale-75"
                        } ${
                          pin.length === index ? "ring-2 ring-foreground/20 ring-offset-2 ring-offset-surface-900" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-14 text-base mt-8"
                disabled={pin.length < 4}
              >
                Sign In
              </Button>

              <div className="pt-6 flex justify-center">
                 <button type="button" className="flex items-center gap-2 text-surface-400 hover:text-foreground transition-colors">
                    <Fingerprint className="w-5 h-5" />
                    <span className="text-sm font-medium">Use Biometrics</span>
                 </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <div className="pb-[env(safe-area-inset-bottom,2rem)] text-center pt-8">
        <p className="text-sm text-surface-400">
          New to SpaceCard? <Link href="/onboarding" className="text-foreground font-medium hover:underline">Create account</Link>
        </p>
      </div>
    </div>
  )
}
