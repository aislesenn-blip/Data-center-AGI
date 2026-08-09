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
            Welcome to <strong>diaspedia</strong>. These Terms of Service outline the agreement between you and diaspedia concerning your use of our premium European neobank accounts, virtual/physical debit card programs, and automated tax-refund tracking/processing services.
          </p>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">1. Agreement to Terms</h2>
            <p>
              By accessing our platform, activating your DE IBAN account, initiating transactions, using the Visa/Mastercard debit cards, or uploading retail receipts for tax-refund claims, you agree to be legally bound by these terms. If you do not agree to all terms, please discontinue using our service.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">2. Account Registration & Tax Eligibility</h2>
            <p>
              diaspedia provides digital bank accounts and card-linked tax recovery services. In doing so:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1.5 text-xs md:text-sm">
              <li>Users must submit correct legal identity documentation, including verified non-EU passport scans, to determine tax refund eligibility.</li>
              <li>Users are solely responsible for ensuring the accuracy and legitimacy of all retail transaction receipts uploaded to the platform for tax-refund claims.</li>
              <li>Banking, card clearing, and ledger settlement services are sponsored and executed by our licensed European BaaS partner bank, whose specific product terms also apply to your accounts.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">3. Acceptable Use and Fraud Prevention</h2>
            <p>
              You agree to use your Diaspedia neobank account and debit cards strictly for legitimate purchases. Any attempt to fabricate retail invoices, upload falsified receipts, or engage in suspicious tax claims will result in immediate account suspension and reporting to European tax authorities.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">4. Tax Reimbursement & Fee Structures</h2>
            <p>
              Tax refund percentages are calculated dynamically based on European VAT regulations. Processing and platform handling fees may be deducted from the final refunded amounts as specified in your account dashboard.
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
