"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck } from "lucide-react"
import { PinInput } from "@/components/ui/PinInput"
import { TrustBadge } from "@/components/ui/TrustBadge"

export default function VerifyPage() {
  const router = useRouter()
  const [pin, setPin] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  const handleComplete = (value: string) => {
    if (value.length === 4) {
      setIsVerifying(true)
      // Simulate verification delay for trust building
      setTimeout(() => {
        router.push("/onboarding/child/details")
      }, 1500)
    }
  }

  return (
    <div className="flex min-h-full flex-col p-6 items-center">
      <div className="w-full mb-8 mt-4 flex items-center justify-between">
        <div className="h-2 w-1/3 rounded-full bg-corporate-green" />
        <div className="h-2 w-1/3 ml-2 rounded-full bg-border" />
        <div className="h-2 w-1/3 ml-2 rounded-full bg-border" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center w-full max-w-sm space-y-8">
        <div className="space-y-4 text-center">
          <TrustBadge message="Identity Verification" />
          <h1 className="text-2xl font-bold text-foreground">Enter verification code</h1>
          <p className="text-charcoal/80">
            We&apos;ve sent a 4-digit security code to your phone to verify your identity.
          </p>
        </div>

        <div className="py-8">
          {isVerifying ? (
            <div className="flex flex-col items-center justify-center space-y-4 animate-pulse">
              <ShieldCheck className="h-12 w-12 text-corporate-green" />
              <p className="text-sm font-semibold text-corporate-green">Verifying Identity...</p>
            </div>
          ) : (
            <PinInput
              length={4}
              value={pin}
              onChange={setPin}
              onComplete={handleComplete}
              autoFocus
            />
          )}
        </div>
      </div>
    </div>
  )
}
