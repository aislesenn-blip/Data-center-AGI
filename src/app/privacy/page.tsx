"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function PrivacyPolicy() {
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
              <Shield size={14} className="text-brand-text" />
              Privacy Policy
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-text">We value your trust.</h1>
            <p className="text-sm text-zinc-500">Last updated: {lastUpdated}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="space-y-8 text-sm md:text-base text-zinc-500 leading-relaxed">
          <p>
            At <strong>diaspedia</strong>, we believe trust and security are critical to a friendly social travel utility. This Privacy Policy details our commitment to protecting your personal travel metadata and explaining how we collect, handle, and secure your information.
          </p>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">1. Information We Collect</h2>
            <p>
              To establish travel connections, discover companions, and build trip groups, we handle standard travel metadata:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1.5 text-xs md:text-sm">
              <li><strong>Travel Preferences:</strong> Saved rail itineraries, destination wishlists, and travel history logs.</li>
              <li><strong>Social Metadata:</strong> Friend networks, seat-buddy requests, and chat logs inside active trip rooms.</li>
              <li><strong>Identity Details:</strong> User profile names, passport country context (to support regional pass or transit validation), and active home cities.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">2. How We Use Your Information</h2>
            <p>
              We process information solely to build, secure, and optimize your travel companion experience:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1.5 text-xs md:text-sm">
              <li>Populating saved connections, active chat channels, and seat buddy matching dashboards.</li>
              <li>Suggesting nearby companions, matching shared destinations, and coordinating route delay notices.</li>
              <li>Sending alerts regarding platform track changes, countdown milestones, and group messaging updates.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">3. Zero Data Sales Policy</h2>
            <p>
              diaspedia will <strong>never</strong> rent, sell, or trade your travel histories or conversation logs to third-party marketing companies. Your active journeys, wishlists, and profiles are held strictly confidential.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">4. Premium Security</h2>
            <p>
              We utilize state-of-the-art encryption standards, access controls, and database design boundaries. Your profiles, wishlists, and conversation threads are fully protected from unauthorized leakage.
            </p>
          </div>

          <div className="pt-8 border-t border-black/5 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
            <div>
              <p className="text-xs text-zinc-500 font-medium">Questions about this Policy?</p>
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
