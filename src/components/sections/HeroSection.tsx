"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";

export default function HeroSection() {
  return (
    <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto">
      <FadeIn className="max-w-4xl">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] text-feep-text mb-8">
          With FEEP, <span className="text-feep-text-muted">access comes first.</span>
        </h1>
        <p className="text-xl md:text-2xl text-feep-text-muted max-w-2xl leading-relaxed mb-12">
          Providers need full payment on time. People need flexibility. We bridge the gap so everyone wins.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link href="#contact">
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-feep-primary text-black px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 shadow-lg shadow-feep-primary/20 hover:shadow-feep-primary/30"
            >
              Become a Partner <ArrowRight size={20} />
            </motion.button>
          </Link>
          <Link href="#investors">
            <motion.button
              whileHover={{ y: -2, backgroundColor: "rgba(0,0,0,0.05)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-transparent border border-black/10 text-feep-text px-8 py-4 rounded-full text-lg font-semibold"
            >
              For Investors
            </motion.button>
          </Link>
        </div>
      </FadeIn>

      {/* Social Proof */}
      <FadeIn delay={0.2} className="mt-24 md:mt-32 max-w-4xl">
        <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase mb-8">Trusted by innovative service providers</p>
        <div className="flex flex-wrap gap-12 items-center opacity-40 grayscale pointer-events-none" aria-hidden="true">
          {/* These are placeholder abstract shapes to represent partner school logos */}
          <div className="h-8 w-32 bg-zinc-400 rounded-sm"></div>
          <div className="h-8 w-24 bg-zinc-400 rounded-sm"></div>
          <div className="h-8 w-36 bg-zinc-400 rounded-sm"></div>
          <div className="h-8 w-28 bg-zinc-400 rounded-sm"></div>
        </div>
      </FadeIn>
    </section>
  );
}
