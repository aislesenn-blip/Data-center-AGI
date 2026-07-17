"use client";

import FadeIn from "@/components/FadeIn";
import { CATEGORIES } from "@/lib/constants";

export default function CategoriesSection() {
  return (
    <section className="py-24 md:py-32 bg-white px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Infrastructure for the things that matter most.</h2>
          <p className="text-xl text-feep-text-muted">
            We apply this simple framework to life's most critical sectors, starting with education.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category, i) => {
            const isActive = category.status === "Active";
            return (
              <FadeIn key={i} delay={0.1 * (i + 1)}>
                <div
                  className={`p-8 rounded-3xl h-full flex flex-col relative overflow-hidden ${
                    isActive
                      ? "bg-feep-primary/10 border border-feep-primary/20"
                      : "bg-feep-bg/50 border border-black/5 opacity-60"
                  }`}
                >
                  <div
                    className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${
                      isActive ? "bg-feep-primary text-black" : "bg-black/5 text-feep-text-muted"
                    }`}
                  >
                    {category.status}
                  </div>
                  <category.icon
                    className={`w-8 h-8 mb-6 ${isActive ? "text-feep-primary" : "text-feep-text-muted"}`}
                    aria-hidden="true"
                  />
                  <h3 className="text-2xl font-bold mb-3">{category.title}</h3>
                  <p className="text-feep-text-muted leading-relaxed">{category.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}