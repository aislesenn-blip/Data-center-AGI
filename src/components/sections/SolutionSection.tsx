"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

export default function SolutionSection() {
  return (
    <section id="solution" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <FadeIn className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">How FEEP Works</h2>
        <p className="text-xl text-feep-text-muted">
          We bridge the gap between providers who need full payment and people who need flexible schedules.
        </p>
      </FadeIn>

      <div className="grid md:grid-cols-4 gap-8 relative">
        {/* Connecting line for desktop */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-black/5 -translate-y-1/2 z-0" aria-hidden="true"></div>

        {HOW_IT_WORKS_STEPS.map((step, i) => (
          <FadeIn key={i} delay={i * 0.1} className="relative z-10">
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-feep-bg p-8 rounded-2xl border border-black/5 shadow-sm h-full"
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                <step.icon className="text-feep-text w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-feep-text-muted leading-relaxed">{step.desc}</p>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}