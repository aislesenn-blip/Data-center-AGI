"use client";

import React from "react";
import { ExamLevel, ExamLesson } from "@/lib/lingoDeskExamData";
import { Award, BookOpen, Layers } from "lucide-react";

interface ExamLevelTabsProps {
  levels: ExamLevel[];
  activeLevelId: string;
  onSelectLevel: (levelId: "A1" | "A2" | "B1" | "B2") => void;
  activeLesson: ExamLesson;
  onSelectLesson: (lesson: ExamLesson) => void;
}

export default function ExamLevelTabs({
  levels,
  activeLevelId,
  onSelectLevel,
  activeLesson,
  onSelectLesson,
}: ExamLevelTabsProps) {
  const currentLevel = levels.find((l) => l.id === activeLevelId) || levels[0];

  return (
    <div className="bg-[#002244] border-b border-[#003366] px-4 py-3 sticky top-[57px] z-30 shadow-sm">
      <div className="max-w-4xl mx-auto space-y-3">

        {/* Horizontal Level Tabs */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1">
              <Award size={13} className="text-[#00a8ff]" />
              Select Goethe Target Level
            </span>
            <span className="text-[11px] text-[#00d26a] font-semibold">
              €7/mo — All Levels Included
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x touch-pan-x">
            {levels.map((level) => {
              const isActive = level.id === activeLevelId;
              return (
                <button
                  key={level.id}
                  onClick={() => onSelectLevel(level.id)}
                  className={`snap-start flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                    isActive
                      ? "bg-[#00d26a] text-[#001730] border-[#00d26a] shadow-md shadow-emerald-950/40"
                      : "bg-[#001730] text-slate-200 border-[#003366] hover:border-[#00a8ff]/50 hover:bg-[#002244]"
                  }`}
                >
                  <span className="text-sm">{level.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold ${
                      isActive
                        ? "bg-[#001730]/20 text-[#001730]"
                        : "bg-[#002b54] text-slate-300"
                    }`}
                  >
                    {level.lessons.length} lessons
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Level Summary Banner */}
        <div className="bg-[#001730] rounded-xl p-3 border border-[#003366] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-[#00a8ff] tracking-wide uppercase">
                {currentLevel.badge}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                • {currentLevel.recommendedTime}
              </span>
            </div>
            <p className="text-xs text-slate-200 line-clamp-1 font-medium">
              {currentLevel.description}
            </p>
          </div>

          {/* Lesson selector pills if current level has multiple lessons */}
          {currentLevel.lessons.length > 1 && (
            <div className="flex items-center gap-1.5 pt-1 sm:pt-0 overflow-x-auto">
              <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium shrink-0">
                <BookOpen size={12} />
                Lessons:
              </span>
              {currentLevel.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => onSelectLesson(lesson)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all shrink-0 cursor-pointer ${
                    activeLesson.id === lesson.id
                      ? "bg-[#00a8ff] text-[#001730]"
                      : "bg-[#002b54] text-slate-300 hover:text-white"
                  }`}
                >
                  Lesson {lesson.lessonNumber}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
