"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, MapPin, Sparkles } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function Careers() {
  const openPositions = [
    {
      title: "Cross-border Logistics Coordinator",
      department: "Operations & Routing",
      location: "Frankfurt, Germany (Hybrid)",
      type: "Full-Time",
      desc: "Architect the consolidation algorithms and coordinate schedules between European collection hubs and African customs clearances."
    },
    {
      title: "Staff Software Engineer, Fintech Infrastructure",
      department: "Engineering",
      location: "Nairobi, Kenya / Remote",
      type: "Full-Time",
      desc: "Pioneer our Next.js/Tailwind platform, integrate multi-currency collections, and develop the foundations of our future payment corridor systems."
    },
    {
      title: "Senior Product Designer (Mobile First)",
      department: "Product Design",
      location: "London, UK (Hybrid)",
      type: "Full-Time",
      desc: "Iterate on the simple, premium, Bolt/Flixbus-inspired interface, designing the cleanest cross-border shipping and wallet experiences."
    },
    {
      title: "Compliance & Regulatory Counsel",
      department: "Legal & Regulatory",
      location: "Dar es Salaam, Tanzania (Hybrid)",
      type: "Full-Time",
      desc: "Establish secure compliance frameworks with global import regulations, banking policies, and cross-border payment compliance standards."
    }
  ];

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
        <FadeIn className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-text px-3 py-1 rounded-full text-xs font-semibold">
            <Briefcase size={14} className="text-brand-text" />
            Careers at diaspedia
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-text">
            Build the future of <br/>
            <span className="text-brand-text-muted">cross-border trust.</span>
          </h1>
          <p className="text-sm md:text-base text-brand-text-muted leading-relaxed max-w-2xl">
            We are looking for visionaries, operational architects, and world-class engineers. At diaspedia, we are creating a timelier, fairer cross-border payments future starting by grouping cargo demand across continents.
          </p>
        </FadeIn>

        {/* Culture statement */}
        <FadeIn delay={0.1} className="bg-white rounded-3xl p-6 md:p-8 border border-black/5 space-y-4">
          <h2 className="text-xl font-bold text-brand-text flex items-center gap-2">
            <Sparkles size={18} className="text-brand-primary" /> Our Core Philosophy
          </h2>
          <p className="text-sm text-brand-text-muted leading-relaxed">
            We operate at the convergence of heavy logistics and fluid software architecture. We prioritize real-world usability and trust over buzzwords. If you want to build systems that everyday people use to support their families across thousands of miles, you will find your home at diaspedia.
          </p>
        </FadeIn>

        {/* Open roles list */}
        <FadeIn delay={0.2} className="space-y-6">
          <h2 className="text-2xl font-bold text-brand-text">Open Opportunities</h2>

          <div className="grid grid-cols-1 gap-4">
            {openPositions.map((role, i) => (
              <div key={i} className="bg-white/50 border border-black/5 rounded-2xl p-5 hover:border-black/10 transition-all space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-base text-brand-text">{role.title}</h3>
                    <span className="text-xs text-brand-text-muted font-medium">{role.department}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs shrink-0">
                    <span className="flex items-center gap-1 text-brand-text-muted bg-black/[0.04] px-2.5 py-1 rounded-full">
                      <MapPin size={12} /> {role.location}
                    </span>
                    <span className="text-brand-text bg-brand-primary/15 font-semibold px-2.5 py-1 rounded-full text-[10px]">
                      {role.type}
                    </span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed">
                  {role.desc}
                </p>

                <div className="pt-2">
                  <a
                    href="mailto:careers@diaspedia.com"
                    className="inline-flex text-xs font-bold text-brand-text hover:underline"
                  >
                    Apply Now &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Contact/Talent community block */}
        <FadeIn delay={0.3} className="pt-8 border-t border-black/5 text-center space-y-3">
          <h3 className="font-bold text-base text-brand-text">Don&apos;t see your role?</h3>
          <p className="text-xs text-brand-text-muted max-w-sm mx-auto">
            We are always looking for passionate builders. Send your resume and portfolio to our open talent pool.
          </p>
          <a href="mailto:careers@diaspedia.com" className="inline-block text-xs font-extrabold text-brand-text bg-brand-primary py-2.5 px-6 rounded-xl hover:bg-brand-primary-hover active:scale-95 transition-all">
            Join Our Talent Pool
          </a>
        </FadeIn>

      </div>

      <footer className="bg-brand-text text-white py-12 px-6 text-center text-xs mt-auto">
        <p>&copy; {new Date().getFullYear()} diaspedia. All rights reserved.</p>
      </footer>

    </main>
  );
}
