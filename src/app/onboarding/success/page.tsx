"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { TrustBadge } from "@/components/ui/TrustBadge"

function SuccessContent() {
  const searchParams = useSearchParams()
  const childName = searchParams.get("name") || "Your Child"

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

      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Future Secured
        </h1>
        <p className="text-lg text-charcoal/80">
          The Digital Card for <span className="font-semibold text-foreground">{childName}</span> has been successfully created and secured.
        </p>
      </div>

      <div className="bg-soft-gray border border-border rounded-xl p-5 w-full text-left space-y-3">
        <p className="text-sm font-semibold text-charcoal uppercase tracking-wider">Platform Guarantee</p>
        <p className="text-sm text-charcoal/80 leading-relaxed">
          Funds allocated to this Digital Card are intended for the child&apos;s future. This is a long-term value preservation asset, protected by institutional security.
        </p>
      </div>

      <TrustBadge message="Account Activated" />
    </div>
  )
}

export default function SuccessPage() {
  return (
    <div className="flex min-h-full flex-col p-6">
      <div className="mb-8 mt-4 flex items-center justify-between">
        <div className="h-2 w-full rounded-full bg-corporate-green" />
      </div>

      <Suspense fallback={
        <div className="flex flex-1 items-center justify-center">
           <div className="w-8 h-8 rounded-full border-4 border-corporate-green border-t-transparent animate-spin" />
        </div>
      }>
        <SuccessContent />
      </Suspense>

      <div className="pt-8 pb-4">
        <Button asChild size="lg" className="w-full flex items-center justify-center gap-2">
          <Link href="/dashboard">
            Enter Dashboard <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
