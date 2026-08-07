"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Scale } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function TermsOfService() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text flex flex-col font-sans">

      {/* Mini header */}
      <header className="border-b border-black/5 bg-brand-bg/80 backdrop-blur-md sticky top-0 z-40 py-4 px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-brand-text hover:opacity-85 transition-opacity">
            <ArrowLeft size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Back to diaspedia</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-brand-primary text-black flex items-center justify-center text-[10px] font-black rounded-md">d</div>
            <span className="font-bold text-xs tracking-tight text-brand-text">diaspedia</span>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-16 space-y-12">
        <FadeIn>
          <div className="border-b border-black/5 pb-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-text px-3 py-1 rounded-full text-xs font-semibold">
              <Scale size={14} className="text-brand-text" />
              Terms of Service
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-text">Terms of Service</h1>
            <p className="text-sm text-brand-text-muted">Last updated: {lastUpdated}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="space-y-8 text-sm md:text-base text-brand-text-muted leading-relaxed">
          <p>
            Welcome to <strong>diaspedia</strong>. These Terms of Service outline the agreement between you and diaspedia concerning your use of our collective cross-border logistics platform, routing services, and related applications.
          </p>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">1. Agreement to Terms</h2>
            <p>
              By accessing our platform, selecting routes, or booking consolidated shipping spots, you agree to be legally bound by these terms. If you do not agree to all terms, please discontinue using our service.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">2. Logistics & Group Pooling</h2>
            <p>
              diaspedia coordinates demand schedules to unlock bulk transport pricing. In doing so:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1.5 text-xs md:text-sm">
              <li>Users must deliver packages to our collection hubs prior to the stated &ldquo;Join Before&rdquo; deadline.</li>
              <li>Users agree to provide truthful descriptions, weight parameters, and category selection of all cargo.</li>
              <li>diaspedia reserves the right to inspect packages at our hubs to verify compliance with safety and customs regulations.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">3. Restricted and Prohibited Goods</h2>
            <p>
              We maintain absolute zero-tolerance compliance. You may not send hazardous materials, illegal substances, counterfeit products, weapons, or any item prohibited by the origin or destination country's custom authority. Violating items will be handed immediately to local authorities and will lead to an immediate ban.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">4. Payment and Calculations</h2>
            <p>
              Prices shown during calculation are realistic estimates based on bulk packing consolidation. Final weight and dimensions will be certified upon arrival at our packing center. Savings are computed by comparing our collective rate with solo DHL/FedEx pricing.
            </p>
          </div>

          <div className="pt-8 border-t border-black/5 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
            <div>
              <p className="text-xs text-brand-text-muted">Questions about these Terms?</p>
              <a href="mailto:legal@diaspedia.com" className="text-xs font-bold text-brand-text hover:underline">legal@diaspedia.com</a>
            </div>
            <Link href="/">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-brand-primary text-black text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-brand-primary-hover"
              >
                Return Home
              </motion.button>
            </Link>
          </div>
        </FadeIn>
      </div>

      <footer className="bg-brand-text text-white py-12 px-6 text-center text-xs mt-auto">
        <p>&copy; {new Date().getFullYear()} diaspedia. All rights reserved.</p>
      </footer>

    </main>
  );
}
