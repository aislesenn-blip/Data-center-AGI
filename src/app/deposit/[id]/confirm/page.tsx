"use client"

import { use, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { TrustBadge } from "@/components/ui/TrustBadge"

export default function DepositConfirmPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const searchParams = useSearchParams()
  const amountStr = searchParams.get("amount") || "0"
  const amount = parseInt(amountStr, 10)

  const [isProcessing, setIsProcessing] = useState(false)

  const formattedAmount = new Intl.NumberFormat("en-TZ").format(amount)

  // Mock child name based on id
  const childName = id === "c2" ? "Sofia" : "Elias"

  const handleConfirm = () => {
    setIsProcessing(true)
    // Simulate secure processing delay
    setTimeout(() => {
      router.push(`/deposit/${id}/success?amount=${amountStr}`)
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-full pb-[env(safe-area-inset-bottom)] bg-soft-gray">
      {/* Header */}
      <header className="px-6 pt-6 pb-4 flex items-center justify-between z-10 sticky top-0 bg-soft-gray/90 backdrop-blur-sm">
        <button
          onClick={() => !isProcessing && router.back()}
          disabled={isProcessing}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-border text-charcoal hover:bg-soft-gray transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <TrustBadge message="Review & Confirm" variant="minimal" className="bg-white border border-border" />
        <div className="h-10 w-10" />
      </header>

      <div className="px-6 flex-1 flex flex-col pt-4">

        <div className="bg-white rounded-3xl p-8 border border-border shadow-sm mb-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-corporate-green/5 rounded-bl-full pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <div className="text-center space-y-1">
              <p className="text-sm font-semibold text-charcoal uppercase tracking-wider">Total Amount</p>
              <h2 className="text-4xl font-bold tracking-tight text-foreground">TZS {formattedAmount}</h2>
            </div>

            <div className="h-px w-full bg-border" />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-charcoal">Destination</span>
                <span className="text-sm font-bold text-foreground flex items-center">
                   {childName}&apos;s Digital Card
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-charcoal">Fee</span>
                <span className="text-sm font-bold text-corporate-green">TZS 0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-charcoal">Processing</span>
                <span className="text-sm font-bold text-foreground">Instant</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-corporate-green/5 rounded-xl p-4 flex items-start space-x-3 border border-corporate-green/10 mb-auto">
           <Lock className="h-5 w-5 text-corporate-green shrink-0 mt-0.5" />
           <p className="text-xs text-corporate-green/90 leading-relaxed">
             By confirming, you authorize a secure transfer of TZS {formattedAmount} to the designated long-term asset.
           </p>
        </div>

        <div className="pt-8 pb-4 space-y-4">
          <Button
            onClick={handleConfirm}
            size="lg"
            className="w-full flex items-center justify-center relative"
            disabled={isProcessing}
          >
            {isProcessing ? (
               <span className="flex items-center">
                 <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin mr-2" />
                 Securing Transfer...
               </span>
            ) : (
               <span className="flex items-center">
                 <ShieldCheck className="h-5 w-5 mr-2" />
                 Confirm Secure Deposit
               </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
