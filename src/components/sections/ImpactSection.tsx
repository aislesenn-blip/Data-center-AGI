"use client";

import FadeIn from "@/components/FadeIn";
import { IMPACT_METRICS } from "@/lib/constants";

export default function ImpactSection() {
  return (
    <section id="impact" className="py-24 md:py-32 bg-feep-text text-white px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 divide-x-0 md:divide-x divide-white/10">
          {IMPACT_METRICS.map((metric, i) => (
            <div key={i} className="md:px-8 first:pl-0">
              <div className="text-5xl md:text-6xl font-bold tracking-tighter mb-2 text-feep-primary">{metric.value}</div>
              <div className="text-zinc-400 font-medium">{metric.label}</div>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}