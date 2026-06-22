"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ChevronRight, ShieldCheck } from "lucide-react"
import { TrustBadge } from "@/components/ui/TrustBadge"

// Mock data
const children = [
  { id: "c1", name: "Elias", value: "TZS 750,000" },
  { id: "c2", name: "Sofia", value: "TZS 500,000" }
]

export default function DepositSelectionPage() {
  const router = useRouter()

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

      <div className="px-6 py-4 flex-1">
        <div className="mb-8 space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Select Destination</h1>
          <p className="text-charcoal/80">Choose the Digital Card to secure funds.</p>
        </div>

        <div className="space-y-4">
          {children.map((child) => (
            <Link key={child.id} href={`/deposit/${child.id}`}>
              <div className="bg-white border border-border p-5 rounded-2xl flex items-center shadow-sm hover:border-corporate-green/50 hover:shadow-md transition-all group">
                <div className="h-12 w-12 rounded-full bg-corporate-green/10 flex items-center justify-center text-corporate-green font-bold text-lg mr-4 group-hover:bg-corporate-green group-hover:text-white transition-colors">
                  {child.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-foreground">{child.name}</h3>
                  <div className="flex items-center text-xs text-charcoal/60 mt-1">
                    <ShieldCheck className="h-3 w-3 mr-1 text-corporate-green" /> Digital Card
                  </div>
                </div>
                <div className="text-right flex items-center">
                  <ChevronRight className="h-5 w-5 text-charcoal/40 group-hover:text-corporate-green transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-corporate-green/5 rounded-xl p-5 border border-corporate-green/10 flex items-start space-x-4">
           <ShieldCheck className="h-6 w-6 text-corporate-green shrink-0 mt-0.5" />
           <p className="text-sm text-corporate-green/90 leading-relaxed">
             All deposits are secured by institutional-grade encryption and strictly allocated to the chosen child&apos;s long-term digital identity.
           </p>
        </div>
      </div>
    </div>
  )
}
