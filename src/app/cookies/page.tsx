"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Cookie } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function CookiePolicy() {
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
              <Cookie size={14} className="text-brand-text" />
              Cookie Policy
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-text">Cookie Policy</h1>
            <p className="text-sm text-brand-text-muted">Last updated: {lastUpdated}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="space-y-8 text-sm md:text-base text-brand-text-muted leading-relaxed">
          <p>
            This Cookie Policy explains how <strong>diaspedia</strong> uses cookies and similar tracking technologies to recognize you when you visit our website, calculate route savings, and maintain active simulator session parameters.
          </p>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">1. What are Cookies?</h2>
            <p>
              Cookies are tiny text files stored by your browser on your desktop or mobile device. They help us understand website navigation, keep your chosen route and shopping list persistent, and offer a premium, frictionless UX.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">2. Types of Cookies We Use</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-brand-text">A. Essential Cookies</h3>
                <p className="text-xs md:text-sm">These are strictly necessary to let you move around the app, calculate bulk pricing offsets, and load pages cleanly. Disabling them will break core calculator capabilities.</p>
              </div>
              <div>
                <h3 className="font-bold text-brand-text">B. Preference and State Cookies</h3>
                <p className="text-xs md:text-sm">These cookies store your selected continent routes, simulator inputs, and joined orders lists locally on your browser, so you never lose your status between page refreshes.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">3. How to Manage Cookies</h2>
            <p>
              You can adjust your web browser settings to reject or delete cookies entirely. Please note that blocking essential cookies will disrupt the interactive diaspedia group shipping calculator.
            </p>
          </div>

          <div className="pt-8 border-t border-black/5 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
            <div>
              <p className="text-xs text-brand-text-muted">Questions about Cookie policies?</p>
              <a href="mailto:privacy@diaspedia.com" className="text-xs font-bold text-brand-text hover:underline">privacy@diaspedia.com</a>
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
