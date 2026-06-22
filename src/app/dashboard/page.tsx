"use client"

import Link from "next/link"
import { ShieldCheck, Plus, ArrowUpRight, TrendingUp, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

// Mock data emphasizing trust and long-term value
const dashboardData = {
  totalValue: "TZS 1,250,000",
  children: [
    { id: "c1", name: "Elias", value: "TZS 750,000", lastDeposit: "2 days ago" },
    { id: "c2", name: "Sofia", value: "TZS 500,000", lastDeposit: "1 week ago" }
  ],
  recentActivity: [
    { id: "a1", type: "Deposit", child: "Elias", amount: "+ TZS 50,000", date: "Oct 24, 2023", status: "Secured" },
    { id: "a2", type: "Deposit", child: "Sofia", amount: "+ TZS 25,000", date: "Oct 18, 2023", status: "Secured" }
  ]
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-full pb-6">
      {/* Header */}
      <header className="px-6 pt-8 pb-6 bg-corporate-green text-white rounded-b-3xl shadow-md z-10 relative">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-xs font-medium">Secured by Platform</span>
          </div>
          <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">
            P
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Total Future Value</p>
          <h1 className="text-4xl font-bold tracking-tight">{dashboardData.totalValue}</h1>
        </div>

        <div className="mt-8 flex space-x-4">
          <Button asChild variant="default" className="flex-1 bg-white text-corporate-green hover:bg-white/90 active:bg-white/80">
            <Link href="/deposit">
              <Plus className="mr-2 h-5 w-5" /> Deposit
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="px-6 py-6 space-y-8 flex-1 -mt-4">

        {/* Child Cards Overview */}
        <section id="cards">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-lg font-bold text-foreground">Digital Cards ({dashboardData.children.length})</h2>
            <Link href="/onboarding/child/details" className="text-sm font-semibold text-corporate-green">
              + Add Child
            </Link>
          </div>

          <div className="space-y-3">
            {dashboardData.children.map((child) => (
              <Link key={child.id} href={`/card/${child.id}`}>
                <div className="bg-white border border-border p-4 rounded-2xl flex items-center shadow-sm hover:border-corporate-green/30 transition-colors">
                  <div className="h-12 w-12 rounded-full bg-soft-gray flex items-center justify-center text-charcoal font-bold text-lg mr-4 border border-border">
                    {child.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{child.name}</h3>
                    <p className="text-xs text-charcoal/60">Last added {child.lastDeposit}</p>
                  </div>
                  <div className="text-right flex items-center">
                    <div className="mr-2">
                      <p className="font-bold text-foreground">{child.value}</p>
                      <p className="text-[10px] text-corporate-green flex items-center justify-end font-medium">
                        <TrendingUp className="h-3 w-3 mr-1" /> Growing
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-charcoal/40" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-lg font-bold text-foreground">Recent Security Actions</h2>
            <Link href="/activity" className="text-sm font-medium text-charcoal/60">
              View all
            </Link>
          </div>

          <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
            {dashboardData.recentActivity.map((activity, index) => (
              <div
                key={activity.id}
                className={`p-4 flex items-center ${index !== dashboardData.recentActivity.length - 1 ? 'border-b border-border' : ''}`}
              >
                <div className="h-10 w-10 rounded-full bg-corporate-green/10 flex items-center justify-center mr-4">
                  <ArrowUpRight className="h-5 w-5 text-corporate-green" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-foreground">Deposit to {activity.child}</h3>
                  <p className="text-xs text-charcoal/60">{activity.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-corporate-green">{activity.amount}</p>
                  <div className="flex items-center justify-end mt-0.5">
                    <ShieldCheck className="h-3 w-3 text-corporate-green mr-1" />
                    <p className="text-[10px] text-charcoal/80">{activity.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
