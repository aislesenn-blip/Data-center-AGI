"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { TrustBadge } from "@/components/ui/TrustBadge"

export default function AccountDetailsPage() {
  const router = useRouter()
  const [phone, setPhone] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length >= 9) {
      router.push("/onboarding/verify")
    }
  }

  return (
    <div className="flex min-h-full flex-col p-6">
      <div className="mb-8 mt-4 flex items-center justify-between">
        <div className="h-2 w-1/3 rounded-full bg-corporate-green" />
        <div className="h-2 w-1/3 ml-2 rounded-full bg-border" />
        <div className="h-2 w-1/3 ml-2 rounded-full bg-border" />
      </div>

      <div className="mb-10 space-y-2">
        <TrustBadge message="Step 1 of 3: Parent Identity" />
        <h1 className="text-2xl font-bold text-foreground">Create your secure account</h1>
        <p className="text-charcoal/80">We require parent verification to ensure platform security.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
        <div className="space-y-6 flex-1">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-charcoal">Parent Full Name</label>
            <Input placeholder="Enter your legal name" required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-charcoal">Phone Number</label>
            <Input
              type="tel"
              placeholder="e.g. 0712 345 678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="rounded-xl bg-corporate-green/5 p-4 flex items-start space-x-3">
            <Shield className="h-5 w-5 text-corporate-green shrink-0 mt-0.5" />
            <p className="text-xs text-corporate-green/90 leading-relaxed">
              Your details are encrypted and securely stored. We use bank-grade security to protect your family&apos;s identity.
            </p>
          </div>
        </div>

        <div className="pt-8 pb-4">
          <Button type="submit" size="lg" className="w-full flex items-center justify-center gap-2" disabled={phone.length < 9}>
            Continue Securely <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  )
}
