"use client";

import { useState } from "react";
import { Check, Sparkles, Users, Award, Shield, ArrowRight } from "lucide-react";

interface SubscriptionViewProps {
  currentPlan: string;
  onSelectPlan: (plan: "Free" | "Premium" | "Family") => void;
}

export default function SubscriptionView({
  currentPlan,
  onSelectPlan,
}: SubscriptionViewProps) {
  const [activeInterval, setActiveInterval] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Free",
      priceMonthly: "€0",
      priceYearly: "€0",
      description: "Basic access to selected public preview lessons.",
      features: [
        "Access to preview lessons in every course",
        "Standard video quality",
        "1 profile account",
        "Original audio track only"
      ],
      badge: "Basic",
      highlight: false,
    },
    {
      name: "Premium",
      priceMonthly: "€14.99",
      priceYearly: "€11.99",
      description: "Unlimited access to the complete LingoDesk learning library.",
      features: [
        "Unlimited streaming of all 35+ course productions",
        "AI Dubbing in 5 languages (German, English, French, Spanish, Swahili)",
        "Downloadable lesson notes, cheat sheets & code files",
        "Ad-free cinematic experience in HD/4K",
        "Cancel anytime"
      ],
      badge: "Most Popular",
      highlight: true,
    },
    {
      name: "Family",
      priceMonthly: "€24.99",
      priceYearly: "€19.99",
      description: "For families and co-learners up to 4 distinct profiles.",
      features: [
        "Up to 4 independent learning profiles",
        "Personalized recommendations per profile",
        "Kid & Teen learning profile modes",
        "Simultaneous streaming across devices",
        "Unlimited access & AI Dubbing features"
      ],
      badge: "Family Plan",
      highlight: false,
    },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 select-none animate-fadeIn text-white">

      {/* Title Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest inline-block">
          Simple Subscription
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
          One subscription. Everything worth learning.
        </h1>
        <p className="text-sm font-medium text-zinc-400">
          No individual course fees. No hidden add-ons. Stream the entire library on demand.
        </p>

        {/* Prototype Pricing Disclaimer */}
        <p className="text-[11px] text-zinc-500 font-bold bg-zinc-900 border border-zinc-800 rounded-xl py-1.5 px-4 inline-block">
          * Demo prototype pricing shown for evaluation purposes.
        </p>
      </div>

      {/* Monthly / Yearly Billing Toggle */}
      <div className="flex justify-center">
        <div className="bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 flex items-center gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveInterval("monthly")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeInterval === "monthly" ? "bg-red-600 text-white font-black" : "text-zinc-400 hover:text-white"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setActiveInterval("yearly")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeInterval === "yearly" ? "bg-red-600 text-white font-black" : "text-zinc-400 hover:text-white"
            }`}
          >
            <span>Annual (Save 20%)</span>
            <Sparkles size={13} className="text-amber-300" />
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map((p) => {
          const isCurrent = currentPlan === p.name;
          const price = activeInterval === "monthly" ? p.priceMonthly : p.priceYearly;

          return (
            <div
              key={p.name}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all border relative ${
                p.highlight
                  ? "bg-gradient-to-b from-red-950/40 via-[#181818] to-[#181818] border-red-600/80 shadow-2xl scale-105"
                  : "bg-[#181818] border-zinc-800 hover:border-zinc-700"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                  {p.badge}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-heading font-black text-white">{p.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1 font-medium">{p.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-heading font-black text-white">{price}</span>
                  <span className="text-xs font-semibold text-zinc-400">/month</span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-zinc-800">
                  {p.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300 font-medium">
                      <Check size={16} className="text-red-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectPlan(p.name as "Free" | "Premium" | "Family")}
                className={`w-full py-4 rounded-2xl text-xs font-black transition-all cursor-pointer shadow-lg ${
                  isCurrent
                    ? "bg-zinc-800 text-emerald-400 border border-emerald-500/50"
                    : p.highlight
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-white text-black hover:bg-zinc-200"
                }`}
              >
                {isCurrent ? "Current Active Plan" : `Select ${p.name}`}
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}
