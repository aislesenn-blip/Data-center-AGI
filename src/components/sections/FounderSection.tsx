"use client";

import FadeIn from "@/components/FadeIn";

export default function FounderSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-white border-t border-black/5">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-24 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Meet the Founder</h2>
            <div className="space-y-6 text-lg text-feep-text-muted leading-relaxed">
              <p>
                <strong className="text-feep-text font-semibold">Ernest</strong> founded FEEP with a simple belief: access to essential services shouldn't depend on whether someone can afford a large upfront payment today.
              </p>
              <p>
                After observing how millions of people earn income gradually while many essential services require full payment upfront, he set out to build a different kind of payment infrastructure—one that aligns payments with how people actually earn.
              </p>
              <p>
                Under his leadership, FEEP is building technology that enables service providers to offer flexible payment experiences without sacrificing predictable cash flow, starting with education and expanding to other essential services over time.
              </p>
              <p>
                His vision is to make access easier, more inclusive, and more sustainable for millions of people across Africa and beyond.
              </p>
              <div className="pt-4">
                <div className="font-bold text-feep-text text-xl">Ernest Michael</div>
                <div className="text-sm font-semibold tracking-wider text-zinc-400 uppercase mt-1">Founder, FEEP</div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="aspect-square bg-feep-bg rounded-3xl border border-black/5 relative overflow-hidden flex items-center justify-center">
              {/* Placeholder for founder portrait */}
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-200 to-zinc-100 opacity-50" aria-hidden="true"></div>
              <div className="w-full h-full flex items-center justify-center text-zinc-400 font-medium z-10 text-center px-4">
                [Founder Image Placeholder]<br/>
                Replace with actual image in code
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}