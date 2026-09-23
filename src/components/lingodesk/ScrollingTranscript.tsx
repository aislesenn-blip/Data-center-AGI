"use client";

import React, { useRef, useEffect } from "react";
import { TranscriptItem } from "@/lib/lingoDeskExamData";
import { MessageSquare, Sparkles, Volume2, Compass } from "lucide-react";

interface ScrollingTranscriptProps {
  transcript: TranscriptItem[];
  currentTime: number;
  onJumpToTimestamp: (secs: number) => void;
  isPlaying: boolean;
}

export default function ScrollingTranscript({
  transcript,
  currentTime,
  onJumpToTimestamp,
  isPlaying,
}: ScrollingTranscriptProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Determine active item index based on current time
  let activeIndex = 0;
  for (let i = 0; i < transcript.length; i++) {
    if (currentTime >= transcript[i].timestamp) {
      activeIndex = i;
    }
  }

  // Auto-scroll active item into view smoothly
  useEffect(() => {
    if (itemRefs.current[activeIndex] && containerRef.current) {
      itemRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="bg-[#001833] py-5 px-4">
      <div className="max-w-4xl mx-auto space-y-3">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#00a8ff]/20 text-[#00a8ff] flex items-center justify-center font-bold text-xs">
              <MessageSquare size={14} />
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Synchronized Exam Transcript
            </h3>
          </div>

          <div className="text-[11px] text-[#00d26a] font-medium flex items-center gap-1">
            <Sparkles size={12} />
            <span>Click any line to jump audio</span>
          </div>
        </div>

        {/* Dynamic Transcript Reader Box */}
        <div
          ref={containerRef}
          className="bg-[#002244] border border-[#003366] rounded-2xl p-3 sm:p-4 max-h-[320px] overflow-y-auto space-y-3 scroll-smooth shadow-inner"
        >
          {transcript.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onClick={() => onJumpToTimestamp(item.timestamp)}
                className={`p-3 rounded-xl border transition-all cursor-pointer group select-none ${
                  isActive
                    ? "bg-[#002b54] border-[#00d26a] shadow-lg shadow-emerald-950/30 ring-1 ring-[#00d26a]/50 scale-[1.01]"
                    : "bg-[#001730]/60 border-[#003366]/60 hover:border-[#00a8ff]/40 hover:bg-[#001730]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">

                  {/* Speaker & Timestamp badge */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        isActive
                          ? "bg-[#00d26a] text-[#001730]"
                          : "bg-[#001833] text-slate-400 group-hover:text-slate-200"
                      }`}
                    >
                      {formatTime(item.timestamp)}
                    </span>

                    {item.speaker && (
                      <span className="text-[11px] font-semibold text-[#00a8ff] hidden xs:inline">
                        {item.speaker}:
                      </span>
                    )}
                  </div>

                  {/* Context Note Tag */}
                  <span className="text-[10px] text-slate-300 bg-[#001833]/80 px-2 py-0.5 rounded border border-[#003366] line-clamp-1">
                    {item.context}
                  </span>
                </div>

                {/* Main Lines */}
                <div className="mt-2 space-y-1">
                  {/* German Sentence */}
                  <p
                    className={`text-sm sm:text-base font-bold leading-snug transition-colors ${
                      isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                    }`}
                  >
                    {item.german}
                  </p>

                  {/* English Meaning */}
                  <p
                    className={`text-xs leading-relaxed transition-colors ${
                      isActive ? "text-[#00a8ff] font-medium" : "text-slate-300 font-normal"
                    }`}
                  >
                    "{item.english}"
                  </p>
                </div>

                {/* Active Line Playing Indicator */}
                {isActive && isPlaying && (
                  <div className="mt-2 pt-2 border-t border-[#003366] flex items-center justify-between text-[11px] text-[#00d26a] font-semibold">
                    <span className="flex items-center gap-1">
                      <Volume2 size={13} className="animate-pulse" />
                      Currently Listening
                    </span>
                    <span className="text-slate-400 font-normal text-[10px]">
                      Goethe Exam Key Sentence
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
