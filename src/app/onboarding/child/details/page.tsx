"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { TrustBadge } from "@/components/ui/TrustBadge"

export default function ChildDetailsPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [dob, setDob] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && dob) {
      router.push(`/onboarding/child/generating?name=${encodeURIComponent(name)}`)
    }
  }

  return (
    <div className="flex min-h-full flex-col p-6">
      <div className="mb-8 mt-4 flex items-center justify-between">
        <div className="h-2 w-1/3 rounded-full bg-corporate-green" />
        <div className="h-2 w-1/3 ml-2 rounded-full bg-corporate-green" />
        <div className="h-2 w-1/3 ml-2 rounded-full bg-border" />
      </div>

      <div className="mb-10 space-y-2">
        <TrustBadge message="Step 2 of 3: Child Identity" />
        <h1 className="text-2xl font-bold text-foreground">Register your child</h1>
        <p className="text-charcoal/80">Establish their long-term digital financial identity.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
        <div className="space-y-6 flex-1">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-charcoal">Child&apos;s Legal First Name</label>
            <Input
              placeholder="Enter child&apos;s name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-charcoal">Date of Birth</label>
            <Input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          <div className="rounded-xl bg-corporate-green/5 p-4 flex items-start space-x-3">
            <Shield className="h-5 w-5 text-corporate-green shrink-0 mt-0.5" />
            <p className="text-xs text-corporate-green/90 leading-relaxed">
              This information is used to generate a secure, unique Digital Card that grows with your child into adulthood.
            </p>
          </div>
        </div>

        <div className="pt-8 pb-4">
          <Button type="submit" size="lg" className="w-full flex items-center justify-center gap-2" disabled={!name || !dob}>
            Generate Digital Card <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  )
}
