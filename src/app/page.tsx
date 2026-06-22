"use client"

import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { TrustBadge } from "@/components/ui/TrustBadge"

export default function WelcomePage() {
  return (
    <div className="flex min-h-full flex-col p-6">
      <div className="flex flex-1 flex-col items-center justify-center text-center space-y-8">
        <div className="h-24 w-24 rounded-3xl bg-corporate-green flex items-center justify-center shadow-lg shadow-corporate-green/20">
          <ShieldCheck className="h-12 w-12 text-white" />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Secure their future.
          </h1>
          <p className="text-lg text-charcoal/80 max-w-xs mx-auto">
            The institutional digital card platform built specifically for your child&apos;s long-term financial identity.
          </p>
        </div>

        <TrustBadge variant="hero" message="Bank-Grade Security" className="pt-8" />
      </div>

      <div className="space-y-4 pt-8 pb-4">
        <Button asChild size="lg" className="w-full">
          <Link href="/onboarding/account">
            Create Parent Account
          </Link>
        </Button>
        <div className="text-center">
          <span className="text-sm text-charcoal/60">Already registered? </span>
          <Link href="/login" className="text-sm font-semibold text-corporate-green">
            Log in securely
          </Link>
        </div>
      </div>
    </div>
  )
}
