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
            At <strong>diaspedia</strong>, we believe trust is the primary currency of premium neobanking and automated tax recovery. This Privacy Policy details our commitment to protecting your personal financial information and explaining how we collect, handle, and secure your information.
          </p>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">1. Information We Collect</h2>
            <p>
              To establish everyday bank accounts, deliver debit cards, and manage VAT recovery claims, we collect standard financial and identification information:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1.5 text-xs md:text-sm">
              <li><strong>Personal Identity Coordinates:</strong> Full legal name, residential address, passport scans, and nationality context to verify non-EU residency status.</li>
              <li><strong>Transactional Activity:</strong> Transaction amounts, merchant names, tax classification details, and receipt uploads necessary to verify VAT claims.</li>
              <li><strong>Banking Details:</strong> Account balance records, payment card information, and virtual/physical credentials.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">2. How We Use Your Information</h2>
            <p>
              We process information solely to build, secure, and optimize neobanking and tax recovery cycles:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1.5 text-xs md:text-sm">
              <li>Providing transaction ledgers, instant funding, and debit card transaction clearing.</li>
              <li>Compiling and submitting verified tax recovery documentation directly to relevant European tax authorities.</li>
              <li>Sending push and in-app alerts regarding deposit clearances, frozen status changes, and paid VAT claims.</li>
              <li>Ensuring full compliance with anti-money laundering (AML), know-your-customer (KYC) regulations, and general European bank safety standards.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">3. Zero Data Sales Policy</h2>
            <p>
              diaspedia will <strong>never</strong> rent, sell, or trade your financial history or identity information to third-party marketing companies. Your transaction feeds, passport details, and balance records are kept strictly confidential within our encrypted banking vaults.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">4. Bank-Grade Security</h2>
            <p>
              We utilize premium encryption standards, automated transaction monitors, and industry-standard security boundaries. Your digital debit card information, transaction history, and KYC records are fully shielded from unauthorized leakage or external threats.
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
