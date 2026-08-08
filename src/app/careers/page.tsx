"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, MapPin, Globe } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function Careers() {
  const openPositions = [
    {
      title: "Group Scheduling Architect",
      department: "Operations & Routing",
      location: "Berlin, Germany (Hybrid)",
      type: "Full-Time",
      desc: "Architect the routing consolidation algorithms and coordinate schedules between premium bus and rail operators."
    },
    {
      title: "Staff Software Engineer, Social Graph & Discovery",
      department: "Engineering",
      location: "Munich, Germany / Remote",
      type: "Full-Time",
      desc: "Pioneer our Next.js/Tailwind platform, integrate real-time friend mapping, feed notification dispatching, and build scalable travel discovery features."
    },
    {
      title: "Senior Product Designer (Mobile First Mobile App)",
      department: "Product Design",
      location: "London, UK (Hybrid)",
      type: "Full-Time",
      desc: "Iterate on the simple, premium, Flixbus/Venmo-inspired mobile interface, designing clean travel passes, interactive cards, and smooth sheets."
    },
    {
      title: "Growth & Community Lead",
      department: "Growth & Marketing",
      location: "Amsterdam, Netherlands (Hybrid)",
      type: "Full-Time",
      desc: "Drive viral user acquisition amongst university students and frequent weekend travelers across Western and Central Europe."
    }
  ];

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
        <FadeIn className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#71E300]/10 text-brand-text px-3 py-1 rounded-full text-xs font-semibold">
            <Briefcase size={14} className="text-brand-text" />
            Careers at diaspedia
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-text">
            Build the future of <br/>
            <span className="text-zinc-500">social travel booking.</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-500 leading-relaxed max-w-2xl">
            We are looking for visionaries, operational architects, and world-class engineers. At diaspedia, we are creating a timelier, fairer social travel booking future, starting by coordinating and booking train/bus ticket routes.
          </p>
        </FadeIn>

        {/* Culture statement */}
        <FadeIn delay={0.1} className="bg-white rounded-3xl p-6 md:p-8 border border-black/5 space-y-4">
          <h2 className="text-xl font-bold text-brand-text flex items-center gap-2">
            <Globe size={18} className="text-[#71E300]" /> Our Core Philosophy
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed">
            We operate at the convergence of real-world transit utility and fluid social architecture. We prioritize real-world usability and community connection over buzzwords. If you want to build systems that everyday people use to travel and see their friends, you will find your home at diaspedia.
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
                    <span className="text-xs text-zinc-500 font-medium">{role.department}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs shrink-0">
                    <span className="flex items-center gap-1 text-zinc-500 bg-black/[0.04] px-2.5 py-1 rounded-full">
                      <MapPin size={12} /> {role.location}
                    </span>
                    <span className="text-brand-text bg-[#71E300]/15 font-semibold px-2.5 py-1 rounded-full text-[10px]">
                      {role.type}
                    </span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-zinc-500 leading-relaxed">
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
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            We are always looking for passionate builders. Send your resume and portfolio to our open talent pool.
          </p>
          <a href="mailto:careers@diaspedia.com" className="inline-block text-xs font-extrabold text-[#71E300] bg-black py-2.5 px-6 rounded-xl hover:bg-zinc-900 active:scale-95 transition-all">
            Join Our Talent Pool
          </a>
        </FadeIn>

      </div>

      <footer className="bg-black text-white py-12 px-6 text-center text-xs mt-auto">
        <p>&copy; {new Date().getFullYear()} diaspedia. All rights reserved.</p>
      </footer>

    </main>
  );
}
