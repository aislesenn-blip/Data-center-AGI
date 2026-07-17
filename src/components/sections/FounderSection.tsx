"use client";

import FadeIn from "@/components/FadeIn";

export default function FounderSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-white border-t border-black/5">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-24 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Built with conviction.</h2>
            <div className="space-y-6 text-lg text-feep-text-muted leading-relaxed">
              <p>
                "We are not just solving a localized payment problem. We are architecting a new standard for how essential services are accessed across emerging markets."
              </p>
              <p>
                With a deeply analytical background rooted in advanced Physics and Mathematics, combined with a relentless focus on product strategy and go-to-market execution, our leadership understands how to build systems that scale.
              </p>
              <p>
                FEEP is driven by a singular, long-term vision: eliminating the friction between a person's basic needs and a provider's need to operate. We are building technology with global ambition because the problem demands nothing less.
              </p>
              <div className="pt-4">
                <div className="font-bold text-feep-text text-xl">Ernest Michael</div>
                <div className="text-sm font-semibold tracking-wider text-zinc-400 uppercase mt-1">Founder & CEO</div>
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