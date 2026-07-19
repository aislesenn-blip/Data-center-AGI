"use client";

import FadeIn from "@/components/FadeIn";

export default function ProblemSection() {
  return (
    <section className="py-24 md:py-32 bg-white px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="sr-only">The Challenge</h2>
          <div className="text-sm font-semibold tracking-widest uppercase text-feep-text-muted mb-8" aria-hidden="true">The Challenge</div>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          <FadeIn delay={0.1}>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Providers need reliability.</h3>
            <p className="text-lg text-feep-text-muted leading-relaxed">
              Organizations like schools, clinics, and property managers rely on timely payments to operate effectively. When payments are delayed or unpredictable, it disrupts their ability to deliver essential services.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">People need flexibility.</h3>
            <p className="text-lg text-feep-text-muted leading-relaxed">
              Everyday people earn money on a regular schedule, but life's biggest expenses often demand large lump sums all at once. Forcing people to pay everything upfront creates unnecessary stress and friction.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
