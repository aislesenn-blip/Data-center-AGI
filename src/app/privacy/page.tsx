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
            At <strong>diaspedia</strong>, we believe trust is the primary currency of premium social travel and scheduling utility services. This Privacy Policy details our commitment to protecting your personal information and explaining how we collect, handle, and secure your information.
          </p>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">1. Information We Collect</h2>
            <p>
              To organize efficient consolidated passenger ticketing and manage traveler schedules, we collect standard operational information:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1.5 text-xs md:text-sm">
              <li><strong>Your Contact Information:</strong> Name, phone number, and email address to manage your order status and passenger coordinates.</li>
              <li><strong>Co-Traveler Information:</strong> Selected friends list, peer connections, and regional transit hubs in your traveling network.</li>
              <li><strong>Travel Specifications:</strong> Transit dates, carrier routes (Deutsche Bahn, FlixBus), seat preferences, and pricing calculations.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">2. How We Use Your Information</h2>
            <p>
              We process information solely to build, schedule, and optimize collective travel routing. This includes:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1.5 text-xs md:text-sm">
              <li>Pooling traveler coordinates dynamically on specific routes to coordinate bookings.</li>
              <li>Generating digital passenger tickets and clearing booking procedures with licensed operators.</li>
              <li>Updating you through notifications as your travel group coordinates or boarding times approach.</li>
              <li>Safeguarding our community against unauthorized, offensive, or hazardous behavior during transit.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">3. Zero Data Sales Policy</h2>
            <p>
              diaspedia will <strong>never</strong> rent, sell, or trade your personal information or transaction history to third-party advertisers. Your travel paths, friend networks, and travel schedules are kept strictly private within our infrastructure.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">4. Information Security</h2>
            <p>
              We utilize premium standard security, administrative controls, and encryption layers to secure your inputs. Your digital boarding pass and payment profiles are fully encrypted to guarantee user safety and secure transactions.
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
