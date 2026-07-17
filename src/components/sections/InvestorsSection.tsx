"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import { INVESTOR_BULLETS } from "@/lib/constants";

export default function InvestorsSection() {
  const [investorFormState, setInvestorFormState] = useState<"idle" | "loading" | "success">("idle");

  const handleInvestorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInvestorFormState("loading");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setInvestorFormState("success");
  };

  return (
    <section id="investors" className="py-24 md:py-32 bg-white px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Engineered for enterprise scale.</h2>
            <p className="text-lg text-feep-text-muted leading-relaxed mb-8">
              FEEP operates a B2B2C marketplace with highly predictable recurring revenue, exceptional retention, and negative churn. Once a provider integrates FEEP, we become core to their operations.
            </p>
            <ul className="space-y-4">
              {INVESTOR_BULLETS.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-feep-primary shrink-0" aria-hidden="true" />
                  <span className="text-feep-text font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.2} className="bg-feep-bg p-8 md:p-12 rounded-3xl border border-black/5">
            <h3 className="text-2xl font-bold mb-6">Request Investor Deck</h3>

            {investorFormState === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl border border-feep-primary/20 flex flex-col items-center text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-feep-primary/10 flex items-center justify-center text-feep-primary">
                  <CheckCircle2 size={24} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Request Received</h4>
                  <p className="text-sm text-feep-text-muted mt-1">Our team will share the deck with you shortly.</p>
                </div>
              </motion.div>
            ) : (
              <form className="space-y-4" onSubmit={handleInvestorSubmit}>
                <div>
                  <label htmlFor="investorEmail" className="sr-only">Work Email</label>
                  <input id="investorEmail" required type="email" placeholder="Work Email" className="w-full bg-white px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-feep-primary transition-colors disabled:opacity-50" disabled={investorFormState === "loading"} />
                </div>
                <div>
                  <label htmlFor="investorOrg" className="sr-only">Fund / Organization</label>
                  <input id="investorOrg" required type="text" placeholder="Fund / Organization" className="w-full bg-white px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-feep-primary transition-colors disabled:opacity-50" disabled={investorFormState === "loading"} />
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  disabled={investorFormState === "loading"}
                  className="w-full bg-feep-text text-white px-6 py-4 rounded-xl font-semibold hover:bg-black transition-colors disabled:opacity-70 flex justify-center items-center h-[56px]"
                >
                  {investorFormState === "loading" ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-label="Loading"></div>
                  ) : (
                    "Request Access"
                  )}
                </motion.button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}