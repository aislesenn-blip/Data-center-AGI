"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Scale } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function TermsOfService() {
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
              <Scale size={14} className="text-brand-text" />
              Terms of Service
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-text">Terms of Service</h1>
            <p className="text-sm text-zinc-500">Last updated: {lastUpdated}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="space-y-8 text-sm md:text-base text-zinc-500 leading-relaxed">
          <p>
            Welcome to <strong>diaspedia</strong>. These Terms of Service outline the agreement between you and diaspedia concerning your use of our European social travel utility, intelligent rail companion, seat buddy matching, and group chat systems.
          </p>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">1. Agreement to Terms</h2>
            <p>
              By searching rail itineraries, saving trips, connecting with travel companions, matching wishlists, or coordinating in group chats, you agree to be legally bound by these terms. If you do not agree to all terms, please discontinue using our service.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">2. Core Scope & Services</h2>
            <p>
              diaspedia is an interactive planning and social companion layer. In doing so:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1.5 text-xs md:text-sm">
              <li>Users are responsible for entering valid, accurate travel search queries and station parameters.</li>
              <li>diaspedia is not a ticket issuer or reseller. We do not sell passenger tickets, reserve seats, or process transit payments. Any ticket acquisition must be finalized externally with the official transit providers (e.g. Deutsche Bahn, SNCF, Eurostar).</li>
              <li>Users must communicate respectfully in active group chats and coordinate shared travel in compliance with local rules.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">3. Transit Data Disclaimer</h2>
            <p>
              While our hybrid transit provider model makes every effort to offer accurate schedules, platforms, and delay forecasts, final train status remains subject to real-time changes by the respective national railway authorities. diaspedia is not liable for missed departures, cancellations, or delays.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">4. Seat Buddy & Collaboration</h2>
            <p>
              Seat Buddy is a peer-to-peer coordination utility. diaspedia does not secure seat assignments or enforce shared coach seating rules. Cooperation with other travelers remains completely at your discretion.
            </p>
          </div>

          <div className="pt-8 border-t border-black/5 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
            <div>
              <p className="text-xs text-zinc-500 font-medium">Questions about these Terms?</p>
              <a href="mailto:legal@diaspedia.com" className="text-xs font-bold text-brand-text hover:underline">legal@diaspedia.com</a>
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
