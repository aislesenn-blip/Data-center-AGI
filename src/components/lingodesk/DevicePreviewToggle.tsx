"use client";

import React from "react";
import { Smartphone, Monitor } from "lucide-react";

interface DevicePreviewToggleProps {
  isMobileFrame: boolean;
  setIsMobileFrame: (mobile: boolean) => void;
}

export default function DevicePreviewToggle({
  isMobileFrame,
  setIsMobileFrame,
}: DevicePreviewToggleProps) {
  return (
    <div className="bg-[#001226] border-b border-[#002244] py-1.5 px-3 text-xs text-slate-400 flex items-center justify-between select-none">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00d26a] animate-ping" />
        <span className="font-semibold text-slate-300 hidden sm:inline">
          Lingodesk Mobile Prototype
        </span>
        <span className="text-[11px] text-[#00a8ff]">€7/mo Goethe Exam Platform</span>
      </div>

      <div className="flex items-center gap-1 bg-[#001d3a] p-1 rounded-lg border border-[#003366]">
        <button
          onClick={() => setIsMobileFrame(true)}
          className={`flex items-center gap-1 px-2 py-0.5 rounded font-semibold text-[11px] transition-all cursor-pointer ${
            isMobileFrame
              ? "bg-[#00a8ff] text-[#001730] shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Smartphone size={12} />
          <span>Mobile Phone View</span>
        </button>

        <button
          onClick={() => setIsMobileFrame(false)}
          className={`flex items-center gap-1 px-2 py-0.5 rounded font-semibold text-[11px] transition-all cursor-pointer ${
            !isMobileFrame
              ? "bg-[#00a8ff] text-[#001730] shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Monitor size={12} />
          <span>Desktop View</span>
        </button>
      </div>
    </div>
  );
}
