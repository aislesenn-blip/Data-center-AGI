"use client";

import FadeIn from "@/components/FadeIn";

export default function FounderSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-white border-t border-black/5">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-24 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">The story behind FEEP.</h2>
            <div className="space-y-6 text-lg text-feep-text-muted leading-relaxed">
              <p>
                Most people earn their money on a regular schedule—weekly or monthly. But life’s most critical expenses, like education and housing, demand large upfront payments.
              </p>
              <p>
                This mismatch creates impossible choices. Providers are forced to act as debt collectors or turn people away, while individuals face intense financial anxiety trying to come up with lump sums. The problem isn't a lack of money; it's a structural failure in how payments are timed.
              </p>
              <p>
                We built FEEP to fix this. By building the infrastructure that sits between a provider's need to operate and a person's natural income flow, we remove the friction entirely. We ensure essential services stay accessible, and the organizations providing them remain secure.
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