"use client";

import { Play, Plus, Check, Info, Sparkles, Volume2, VolumeX } from "lucide-react";
import { Course } from "@/lib/lingoData";
import { useState } from "react";

interface HeroProps {
  featuredCourse: Course;
  onPlayCourse: (course: Course) => void;
  onOpenCourseDetail: (course: Course) => void;
  isSaved: boolean;
  onToggleSave: (courseId: string) => void;
}

export default function Hero({
  featuredCourse,
  onPlayCourse,
  onOpenCourseDetail,
  isSaved,
  onToggleSave,
}: HeroProps) {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="relative w-full h-[75vh] min-h-[520px] max-h-[750px] flex items-end pb-12 sm:pb-16 overflow-hidden bg-black select-none">

      {/* Background Cinematic Image / Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={featuredCourse.backdrop}
          alt={featuredCourse.title}
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 filter brightness-90 contrast-105"
        />

        {/* Multi-layered Netflix-style Vignette & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/70 to-transparent w-full md:w-3/4 z-10" />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 to-transparent z-10" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-4 sm:space-y-6">

        {/* Badge & Title */}
        <div className="max-w-2xl space-y-2 sm:space-y-3">
          {featuredCourse.badge && (
            <div className="inline-flex items-center gap-1.5 bg-red-600/90 text-white font-black text-[11px] sm:text-xs px-2.5 py-1 rounded tracking-wider uppercase shadow-lg backdrop-blur-sm">
              <Sparkles size={13} className="text-amber-300" />
              <span>{featuredCourse.badge}</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-white tracking-tight leading-none drop-shadow-2xl">
            {featuredCourse.title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg font-medium text-zinc-300 line-clamp-2 md:line-clamp-3 leading-relaxed max-w-xl text-shadow">
            &laquo;{featuredCourse.subtitle}&raquo;
          </p>
        </div>

        {/* Metadata Line */}
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-zinc-300">
          <span className="text-emerald-400 font-bold">{featuredCourse.matchScore}% Match</span>
          <span className="w-1 h-1 rounded-full bg-zinc-600" />
          <span className="px-2 py-0.5 rounded border border-zinc-700 bg-zinc-900/60 text-zinc-200">
            {featuredCourse.level}
          </span>
          <span className="w-1 h-1 rounded-full bg-zinc-600" />
          <span>{featuredCourse.episodesCount} Episodes</span>
          <span className="w-1 h-1 rounded-full bg-zinc-600" />
          <span>{featuredCourse.duration}</span>
          <span className="w-1 h-1 rounded-full bg-zinc-600" />
          <span className="text-amber-400 font-bold">{featuredCourse.originalLanguage}</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Start Learning Button */}
          <button
            onClick={() => onPlayCourse(featuredCourse)}
            className="flex items-center gap-2.5 bg-white hover:bg-zinc-200 text-black font-black text-sm sm:text-base px-6 py-3 rounded-xl transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
          >
            <Play size={20} className="fill-black" />
            <span>Start Learning</span>
          </button>

          {/* Add to My Learning Button */}
          <button
            onClick={() => onToggleSave(featuredCourse.id)}
            className={`flex items-center gap-2 font-bold text-sm sm:text-base px-5 py-3 rounded-xl border transition-all cursor-pointer shadow-lg backdrop-blur-md ${
              isSaved
                ? "bg-zinc-800/90 text-white border-zinc-600 hover:bg-zinc-700"
                : "bg-zinc-900/70 hover:bg-zinc-800 text-white border-zinc-700/80"
            }`}
          >
            {isSaved ? (
              <>
                <Check size={18} className="text-emerald-400" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Plus size={18} />
                <span>My Learning</span>
              </>
            )}
          </button>

          {/* More Info Button */}
          <button
            onClick={() => onOpenCourseDetail(featuredCourse)}
            className="flex items-center gap-2 bg-zinc-900/70 hover:bg-zinc-800 text-white font-bold text-sm sm:text-base px-5 py-3 rounded-xl border border-zinc-700/80 transition-all cursor-pointer shadow-lg backdrop-blur-md"
          >
            <Info size={18} />
            <span>More Info</span>
          </button>
        </div>
      </div>

      {/* Audio Mute / Unmute Floating Toggle */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute right-6 bottom-16 z-20 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/90 transition-all cursor-pointer"
        title={isMuted ? "Unmute Ambient Preview" : "Mute Preview"}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </section>
  );
}
