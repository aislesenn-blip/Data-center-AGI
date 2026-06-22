"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"

function GeneratingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const childName = searchParams.get("name") || "Child"
  const [step, setStep] = useState(0)

  useEffect(() => {
    const steps = [
      setTimeout(() => setStep(1), 1500),
      setTimeout(() => setStep(2), 3000),
      setTimeout(() => router.push(`/onboarding/success?name=${encodeURIComponent(childName)}`), 4500)
    ]

    return () => steps.forEach(clearTimeout)
  }, [router, childName])

  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-12 w-full max-w-sm mx-auto">
      <div className="relative h-48 w-full max-w-[280px]">
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-corporate-green to-corporate-green-dark shadow-2xl flex flex-col justify-between p-6 overflow-hidden"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Card UI Details - Simplified for generation effect */}
          <div className="flex justify-between items-start z-10">
            <ShieldCheck className="text-white/80 h-8 w-8" />
            <div className="w-12 h-8 rounded bg-white/20" />
          </div>

          <motion.div
            className="z-10 space-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Digital Identity</p>
            <p className="text-white font-semibold text-lg tracking-wide">{childName}</p>
          </motion.div>

          {/* Abstract background pattern */}
          <div className="absolute right-[-20%] bottom-[-20%] w-64 h-64 rounded-full border-[20px] border-white/5" />
          <div className="absolute left-[-10%] top-[-10%] w-32 h-32 rounded-full border-[10px] border-white/5" />
        </motion.div>
      </div>

      <div className="space-y-4 text-center">
        <h2 className="text-xl font-bold text-foreground">
          {step === 0 && "Initializing Identity..."}
          {step === 1 && "Securing Asset..."}
          {step === 2 && "Finalizing Card..."}
        </h2>
        <p className="text-sm text-charcoal/60">
          Applying bank-grade encryption to secure your child&apos;s future.
        </p>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-corporate-green"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: step >= i ? 1 : 0.2 }}
          />
        ))}
      </div>
    </div>
  )
}

export default function GeneratingPage() {
  return (
    <div className="flex min-h-full flex-col p-6 items-center">
      <Suspense fallback={
        <div className="flex flex-1 items-center justify-center">
           <div className="w-8 h-8 rounded-full border-4 border-corporate-green border-t-transparent animate-spin" />
        </div>
      }>
        <GeneratingContent />
      </Suspense>
    </div>
  )
}
