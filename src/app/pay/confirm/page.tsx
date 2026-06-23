"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { NetworkLogo } from "@/components/ui/NetworkLogo"

export default function ConfirmationPage() {

  return (
    <div className="flex flex-col min-h-full bg-navy-blue text-electric-white selection:bg-white/20">

      <header className="px-6 py-6 flex justify-center">
        <NetworkLogo variant="light" />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-6">

        <motion.div
          className="bg-electric-white text-midnight-black rounded-sm w-full max-w-sm p-8 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-subtle-gold" />

          <div className="flex flex-col items-center text-center space-y-6">
            <div className="h-16 w-16 bg-navy-blue rounded-full flex items-center justify-center shadow-lg">
              <Check className="h-8 w-8 text-electric-white" />
            </div>

            <div className="space-y-1 w-full border-b border-border pb-6">
              <p className="text-xs font-bold text-slate uppercase tracking-widest">Authorized</p>
              <h1 className="text-4xl font-black text-midnight-black">TZS 25,000</h1>
            </div>

            <div className="w-full space-y-4 pt-2 text-left">
               <div className="flex justify-between items-center">
                 <span className="text-xs font-bold text-slate uppercase tracking-wider">Target Node</span>
                 <span className="text-sm font-bold text-midnight-black">Shoppers Cafe</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-xs font-bold text-slate uppercase tracking-wider">Network Ref</span>
                 <span className="text-xs font-mono font-bold text-midnight-black">NTW-8930-112</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-xs font-bold text-slate uppercase tracking-wider">Time</span>
                 <span className="text-sm font-bold text-midnight-black">
                   {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                 </span>
               </div>
            </div>
          </div>

        </motion.div>

        <motion.div
          className="mt-12 w-full max-w-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Button asChild variant="outline" size="lg" className="w-full h-16 border-white/20 text-electric-white hover:bg-white/10 hover:text-white uppercase tracking-wide">
            <Link href="/">
              Return to Network <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </motion.div>

      </div>
    </div>
  )
}
