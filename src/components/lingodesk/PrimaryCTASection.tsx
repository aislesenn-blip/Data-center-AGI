"use client";

import React from "react";
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Zap } from "lucide-react";

interface PrimaryCTASectionProps {
  onStartTrial: () => void;
}

export default function PrimaryCTASection({ onStartTrial }: PrimaryCTASectionProps) {
  return (
    <section className="bg-gradient-to-b from-[#001833] via-[#002244] to-[#001730] text-white py-12 px-4 border-t border-[#003366]">
      <div className="max-w-3xl mx-auto text-center space-y-6">

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-[#00d26a]/15 text-[#00d26a] border border-[#00d26a]/30 text-xs font-bold px-3 py-1 rounded-full">
          <Zap size={14} />
          <span>3-Day Free Trial • Instant Goethe Access</span>
        </div>

        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Goethe-Level Competency. <br />
            <span className="text-[#00a8ff]">Just €7/Month.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto font-normal">
            No long-term contracts. No expensive €300 language school fees. Everything you need to pass Goethe A1, A2, B1, and B2.
          </p>
        </div>

        {/* Key Features Bullet List */}
        <div className="bg-[#001730] border border-[#003366] rounded-2xl p-5 text-left max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-start gap-2.5 text-xs text-slate-200 font-medium">
            <CheckCircle2 size={16} className="text-[#00d26a] shrink-0 mt-0.5" />
            <span>Complete Goethe A1 — B2 Exam Curriculum</span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-slate-200 font-medium">
            <CheckCircle2 size={16} className="text-[#00d26a] shrink-0 mt-0.5" />
            <span>Synchronized Lyrics-Style German Transcripts</span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-slate-200 font-medium">
            <CheckCircle2 size={16} className="text-[#00d26a] shrink-0 mt-0.5" />
            <span>High-Yield Short Video & Audio Lessons</span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-slate-200 font-medium">
            <CheckCircle2 size={16} className="text-[#00d26a] shrink-0 mt-0.5" />
            <span>Exam Scoring Tips & Vocabulary Drills</span>
          </div>
        </div>

        {/* Pricing Card Banner */}
        <div className="bg-gradient-to-r from-[#002244] to-[#002b54] p-4 rounded-xl border border-[#00a8ff]/30 max-w-md mx-auto flex items-center justify-between">
          <div className="text-left">
            <span className="text-xs text-slate-300 font-medium">Monthly Plan</span>
            <div className="text-xl sm:text-2xl font-black text-white">
              €7 <span className="text-xs font-normal text-slate-300">/ month</span>
            </div>
          </div>
          <div className="text-right">
            <span className="bg-[#00d26a] text-[#001730] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
              3 Days Free
            </span>
            <p className="text-[11px] text-slate-300 mt-1">Then €7/mo. Cancel anytime.</p>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2 max-w-md mx-auto space-y-3">
          <button
            onClick={onStartTrial}
            className="w-full bg-[#00d26a] hover:bg-[#00c060] text-[#001730] font-black text-base sm:text-lg py-3.5 px-6 rounded-xl transition-all shadow-xl hover:shadow-emerald-950/50 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles size={18} />
            <span>Start Your 3-Day Free Trial</span>
            <ArrowRight size={18} />
          </button>

          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
            <ShieldCheck size={14} className="text-[#00a8ff]" />
            <span>Instant activation. No credit card required for trial preview.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
