"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { TrustBadge } from "@/components/ui/TrustBadge"

export default function DepositAmountPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [amount, setAmount] = useState("")

  // Simple formatting for display
  const formatAmount = (val: string) => {
    const num = val.replace(/\D/g, "")
    if (!num) return ""
    return new Intl.NumberFormat("en-TZ").format(parseInt(num, 10))
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "")
    setAmount(raw)
  }

  const handleContinue = () => {
    if (parseInt(amount) >= 1000) {
      router.push(`/deposit/${id}/confirm?amount=${amount}`)
    }
  }

  // Pre-defined quick amounts
  const quickAmounts = ["5000", "10000", "25000", "50000"]

  return (
    <div className="flex flex-col min-h-full pb-[env(safe-area-inset-bottom)] bg-soft-gray">
      {/* Header */}
      <header className="px-6 pt-6 pb-4 flex items-center justify-between z-10 sticky top-0 bg-soft-gray/90 backdrop-blur-sm">
        <button
          onClick={() => router.back()}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-border text-charcoal hover:bg-soft-gray transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <TrustBadge message="Secure Deposit" variant="minimal" className="bg-white border border-border" />
        <div className="h-10 w-10" />
      </header>

      <div className="px-6 flex-1 flex flex-col pt-4">
        <div className="text-center space-y-2 mb-10">
          <p className="text-sm font-semibold text-charcoal uppercase tracking-wider">Amount to Secure</p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-start space-y-10">
          <div className="relative w-full flex items-center justify-center">
            <span className="text-3xl font-bold text-charcoal/60 mr-2 pb-1">TZS</span>
            <input
              type="tel"
              className="w-full max-w-[200px] text-5xl font-bold bg-transparent outline-none placeholder-charcoal/30 text-foreground transition-all"
              placeholder="0"
              value={formatAmount(amount)}
              onChange={handleAmountChange}
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(amt)}
                className="py-3 px-4 bg-white border border-border rounded-xl font-semibold text-charcoal hover:border-corporate-green hover:text-corporate-green transition-colors shadow-sm"
              >
                TZS {formatAmount(amt)}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-8 pb-4">
          <Button
            onClick={handleContinue}
            size="lg"
            className="w-full flex items-center justify-center gap-2"
            disabled={!amount || parseInt(amount) < 1000}
          >
            Review Deposit <ArrowRight className="h-5 w-5" />
          </Button>
          <p className="text-center text-xs text-charcoal/60 mt-4">Minimum deposit: TZS 1,000</p>
        </div>
      </div>
    </div>
  )
}
