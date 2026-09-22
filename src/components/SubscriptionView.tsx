"use client";

import { useState } from "react";
import { Check } from "lucide-react";

interface SubscriptionViewProps {
  onSelectPlan: (plan: "Free" | "Premium" | "Family") => void;
  currentPlan: string;
}

export default function SubscriptionView({
  onSelectPlan,
  currentPlan,
}: SubscriptionViewProps) {
  const [activeInterval, setActiveInterval] = useState<"monthly" | "yearly">("monthly");

  const plans: Array<{
    id: "Free" | "Premium" | "Family";
    name: string;
    priceMonthly: string;
    priceYearly: string;
    description: string;
    features: string[];
    popular: boolean;
  }> = [
    {
      id: "Free",
      name: "Free Trial",
      priceMonthly: "€0",
      priceYearly: "€0",
      description: "Limited library access & sample lessons.",
      features: [
        "Access 1 episode per course",
        "Basic search & discovery",
        "Community forums access",
        "Standard video quality (720p)",
      ],
      popular: false,
    },
    {
      id: "Premium",
      name: "LingoDesk Premium",
      priceMonthly: "€14.99",
      priceYearly: "€11.99",
      description: "Unlimited access to the entire LingoDesk library.",
      features: [
        "Unlimited access to all courses & lessons",
        "Full AI Dubbing in 5+ global languages",
        "Download lessons for offline watching",
        "HD & 4K Ultra Cinematic Streaming",
        "Cancel anytime with 1 click",
      ],
      popular: true,
    },
    {
      id: "Family",
      name: "Family Plan",
      priceMonthly: "€24.99",
      priceYearly: "€19.99",
      description: "Multiple individual profiles for your household.",
      features: [
        "Up to 5 separate learning profiles",
        "Personalized recommendations per profile",
        "Parental controls & interest filters",
        "Simultaneous streaming on 4 screens",
        "Full AI Dubbing & offline downloads",
      ],
      popular: false,
    },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 select-none animate-fadeIn text-white">

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest inline-block">
          Simple Subscription
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
          One subscription. Everything worth learning.
        </h1>
        <p className="text-sm font-semibold text-slate-300">
          Learn from world-class human experts across languages, technology, science, business, cooking, and creative skills.
        </p>
      </div>

      {/* Monthly / Yearly Billing Toggle */}
      <div className="flex justify-center">
        <div className="bg-[#0f172a] p-1.5 rounded-full border border-slate-800 flex items-center gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveInterval("monthly")}
            className={`px-5 py-2 rounded-full transition-all cursor-pointer ${
              activeInterval === "monthly" ? "bg-sky-500 text-white font-black shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setActiveInterval("yearly")}
            className={`px-5 py-2 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              activeInterval === "yearly" ? "bg-sky-500 text-white font-black shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            <span>Annual Billing</span>
            <span className="bg-amber-400 text-slate-900 font-black text-[9px] px-1.5 py-0.5 rounded-full uppercase">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {plans.map((p) => {
          const isCurrent = currentPlan === p.id;
          const price = activeInterval === "monthly" ? p.priceMonthly : p.priceYearly;

          return (
            <div
              key={p.id}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                p.popular
                  ? "bg-gradient-to-b from-sky-950/40 via-[#0f172a] to-[#0f172a] border-2 border-sky-500 shadow-2xl scale-105"
                  : "bg-[#0f172a] border border-slate-800 hover:border-slate-700"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-xl font-heading font-black text-white">{p.name}</h3>
                <p className="text-xs text-slate-300 font-medium min-h-[32px]">{p.description}</p>

                <div className="pt-2">
                  <span className="text-3xl sm:text-4xl font-black text-white">{price}</span>
                  <span className="text-xs font-semibold text-slate-400">
                    {p.id === "Free" ? "" : activeInterval === "monthly" ? "/month" : "/month billed annually"}
                  </span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs font-semibold text-slate-300">
                  {p.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check size={16} className="text-sky-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => onSelectPlan(p.id)}
                  disabled={isCurrent}
                  className={`w-full py-3.5 rounded-2xl font-black text-xs transition-all cursor-pointer shadow-lg ${
                    isCurrent
                      ? "bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700"
                      : p.popular
                      ? "bg-sky-500 hover:bg-sky-400 text-white"
                      : "bg-slate-800 hover:bg-slate-700 text-white"
                  }`}
                >
                  {isCurrent ? "Current Plan Active" : `Select ${p.name}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-slate-400 max-w-xl mx-auto font-medium">
        Prototype Demo Notice: Prices listed above are prototype mock figures for user experience evaluation purposes. No real payment processing occurs.
      </p>

    </div>
  );
}
