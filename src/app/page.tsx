"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { ArrowRight, Wallet, GraduationCap, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation />

      {/* 1. Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <FadeIn className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-tighter leading-[1.05] text-feep-text mb-8">
            Smarter school fees.<br />
            <span className="text-feep-text-muted">Stronger schools.</span>
          </h1>
          <p className="text-xl md:text-2xl text-feep-text-muted max-w-2xl leading-relaxed mb-12">
            We enable schools to receive full fee payments upfront while offering families simple, zero-interest monthly plans.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link href="#contact">
              <button className="bg-feep-primary text-black px-8 py-4 rounded-full text-lg font-semibold transition-transform hover:scale-105 active:scale-95 flex items-center gap-2">
                Talk to Us <ArrowRight size={20} />
              </button>
            </Link>
            <Link href="#investors">
              <button className="bg-transparent border border-black/10 text-feep-text hover:bg-black/5 px-8 py-4 rounded-full text-lg font-semibold transition-all">
                For Investors
              </button>
            </Link>
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
            { icon: Wallet, title: "1. School gets paid", desc: "FEEP advances the full term's fees directly to the school upfront." },
            { icon: GraduationCap, title: "2. Child stays in class", desc: "Students remain in school without interruption or embarrassment." },
            { icon: CheckCircle2, title: "3. Zero interest", desc: "Parents repay FEEP in simple, manageable monthly installments with no interest." },
            { icon: ArrowRight, title: "4. Better operations", desc: "Schools pay a small partnership fee for guaranteed cash flow and enrollment." }
          ].map((step, i) => (
            <FadeIn key={i} delay={i * 0.1} className="relative z-10 bg-feep-bg p-8 rounded-2xl border border-black/5 shadow-sm">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                <step.icon className="text-feep-text w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold mb-3">{step.title}</h4>
              <p className="text-feep-text-muted leading-relaxed">{step.desc}</p>
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
      <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
            Africa&apos;s education sector requires modern financial infrastructure, not just loans.
          </h2>
          <p className="text-xl text-feep-text-muted leading-relaxed mb-12 max-w-3xl mx-auto">
            By shifting the cost of capital from the parent to the school, we unlock growth for educational institutions while protecting families from predatory lending.
          </p>
        </FadeIn>
      </section>

      {/* 6. For Investors */}
      <section id="investors" className="py-24 md:py-32 bg-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Built for scale.</h2>
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
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Work Email" className="w-full bg-white px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-feep-primary transition-colors" />
                <input type="text" placeholder="Fund / Organization" className="w-full bg-white px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-feep-primary transition-colors" />
                <button className="w-full bg-feep-text text-white px-6 py-4 rounded-xl font-semibold hover:bg-black transition-colors">
                  Request Access
                </button>
              </form>
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
              <details key={i} className="group bg-white p-6 rounded-2xl border border-black/5 cursor-pointer [&_summary::-webkit-details-marker]:hidden">
                <summary className="font-semibold text-lg flex justify-between items-center outline-none">
                  {faq.q}
                  <span className="text-feep-primary group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
                </summary>
                <p className="mt-4 text-feep-text-muted leading-relaxed pr-8">{faq.a}</p>
              </details>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* 8. Contact Form */}
      <section id="contact" className="py-24 md:py-32 bg-white px-6 md:px-12 border-t border-black/5">
        <FadeIn className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Partner With Us</h2>
            <p className="text-lg text-feep-text-muted">Interested in bringing FEEP to your school or exploring a strategic partnership? Leave your details below.</p>
          </div>
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you. Our team will contact you shortly.");
          }}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <input required type="text" className="w-full bg-feep-bg px-4 py-3 rounded-xl border border-transparent focus:border-feep-primary focus:bg-white outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Organization</label>
                <input required type="text" className="w-full bg-feep-bg px-4 py-3 rounded-xl border border-transparent focus:border-feep-primary focus:bg-white outline-none transition-all" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Work Email</label>
                <input required type="email" className="w-full bg-feep-bg px-4 py-3 rounded-xl border border-transparent focus:border-feep-primary focus:bg-white outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <input type="tel" className="w-full bg-feep-bg px-4 py-3 rounded-xl border border-transparent focus:border-feep-primary focus:bg-white outline-none transition-all" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <input required type="text" className="w-full bg-feep-bg px-4 py-3 rounded-xl border border-transparent focus:border-feep-primary focus:bg-white outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Purpose</label>
                <select required defaultValue="" className="w-full bg-feep-bg px-4 py-3 rounded-xl border border-transparent focus:border-feep-primary focus:bg-white outline-none transition-all appearance-none cursor-pointer">
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
              <textarea required rows={4} className="w-full bg-feep-bg px-4 py-3 rounded-xl border border-transparent focus:border-feep-primary focus:bg-white outline-none transition-all resize-none"></textarea>
            </div>
            <button type="submit" className="bg-feep-primary text-black w-full py-4 rounded-xl font-bold text-lg hover:bg-[#65cc00] transition-colors">
              Submit Request
            </button>
          </form>
        </FadeIn>
      </section>

      <Footer />
    </main>
  );
}
