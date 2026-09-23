"use client";

import React, { useState } from "react";
import Header from "@/components/lingodesk/Header";
import Hero from "@/components/lingodesk/Hero";
import ExamLevelTabs from "@/components/lingodesk/ExamLevelTabs";
import LessonPlayer from "@/components/lingodesk/LessonPlayer";
import ScrollingTranscript from "@/components/lingodesk/ScrollingTranscript";
import MicroLearning from "@/components/lingodesk/MicroLearning";
import PrimaryCTASection from "@/components/lingodesk/PrimaryCTASection";
import TrialModal from "@/components/lingodesk/TrialModal";
import DevicePreviewToggle from "@/components/lingodesk/DevicePreviewToggle";

import { GOETHE_EXAM_LEVELS, ExamLevel, ExamLesson } from "@/lib/lingoDeskExamData";
import { Shield, Sparkles, CheckCircle2, Globe2 } from "lucide-react";

export default function Home() {
  // Mobile Frame Device Preview Toggle State
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  // Active Goethe Level State (Default: A1)
  const [activeLevelId, setActiveLevelId] = useState<"A1" | "A2" | "B1" | "B2">("A1");

  // Get active Level Object
  const currentLevel: ExamLevel =
    GOETHE_EXAM_LEVELS.find((l) => l.id === activeLevelId) || GOETHE_EXAM_LEVELS[0];

  // Active Lesson State
  const [activeLesson, setActiveLesson] = useState<ExamLesson>(currentLevel.lessons[0]);

  // Audio / Video Playback State
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);

  // Free Trial Modal State
  const [isTrialModalOpen, setIsTrialModalOpen] = useState<boolean>(false);

  // Handle Level Selection
  const handleSelectLevel = (levelId: "A1" | "A2" | "B1" | "B2") => {
    setActiveLevelId(levelId);
    const targetLvl = GOETHE_EXAM_LEVELS.find((l) => l.id === levelId) || GOETHE_EXAM_LEVELS[0];
    setActiveLesson(targetLvl.lessons[0]);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  // Handle Lesson Selection
  const handleSelectLesson = (lesson: ExamLesson) => {
    setActiveLesson(lesson);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  // Handle Jump to Timestamp from Transcript
  const handleJumpToTimestamp = (seconds: number) => {
    setCurrentTime(seconds);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-[#001730] text-white font-sans antialiased selection:bg-[#00a8ff] selection:text-[#001730]">

      {/* Optional Device Frame Switcher Banner for Desktop Viewers */}
      <DevicePreviewToggle
        isMobileFrame={isMobileFrame}
        setIsMobileFrame={setIsMobileFrame}
      />

      {/* Main Container Wrapper (Switches to Mobile Mockup Frame when toggled) */}
      <div
        className={`mx-auto transition-all duration-300 ${
          isMobileFrame
            ? "max-w-[400px] my-6 rounded-[40px] border-[10px] border-[#002b54] shadow-2xl overflow-hidden bg-[#001833] min-h-[840px]"
            : "max-w-full"
        }`}
      >
        {/* 1. HEADER */}
        <Header onOpenTrialModal={() => setIsTrialModalOpen(true)} />

        {/* 2. HERO */}
        <Hero
          onStartTrial={() => setIsTrialModalOpen(true)}
          onExploreLessons={() => {
            const playerElem = document.getElementById("lesson-player-section");
            playerElem?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 3. EXAM LEVEL NAVIGATION */}
        <ExamLevelTabs
          levels={GOETHE_EXAM_LEVELS}
          activeLevelId={activeLevelId}
          onSelectLevel={handleSelectLevel}
          activeLesson={activeLesson}
          onSelectLesson={handleSelectLesson}
        />

        {/* 4. LEARNING CONTENT / VIDEO EXPERIENCE */}
        <div id="lesson-player-section">
          <LessonPlayer
            lesson={activeLesson}
            levelBadge={currentLevel.badge}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            playbackRate={playbackRate}
            setPlaybackRate={setPlaybackRate}
          />
        </div>

        {/* 5. DYNAMIC SCROLLING TRANSCRIPT */}
        <ScrollingTranscript
          transcript={activeLesson.transcript}
          currentTime={currentTime}
          onJumpToTimestamp={handleJumpToTimestamp}
          isPlaying={isPlaying}
        />

        {/* 6. MICRO LEARNING INFORMATION */}
        <MicroLearning lesson={activeLesson} />

        {/* 7. PRIMARY ACTION / BOTTOM CTA */}
        <PrimaryCTASection onStartTrial={() => setIsTrialModalOpen(true)} />

        {/* FOOTER */}
        <footer className="bg-[#001226] border-t border-[#002244] py-8 px-4 text-center text-xs text-slate-400 space-y-3">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#00a8ff] text-[#001730] font-black flex items-center justify-center text-xs">
                L
              </div>
              <span className="font-extrabold text-white text-sm tracking-tight">
                Lingodesk
              </span>
            </div>

            <p className="text-slate-300 font-medium">
              "Goethe-Level Competency. Netflix Price."
            </p>

            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span>Goethe A1—B2</span>
              <span>•</span>
              <span>€7 / Month</span>
              <span>•</span>
              <span>European Quality</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 pt-2 border-t border-[#001e3d]">
            &copy; {new Date().getFullYear()} Lingodesk Inc. All rights reserved. Goethe-Zertifikat is a registered trademark of Goethe-Institut e.V.
          </p>
        </footer>
      </div>

      {/* 8. FREE TRIAL MODAL */}
      <TrialModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        defaultLevelId={activeLevelId}
      />

    </div>
  );
}
