"use client";

import FadeIn from "@/components/FadeIn";

export default function VisionSection() {
  return (
    <section id="vision" className="py-32 px-6 md:px-12 max-w-5xl mx-auto text-center">
      <FadeIn>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
          Emerging markets require modern payment infrastructure, not just predatory credit.
        </h2>
        <p className="text-xl text-feep-text-muted leading-relaxed mb-12 max-w-3xl mx-auto">
          By shifting the upfront cost of capital from the consumer to the provider, we unlock growth for businesses while protecting families from financial anxiety.
        </p>
      </FadeIn>
    </section>
  );
}