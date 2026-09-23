"use client";

import React, { useState, useEffect } from "react";
import { ExamLesson } from "@/lib/lingoDeskExamData";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Gauge,
  Headphones,
  CheckCircle2,
  Bookmark,
  Sparkles,
} from "lucide-react";

interface LessonPlayerProps {
  lesson: ExamLesson;
  levelBadge: string;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  playbackRate: number;
  setPlaybackRate: (rate: number) => void;
  onLessonComplete?: () => void;
}

export default function LessonPlayer({
  lesson,
  levelBadge,
  currentTime,
  setCurrentTime,
  isPlaying,
  setIsPlaying,
  playbackRate,
  setPlaybackRate,
}: LessonPlayerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Auto-advance playback timer when active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= lesson.durationSeconds) {
            setIsPlaying(false);
            return lesson.durationSeconds;
          }
          return prev + 1;
        });
      }, 1000 / playbackRate);
    }
    return () => clearInterval(interval);
  }, [isPlaying, lesson.durationSeconds, playbackRate, setCurrentTime, setIsPlaying]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCurrentTime(val);
  };

  const togglePlay = () => {
    if (currentTime >= lesson.durationSeconds) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPercent = Math.min(
    100,
    (currentTime / lesson.durationSeconds) * 100
  );

  return (
    <div className="bg-[#002244] border-b border-[#003366] px-4 py-5">
      <div className="max-w-4xl mx-auto space-y-3">

        {/* Player Container Card */}
        <div className="bg-gradient-to-br from-[#001730] to-[#002244] rounded-2xl border border-[#003366] overflow-hidden shadow-xl relative">

          {/* Top Video Stage / Visual Canvas */}
          <div className="relative aspect-video sm:aspect-[21/9] bg-[#001024] flex flex-col justify-between p-4 sm:p-6 select-none overflow-hidden group">

            {/* Background Graphic Pattern / Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#003366]/40 via-transparent to-transparent pointer-events-none" />

            {/* Top Bar inside Player */}
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="bg-[#00d26a] text-[#001730] text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {levelBadge}
                </span>
                <span className="bg-[#002b54] text-slate-200 text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#003366]">
                  {lesson.examComponent} Exam Focus
                </span>
              </div>

              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  isSaved
                    ? "bg-[#00a8ff]/20 text-[#00a8ff] border-[#00a8ff]"
                    : "bg-[#001c38]/80 text-slate-400 border-[#003366] hover:text-white"
                }`}
                title="Bookmark Lesson"
              >
                <Bookmark size={16} className={isSaved ? "fill-current" : ""} />
              </button>
            </div>

            {/* Center Lesson Title & Animated Visualizer */}
            <div className="relative z-10 text-center space-y-2 my-auto py-2">
              <div className="inline-flex items-center gap-1.5 text-xs text-[#00a8ff] font-bold">
                <Headphones size={14} className={isPlaying ? "animate-bounce" : ""} />
                <span>Simulated Goethe Masterclass Lesson</span>
              </div>

              <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-snug max-w-xl mx-auto">
                {lesson.title}
              </h2>

              {/* Dynamic Equalizer / Sound Wave Animation when Playing */}
              <div className="flex items-center justify-center gap-1 h-8 pt-1">
                {[40, 70, 30, 90, 60, 100, 50, 80, 45, 85, 35, 75].map((h, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full bg-gradient-to-t from-[#00a8ff] to-[#00d26a] transition-all duration-300 ${
                      isPlaying ? "animate-pulse" : "opacity-40"
                    }`}
                    style={{
                      height: isPlaying ? `${Math.max(15, (h * (i % 2 === 0 ? 0.9 : 1.1)))}%` : "20%",
                      animationDelay: `${i * 120}ms`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Floating Overlay Play Button when paused */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#00d26a] text-[#001730] flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer"
              >
                <Play size={28} className="fill-current ml-1" />
              </button>
            )}

            {/* Bottom Status bar overlay */}
            <div className="relative z-10 flex items-center justify-between text-slate-300 text-xs pt-2">
              <span className="font-mono text-slate-200">
                {formatTime(currentTime)} / {lesson.duration}
              </span>
              <span className="text-[11px] text-[#00d26a] font-medium flex items-center gap-1">
                <Sparkles size={12} />
                Synchronized Goethe Transcript
              </span>
            </div>
          </div>

          {/* Player Bottom Control Strip */}
          <div className="p-3 sm:p-4 bg-[#001730] border-t border-[#003366] space-y-2.5">

            {/* Scrubber Range Bar */}
            <div className="relative flex items-center group">
              <input
                type="range"
                min={0}
                max={lesson.durationSeconds}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-[#002b54] rounded-lg appearance-none cursor-pointer accent-[#00d26a] focus:outline-none"
              />
              <div
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#00a8ff] to-[#00d26a] rounded-lg pointer-events-none h-2"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between gap-2 pt-1">
              {/* Left Play/Pause & Reset */}
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-xl bg-[#00d26a] hover:bg-[#00c060] text-[#001730] flex items-center justify-center font-bold transition-all active:scale-95 cursor-pointer shadow-sm"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause size={18} className="fill-current" />
                  ) : (
                    <Play size={18} className="fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={() => setCurrentTime(0)}
                  className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#002b54] transition-all cursor-pointer"
                  title="Restart Lesson"
                >
                  <RotateCcw size={16} />
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#002b54] transition-all cursor-pointer"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>

              {/* Right Speed Selector */}
              <div className="flex items-center gap-1.5 bg-[#002244] border border-[#003366] rounded-lg px-2 py-1">
                <Gauge size={13} className="text-[#00a8ff]" />
                <span className="text-[11px] text-slate-300 font-semibold hidden xs:inline">
                  Speed:
                </span>
                {[0.8, 1.0, 1.2].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setPlaybackRate(rate)}
                    className={`text-[11px] px-1.5 py-0.5 rounded font-bold transition-all cursor-pointer ${
                      playbackRate === rate
                        ? "bg-[#00a8ff] text-[#001730]"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Lesson Description */}
        <div className="text-xs text-slate-300 px-1 font-normal flex items-start gap-2">
          <CheckCircle2 size={15} className="text-[#00d26a] mt-0.5 shrink-0" />
          <span>{lesson.description}</span>
        </div>

      </div>
    </div>
  );
}
