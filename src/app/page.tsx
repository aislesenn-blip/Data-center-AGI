"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { ArrowRight, Wallet, GraduationCap, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Form states
  const [investorFormState, setInvestorFormState] = useState<"idle" | "loading" | "success">("idle");
  const [contactFormState, setContactFormState] = useState<"idle" | "loading" | "success">("idle");

  const handleInvestorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInvestorFormState("loading");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setInvestorFormState("success");
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactFormState("loading");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setContactFormState("success");
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation />

      {/* 1. Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <FadeIn className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-tighter leading-[1.05] text-feep-text mb-8">
            Financial infrastructure<br />
            <span className="text-feep-text-muted">for education.</span>
          </h1>
          <p className="text-xl md:text-2xl text-feep-text-muted max-w-2xl leading-relaxed mb-12">
            We guarantee full upfront tuition for schools, while giving families the flexibility to pay in zero-interest monthly installments.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link href="#contact">
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="bg-feep-primary text-black px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 shadow-lg shadow-feep-primary/20 hover:shadow-feep-primary/30"
              >
                Request Integration <ArrowRight size={20} />
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
          <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase mb-8">Trusted by innovative schools</p>
          <div className="flex flex-wrap gap-12 items-center opacity-40 grayscale pointer-events-none">
            {/* These are placeholder abstract shapes to represent partner school logos */}
            <div className="h-8 w-32 bg-zinc-400 rounded-sm"></div>
            <div className="h-8 w-24 bg-zinc-400 rounded-sm"></div>
            <div className="h-8 w-36 bg-zinc-400 rounded-sm"></div>
            <div className="h-8 w-28 bg-zinc-400 rounded-sm"></div>
          </div>
        </FadeIn>
      </section>

      {/* 2. The Problem */}
      <section className="py-24 md:py-32 bg-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-sm font-semibold tracking-widest uppercase text-feep-text-muted mb-8">The Challenge</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            <FadeIn delay={0.1}>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Families struggle with lump-sum payments.</h3>
              <p className="text-lg text-feep-text-muted leading-relaxed">
                Education is the highest priority for African families, but fee schedules rarely align with income cycles. This timing mismatch forces families into high-interest debt or pulls children out of school entirely.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Schools suffer from unpredictable cash flow.</h3>
              <p className="text-lg text-feep-text-muted leading-relaxed">
                When parents pay late, schools struggle to pay teachers, upgrade facilities, and operate efficiently. Administrators spend more time chasing payments than focusing on education.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. Our Solution */}
      <section id="solution" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <FadeIn className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">How FEEP Works</h2>
          <p className="text-xl text-feep-text-muted">
            We are not a lending company. We are infrastructure that bridges the gap between school cash flow needs and parent income cycles.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-black/5 -translate-y-1/2 z-0"></div>

          {[
            { icon: Wallet, title: "Instant Liquidity", desc: "FEEP advances full-term tuition directly to the school on day one." },
            { icon: GraduationCap, title: "Uninterrupted Learning", desc: "Students remain enrolled without the stress or embarrassment of fee-related exclusion." },
            { icon: CheckCircle2, title: "0% Interest for Families", desc: "Parents repay FEEP in predictable monthly installments with absolutely no hidden fees." },
            { icon: ArrowRight, title: "Automated Reconciliation", desc: "Schools eliminate collection friction, gaining guaranteed cash flow and operational peace of mind." }
          ].map((step, i) => (
            <FadeIn key={i} delay={i * 0.1} className="relative z-10">
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05)" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-feep-bg p-8 rounded-2xl border border-black/5 shadow-sm h-full"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                  <step.icon className="text-feep-text w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                <p className="text-feep-text-muted leading-relaxed">{step.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 4. Impact Metrics */}
      <section id="impact" className="py-24 md:py-32 bg-feep-text text-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 divide-x-0 md:divide-x divide-white/10">
            <div className="md:px-8 first:pl-0">
              <div className="text-5xl md:text-6xl font-bold tracking-tighter mb-2 text-feep-primary">50k+</div>
              <div className="text-zinc-400 font-medium">Families Supported</div>
            </div>
            <div className="md:px-8">
              <div className="text-5xl md:text-6xl font-bold tracking-tighter mb-2 text-feep-primary">200+</div>
              <div className="text-zinc-400 font-medium">Schools Partnered</div>
            </div>
            <div className="md:px-8">
              <div className="text-5xl md:text-6xl font-bold tracking-tighter mb-2 text-feep-primary">99%</div>
              <div className="text-zinc-400 font-medium">Retention Rate</div>
            </div>
            <div className="md:px-8">
              <div className="text-5xl md:text-6xl font-bold tracking-tighter mb-2 text-feep-primary">$10M+</div>
              <div className="text-zinc-400 font-medium">Fees Enabled</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 5. Why Now & Vision */}
      <section id="vision" className="py-32 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
            Africa&apos;s education sector requires modern financial infrastructure, not just loans.
          </h2>
          <p className="text-xl text-feep-text-muted leading-relaxed mb-12 max-w-3xl mx-auto">
            By shifting the cost of capital from the parent to the school, we unlock growth for educational institutions while protecting families from predatory lending.
          </p>
        </FadeIn>
      </section>

      {/* 5.5 Founder & Leadership */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-white border-t border-black/5">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-24 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold tracking-tight mb-6">Built with conviction.</h2>
              <div className="space-y-6 text-lg text-feep-text-muted leading-relaxed">
                <p>
                  "We are not just solving a localized payment problem. We are architecting a new standard for how education is financed across emerging markets."
                </p>
                <p>
                  With a deeply analytical background rooted in advanced Physics and Mathematics, combined with a relentless focus on product strategy and go-to-market execution, our leadership understands how to build systems that scale.
                </p>
                <p>
                  FEEP is driven by a singular, long-term vision: eliminating the friction between a child's right to learn and a school's need to operate. We are building technology with global ambition because the problem demands nothing less.
                </p>
                <div className="pt-4">
                  <div className="font-bold text-feep-text text-xl">Ernest Michael</div>
                  <div className="text-sm font-semibold tracking-wider text-zinc-400 uppercase mt-1">Founder & CEO</div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-square bg-feep-bg rounded-3xl border border-black/5 relative overflow-hidden flex items-center justify-center">
                {/* Placeholder for founder portrait */}
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-200 to-zinc-100 opacity-50"></div>
                <div className="w-full h-full flex items-center justify-center text-zinc-400 font-medium">Founder Portrait</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. For Investors */}
      <section id="investors" className="py-24 md:py-32 bg-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Engineered for enterprise scale.</h2>
              <p className="text-lg text-feep-text-muted leading-relaxed mb-8">
                FEEP operates a B2B2C marketplace with highly predictable recurring revenue, exceptional retention, and negative churn. Once a school integrates FEEP, it becomes core to their operations.
              </p>
              <ul className="space-y-4">
                {['High LTV/CAC ratio through B2B distribution', 'Proprietary risk assessment algorithms', 'Massive unserved TAM in emerging markets', 'Asset-light technology platform'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-feep-primary shrink-0" />
                    <span className="text-feep-text font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.2} className="bg-feep-bg p-8 md:p-12 rounded-3xl border border-black/5">
              <h3 className="text-2xl font-bold mb-6">Request Investor Deck</h3>

              {investorFormState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-xl border border-feep-primary/20 flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-feep-primary/10 flex items-center justify-center text-feep-primary">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Request Received</h4>
                    <p className="text-sm text-feep-text-muted mt-1">Our team will share the deck with you shortly.</p>
                  </div>
                </motion.div>
              ) : (
                <form className="space-y-4" onSubmit={handleInvestorSubmit}>
                  <input required type="email" placeholder="Work Email" className="w-full bg-white px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-feep-primary transition-colors disabled:opacity-50" disabled={investorFormState === "loading"} />
                  <input required type="text" placeholder="Fund / Organization" className="w-full bg-white px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-feep-primary transition-colors disabled:opacity-50" disabled={investorFormState === "loading"} />
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    disabled={investorFormState === "loading"}
                    className="w-full bg-feep-text text-white px-6 py-4 rounded-xl font-semibold hover:bg-black transition-colors disabled:opacity-70 flex justify-center items-center h-[56px]"
                  >
                    {investorFormState === "loading" ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      "Request Access"
                    )}
                  </motion.button>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section id="faq" className="py-24 md:py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl font-bold tracking-tight mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is FEEP a loan?", a: "No. FEEP does not lend money to parents or charge them interest. We act as a payment facilitator, advancing funds to schools and collecting monthly installments from parents." },
              { q: "Do parents pay interest?", a: "Parents pay exactly what their school fees cost, divided into equal monthly installments. Zero interest. Zero hidden fees." },
              { q: "How does FEEP make money?", a: "Schools pay FEEP a small partnership fee (a percentage of the total fees collected) in exchange for receiving their cash upfront and eliminating collection friction." },
              { q: "Who can partner with FEEP?", a: "We partner with registered private and semi-private educational institutions that meet our operational and financial criteria." }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-black/5 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left font-semibold text-lg flex justify-between items-center p-6 outline-none"
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  {faq.q}
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="text-feep-primary text-2xl leading-none shrink-0 ml-4"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-6 pb-6 pt-2 text-feep-text-muted leading-relaxed pr-8">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* 8. Contact Form */}
      <section id="contact" className="py-24 md:py-32 bg-white px-6 md:px-12 border-t border-black/5">
        <FadeIn className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Join the network.</h2>
            <p className="text-lg text-feep-text-muted">Request an integration for your school or explore a strategic partnership. Leave your details below and our team will be in touch.</p>
          </div>

          {contactFormState === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-feep-bg rounded-3xl p-12 text-center border border-feep-primary/20 flex flex-col items-center max-w-lg mx-auto"
            >
              <div className="w-20 h-20 rounded-full bg-feep-primary/20 flex items-center justify-center text-feep-primary mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-3xl font-bold mb-4">Request Sent</h3>
              <p className="text-lg text-feep-text-muted">Thank you for your interest in FEEP. Our partnership team will review your request and get back to you shortly.</p>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleContactSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input required disabled={contactFormState === "loading"} type="text" className="w-full bg-feep-bg px-4 py-3 rounded-xl border border-transparent focus:border-feep-primary focus:bg-white outline-none transition-all disabled:opacity-50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Organization</label>
                  <input required disabled={contactFormState === "loading"} type="text" className="w-full bg-feep-bg px-4 py-3 rounded-xl border border-transparent focus:border-feep-primary focus:bg-white outline-none transition-all disabled:opacity-50" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Work Email</label>
                  <input required disabled={contactFormState === "loading"} type="email" className="w-full bg-feep-bg px-4 py-3 rounded-xl border border-transparent focus:border-feep-primary focus:bg-white outline-none transition-all disabled:opacity-50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <input disabled={contactFormState === "loading"} type="tel" className="w-full bg-feep-bg px-4 py-3 rounded-xl border border-transparent focus:border-feep-primary focus:bg-white outline-none transition-all disabled:opacity-50" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Country</label>
                  <input required disabled={contactFormState === "loading"} type="text" className="w-full bg-feep-bg px-4 py-3 rounded-xl border border-transparent focus:border-feep-primary focus:bg-white outline-none transition-all disabled:opacity-50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Purpose</label>
                  <select required disabled={contactFormState === "loading"} defaultValue="" className="w-full bg-feep-bg px-4 py-3 rounded-xl border border-transparent focus:border-feep-primary focus:bg-white outline-none transition-all appearance-none cursor-pointer disabled:opacity-50">
                    <option value="" disabled>Select an option...</option>
                    <option value="school">School</option>
                    <option value="investor">Investor</option>
                    <option value="partner">Strategic Partner</option>
                    <option value="government">Government / NGO</option>
                    <option value="media">Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea required disabled={contactFormState === "loading"} rows={4} className="w-full bg-feep-bg px-4 py-3 rounded-xl border border-transparent focus:border-feep-primary focus:bg-white outline-none transition-all resize-none disabled:opacity-50"></textarea>
              </div>
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={contactFormState === "loading"}
                className="bg-feep-primary text-black w-full py-4 rounded-xl font-bold text-lg hover:bg-[#65cc00] transition-colors disabled:opacity-70 flex items-center justify-center h-[60px]"
              >
                {contactFormState === "loading" ? (
                  <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                ) : (
                  "Submit Request"
                )}
              </motion.button>
            </form>
          )}
        </FadeIn>
      </section>

      <Footer />
    </main>
  );
}
