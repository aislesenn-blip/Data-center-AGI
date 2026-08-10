"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Cookie } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function CookiePolicy() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <main className="min-h-screen bg-[#F6F4ED] text-[#0f1115] flex flex-col font-sans">

      {/* Mini header */}
      <header className="border-b border-black/5 bg-[#F6F4ED]/80 backdrop-blur-md sticky top-0 z-40 py-4 px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-brand-text hover:opacity-85 transition-opacity">
            <ArrowLeft size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Back to diaspedia</span>
          </Link>
          <div className="flex items-center gap-2 text-brand-text">
            <span className="font-heading font-black text-xl tracking-tight text-[#0f1115]">diaspedia</span>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-16 space-y-12">
        <FadeIn>
          <div className="border-b border-black/5 pb-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#71E300]/10 text-brand-text px-3 py-1 rounded-full text-xs font-semibold">
              <Cookie size={14} className="text-brand-text" />
              Cookie Policy
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-text">Cookie Policy</h1>
            <p className="text-sm text-zinc-500">Last updated: {lastUpdated}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="space-y-8 text-sm md:text-base text-zinc-500 leading-relaxed">
          <p>
            This Cookie Policy explains how <strong>diaspedia</strong> uses cookies and similar tracking technologies to recognize you when you visit our website, coordinate travel routes, and maintain active travel pass session parameters.
          </p>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">1. What are Cookies?</h2>
            <p>
              Cookies are tiny text files stored by your browser on your desktop or mobile device. They help us understand website navigation, keep your selected route and traveling preferences persistent, and offer a premium, frictionless UX.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">2. Types of Cookies We Use</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-brand-text">A. Essential Cookies</h3>
                <p className="text-xs md:text-sm">These are strictly necessary to let you move around the app, facilitate booking options, and load pages cleanly. Disabling them will break core routing capabilities.</p>
              </div>
              <div>
                <h3 className="font-bold text-brand-text">B. Preference and State Cookies</h3>
                <p className="text-xs md:text-sm">These cookies store your selected travel routes, onboarding status, and notifications history locally on your browser, so you never lose your status between page refreshes.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">3. How to Manage Cookies</h2>
            <p>
              You can adjust your web browser settings to reject or delete cookies entirely. Please note that blocking essential cookies will disrupt the interactive diaspedia travel booking dashboard.
            </p>
          </div>

          <div className="pt-8 border-t border-black/5 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
            <div>
              <p className="text-xs text-zinc-500 font-medium">Questions about Cookie policies?</p>
              <a href="mailto:privacy@diaspedia.com" className="text-xs font-bold text-brand-text hover:underline">privacy@diaspedia.com</a>
            </div>
            <Link href="/">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-[#71E300] text-black text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#5ec700]"
              >
                Return Home
              </motion.button>
            </Link>
          </div>
        </FadeIn>
      </div>

      <footer className="bg-black text-white py-12 px-6 text-center text-xs mt-auto">
        <p>&copy; {new Date().getFullYear()} diaspedia. All rights reserved.</p>
      </footer>

    </main>
  );
}
