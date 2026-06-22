"use client"

import { use, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { TrustBadge } from "@/components/ui/TrustBadge"

function SuccessContent({ id }: { id: string }) {
  const searchParams = useSearchParams()
  const amountStr = searchParams.get("amount") || "0"
  const amount = parseInt(amountStr, 10)

  const formattedAmount = new Intl.NumberFormat("en-TZ").format(amount)
  const childName = id === "c2" ? "Sofia" : "Elias"

  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  const refNum = `SEC-894321` // Static for preview rendering stability

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center space-y-8 w-full max-w-sm mx-auto">
      <div className="relative">
        <div className="h-24 w-24 rounded-full bg-corporate-green/10 flex items-center justify-center">
          <CheckCircle2 className="h-12 w-12 text-corporate-green" />
        </div>
        <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm">
          <ShieldCheck className="h-5 w-5 text-corporate-green" />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Deposit Secured
        </h1>
        <p className="text-lg text-charcoal/80">
          Successfully added to {childName}&apos;s Digital Card.
        </p>
      </div>

      <div className="bg-white border border-border rounded-2xl p-6 w-full text-left space-y-4 shadow-sm relative overflow-hidden">
        {/* Receipt stylings */}
        <div className="absolute top-0 left-0 w-full h-1 flex space-x-1 px-1">
           {Array.from({length: 20}).map((_, i) => (
             <div key={i} className="flex-1 bg-soft-gray rounded-b-full h-full" />
           ))}
        </div>

        <div className="text-center pb-2 border-b border-dashed border-border mt-2">
           <p className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-1">Amount Added</p>
           <h2 className="text-3xl font-bold text-corporate-green">TZS {formattedAmount}</h2>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex justify-between text-sm">
            <span className="text-charcoal/80">Date</span>
            <span className="font-semibold text-foreground">{dateStr}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-charcoal/80">Time</span>
            <span className="font-semibold text-foreground">{timeStr}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-charcoal/80">Reference</span>
            <span className="font-mono text-xs font-semibold text-foreground tracking-wider">{refNum}</span>
          </div>
        </div>
      </div>

      <TrustBadge message="Transaction Protected" />
    </div>
  )
}

export default function DepositSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <div className="flex min-h-full flex-col p-6 bg-soft-gray">
      <Suspense fallback={
        <div className="flex flex-1 items-center justify-center">
           <div className="w-8 h-8 rounded-full border-4 border-corporate-green border-t-transparent animate-spin" />
        </div>
      }>
        <SuccessContent id={id} />
      </Suspense>

      <div className="pt-8 pb-4 space-y-3">
        <Button asChild size="lg" className="w-full flex items-center justify-center gap-2">
          <Link href={`/card/${id}`}>
            View Digital Card <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full">
          <Link href="/dashboard">
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  )
}
