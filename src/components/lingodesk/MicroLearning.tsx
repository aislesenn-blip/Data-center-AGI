"use client";

import React, { useState } from "react";
import { ExamLesson } from "@/lib/lingoDeskExamData";
import {
  Target,
  BookOpen,
  Award,
  Lightbulb,
  Volume2,
  Check,
} from "lucide-react";

interface MicroLearningProps {
  lesson: ExamLesson;
}

export default function MicroLearning({ lesson }: MicroLearningProps) {
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  const handleSpeechPreview = (term: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(term);
      utterance.lang = "de-DE";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
    setCopiedTerm(term);
    setTimeout(() => setCopiedTerm(null), 1500);
  };

  return (
    <div className="bg-[#001730] py-6 px-4 border-t border-b border-[#003366]">
      <div className="max-w-4xl mx-auto space-y-5">

        {/* Today's Focus Header */}
        <div className="bg-[#002244] border border-[#003366] rounded-2xl p-4 shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#00d26a]/20 text-[#00d26a] flex items-center justify-center font-bold">
              <Target size={16} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#00d26a] uppercase tracking-wider">
                Micro-Learning Focus
              </span>
              <h4 className="text-sm sm:text-base font-extrabold text-white">
                {lesson.todaysFocus}
              </h4>
            </div>
          </div>
        </div>

        {/* High Yield Vocabulary Grid */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-[#00a8ff]" />
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              High-Yield Goethe Vocabulary ({lesson.vocabulary.length})
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {lesson.vocabulary.map((vocab, index) => (
              <div
                key={index}
                onClick={() => handleSpeechPreview(vocab.term)}
                className="bg-[#002244] border border-[#003366] hover:border-[#00a8ff]/40 rounded-xl p-3 space-y-1 transition-all cursor-pointer group active:scale-98"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-white group-hover:text-[#00a8ff] transition-colors">
                    {vocab.term}
                  </span>
                  <button className="text-slate-400 group-hover:text-[#00d26a] p-1 transition-colors">
                    {copiedTerm === vocab.term ? (
                      <Check size={14} className="text-[#00d26a]" />
                    ) : (
                      <Volume2 size={14} />
                    )}
                  </button>
                </div>

                <p className="text-xs font-semibold text-[#00a8ff]">
                  "{vocab.translation}"
                </p>

                <p className="text-[11px] text-slate-300 font-normal pt-0.5">
                  {vocab.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Exam Rule & Pro-Tip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {/* Official Exam Rule */}
          <div className="bg-[#002244] border border-[#003366] rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#00a8ff]">
              <Award size={15} />
              <span>Goethe Exam Scoring Rule</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-normal">
              {lesson.examRule}
            </p>
          </div>

          {/* Examiner Pro-Tip */}
          <div className="bg-[#002244] border border-[#003366] rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#00d26a]">
              <Lightbulb size={15} />
              <span>Examiner High-Score Tip</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-normal">
              {lesson.proTip}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
