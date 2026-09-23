"use client";

import React from "react";
import { Sparkles, ShieldCheck } from "lucide-react";

interface HeaderProps {
  onOpenTrialModal: () => void;
}

export default function Header({ onOpenTrialModal }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#002244] border-b border-[#003366] px-4 py-3 shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00a8ff] to-[#00d26a] flex items-center justify-center font-black text-white text-base shadow-sm">
            L
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-white tracking-tight leading-none">
              Lingodesk
            </span>
            <span className="text-[10px] text-slate-300 font-medium tracking-wide">
              Goethe Exam Prep
            </span>
          </div>
        </div>

        {/* Minimal Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden xs:flex items-center gap-1 bg-[#001730] text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-500/30 font-semibold">
            <ShieldCheck size={13} />
            <span>€7/mo</span>
          </div>

          <button
            onClick={onOpenTrialModal}
            className="bg-[#00d26a] hover:bg-[#00c060] text-[#001730] font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-lg transition-all shadow-sm active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles size={14} className="animate-spin-slow" />
            <span>3-Day Free Trial</span>
          </button>
        </div>
      </div>
    </header>
  );
}
