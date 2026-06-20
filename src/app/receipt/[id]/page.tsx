"use client"

import * as React from "react"
import { Button } from "@/components/ui/Button"
import { Check, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ReceiptPage() {
  const params = useParams()
  const txId = params?.id as string

  // Mock data for the historical receipt
  const isDeposit = txId === "deposit-1"
  const amount = isDeposit ? 45000 : 12500
  const partner = isDeposit ? "$alex" : "Work Cafe"
  const refCode = "SC-849201" // Use static ref code to avoid hydration/render issues

  return (
    <div className="flex flex-col h-full bg-background px-6">
      <header className="flex items-center justify-between pt-12 pb-6">
        <Link href="/">
          <button className="w-10 h-10 rounded-full bg-surface-900 border border-surface-800 flex items-center justify-center hover:bg-surface-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
        </Link>
        <div className="flex-1" />
      </header>

      <div className="flex-1 flex flex-col overflow-hidden pb-6">
        <div className="flex-1 flex flex-col relative w-full bg-surface-950 border border-surface-800 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="bg-surface-900/80 px-8 py-6 flex justify-between items-center border-b border-surface-800">
              <div className="flex flex-col">
                 <span className="text-[10px] text-surface-400 font-bold uppercase tracking-widest mb-1">SpaceCard Network</span>
                 <span className="text-sm font-medium">Historical Receipt</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center shadow-[0_0_15px_rgba(0,168,132,0.3)]">
                 <Check className="w-5 h-5 text-brand-foreground stroke-[3]" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-8 hide-scrollbar">
               <div className="flex flex-col items-center mb-10">
                 <p className="text-surface-400 text-sm font-medium uppercase tracking-widest mb-3">Amount</p>
                 <div className="flex items-baseline justify-center">
                    <span className="text-surface-400 text-2xl font-medium mr-2">TZS</span>
                    <h1 className="text-5xl font-medium tracking-tighter text-foreground">{amount.toLocaleString()}</h1>
                 </div>
               </div>

               <div className="w-full space-y-6">
                 <div className="flex justify-between items-start border-b border-surface-800 pb-4">
                   <span className="text-surface-400 text-sm">{isDeposit ? "From" : "Partner"}</span>
                   <div className="text-right">
                      <span className="font-medium text-foreground block">{partner}</span>
                   </div>
                 </div>

                 <div className="flex justify-between items-center border-b border-surface-800 pb-4">
                   <span className="text-surface-400 text-sm">Date</span>
                   <span className="font-medium text-foreground">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                 </div>

                 <div className="flex justify-between items-center border-b border-surface-800 pb-4">
                   <span className="text-surface-400 text-sm">SpaceCard ID</span>
                   <span className="font-mono text-sm text-foreground bg-surface-900 px-2 py-1 rounded">$jules</span>
                 </div>

                 <div className="flex justify-between items-center border-b border-surface-800 pb-4">
                   <span className="text-surface-400 text-sm">Ref</span>
                   <span className="font-mono text-xs text-surface-400 uppercase tracking-wider">{refCode}</span>
                 </div>
               </div>
            </div>
         </div>
         <div className="pt-6 pb-[env(safe-area-inset-bottom)] flex gap-4">
           <Button variant="outline" className="flex-1 flex gap-2">
             <Download className="w-4 h-4" />
             Export
           </Button>
           <Button variant="secondary" className="flex-1">
             Report Issue
           </Button>
         </div>
      </div>
    </div>
  )
}
