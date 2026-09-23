"use client";

import React from "react";
import { CheckCircle2, ArrowRight, Play, Shield } from "lucide-react";

interface HeroProps {
  onStartTrial: () => void;
  onExploreLessons: () => void;
}

export default function Hero({ onStartTrial, onExploreLessons }: HeroProps) {
  return (
    <section className="bg-gradient-to-b from-[#002244] via-[#001c38] to-[#001833] text-white px-4 pt-6 pb-8 border-b border-[#003366]/50">
      <div className="max-w-4xl mx-auto text-center space-y-4">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#003366]/60 border border-[#00a8ff]/30 text-[#00a8ff] text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
          <Shield size={13} className="text-[#00d26a]" />
          <span>Official Goethe Exam Alignment (A1 — B2)</span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
          Goethe-Level Competency. <br className="hidden xs:inline" />
          <span className="text-[#00a8ff] underline decoration-[#00d26a] decoration-2 underline-offset-4">
            Netflix Price.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
          Pass your German exams for just <span className="font-bold text-white bg-[#002b54] px-1.5 py-0.5 rounded border border-[#00a8ff]/40">€7/month</span>. High-yield short video lessons, synchronized transcripts, listening drills, and exam-proven strategies.
        </p>

        {/* Trust points */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-300 font-medium pt-1">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={15} className="text-[#00d26a]" />
            <span>Goethe A1, A2, B1, B2</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={15} className="text-[#00d26a]" />
            <span>3-Day Free Trial</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={15} className="text-[#00d26a]" />
            <span>Cancel Anytime</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col xs:flex-row items-center justify-center gap-3 pt-3 max-w-md mx-auto">
          <button
            onClick={onStartTrial}
            className="w-full xs:w-auto bg-[#00d26a] hover:bg-[#00c060] text-[#001730] font-bold text-base px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-emerald-900/30 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Your 3-Day Free Trial</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={onExploreLessons}
            className="w-full xs:w-auto bg-[#002b54] hover:bg-[#003366] text-white font-semibold text-sm px-5 py-3 rounded-xl border border-[#003366] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play size={15} className="fill-current text-[#00a8ff]" />
            <span>Preview Sample Lesson</span>
          </button>
        </div>

      </div>
    </section>
  );
}
