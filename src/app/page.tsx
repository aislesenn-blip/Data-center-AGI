"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { ShieldCheck } from "lucide-react"

export default function WelcomePage() {
  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Premium Minimalist Header */}
      <div className="pt-16 pb-8 px-8">
        <div className="w-12 h-12 bg-corporate-green rounded-xl flex items-center justify-center mb-8 shadow-sm">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Core Value Proposition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 px-8 flex flex-col justify-center pb-20"
      >
        <h1 className="text-4xl font-semibold tracking-tight text-charcoal mb-4">
          Secure Their<br />Future.
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-[280px]">
          The institutional platform for parents to build and protect their children&apos;s financial legacy.
        </p>

        {/* Trust Indicators */}
        <div className="mt-12 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-corporate-green" />
            <span className="text-sm font-medium text-gray-600">Bank-grade Security</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-corporate-green" />
            <span className="text-sm font-medium text-gray-600">Immutable Records</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-corporate-green" />
            <span className="text-sm font-medium text-gray-600">Long-term Value Preservation</span>
          </div>
        </div>
      </motion.div>

      {/* Sticky Bottom Action */}
      <div className="px-8 pb-[calc(2rem+env(safe-area-inset-bottom))]">
        <Link href="/dashboard" className="block w-full">
          <Button variant="primary">
            Create Parent Account
          </Button>
        </Link>
        <p className="text-center mt-6 text-sm text-gray-400 font-medium">
          Already have an account? <button className="text-corporate-green hover:underline">Sign in</button>
        </p>
      </div>
    </div>
  )
}
