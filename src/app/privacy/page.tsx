"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function PrivacyPolicy() {
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
              <Shield size={14} className="text-brand-text" />
              Privacy Policy
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-text">We value your trust.</h1>
            <p className="text-sm text-brand-text-muted">Last updated: {lastUpdated}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="space-y-8 text-sm md:text-base text-brand-text-muted leading-relaxed">
          <p>
            At <strong>diaspedia</strong>, we believe trust is the primary currency of cross-border financial and logistics services. This Privacy Policy details our commitment to protecting your personal information and explaining how we collect, handle, and secure your information.
          </p>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">1. Information We Collect</h2>
            <p>
              To organize efficient consolidated shipping schedules, calculate optimal pricing, and clear customs, we collect standard operational information:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1.5 text-xs md:text-sm">
              <li><strong>Your Contact Information:</strong> Name, phone number, and email address to manage your order status and logistics coordinates.</li>
              <li><strong>Recipient Information:</strong> Delivery names, phone numbers, and regional collection addresses in the destination country.</li>
              <li><strong>Package Specifications:</strong> Item categories, descriptions, weights, and values for customs deceleration and pricing.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">2. How We Use Your Information</h2>
            <p>
              We process information solely to build, schedule, and optimize collective logistics routes. This includes:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1.5 text-xs md:text-sm">
              <li>Pooling demand dynamically on specific dates to compute bulk savings.</li>
              <li>Generating logistics documentation and clearing regulatory import/export procedures.</li>
              <li>Updating you through sms, email, or WhatsApp as your package progresses through milestones.</li>
              <li>Safeguarding our community against unauthorized or illegal shipments.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">3. Zero Data Sales Policy</h2>
            <p>
              diaspedia will <strong>never</strong> rent, sell, or trade your personal information or transaction history to third-party advertisers. Your shipping paths, recipient identities, and calculated savings are kept strictly private within our infrastructure.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-brand-text">4. Information Security</h2>
            <p>
              We utilize premium standard security, administrative controls, and encryption layers to secure your inputs. Physical logistics points operate under supervised secure handling to guarantee item safety from collection to final delivery.
            </p>
          </div>

          <div className="pt-8 border-t border-black/5 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
            <div>
              <p className="text-xs text-brand-text-muted">Questions about this Policy?</p>
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
