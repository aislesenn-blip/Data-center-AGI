"use client";

import { useState } from "react";
import { X, Check, Sparkles, ArrowRight } from "lucide-react";
import { ALL_SUBJECTS, SubjectCategory } from "@/lib/lingoData";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (selectedInterests: SubjectCategory[]) => void;
}

export default function OnboardingModal({
  isOpen,
  onClose,
  onComplete,
}: OnboardingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedInterests, setSelectedInterests] = useState<SubjectCategory[]>([
    "Languages",
    "Mathematics",
    "Technology",
  ]);
  const [selectedLevel, setSelectedLevel] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");
  const [selectedStyle, setSelectedStyle] = useState<string>("Learning from experts");

  if (!isOpen) return null;

  const toggleInterest = (subject: SubjectCategory) => {
    if (selectedInterests.includes(subject)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((s) => s !== subject));
      }
    } else {
      setSelectedInterests([...selectedInterests, subject]);
    }
  };

  const levels = ["Beginner", "Intermediate", "Advanced"] as const;
  const styles = [
    "Short bite-sized lessons",
    "Deep immersive series",
    "Practical real-world projects",
    "Learning from top human experts",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1120]/90 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0f172a] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-white">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-400">
            <span className="text-sky-400 uppercase tracking-widest font-black">Step {step} of 3</span>
            <span>{step === 1 ? "Interests" : step === 2 ? "Level" : step === 3 ? "Style" : "Ready"}</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-sky-500 h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Interests */}
        {step === 1 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
                What do you want to learn?
              </h2>
              <p className="text-sm text-slate-300 font-medium">
                Select your primary subjects. You can explore everything else anytime.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-64 overflow-y-auto pr-1">
              {ALL_SUBJECTS.map((subject) => {
                const isSelected = selectedInterests.includes(subject);
                return (
                  <button
                    key={subject}
                    onClick={() => toggleInterest(subject)}
                    className={`p-3.5 rounded-2xl text-xs font-bold text-left transition-all border cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-sky-500/20 text-white border-sky-500/80 shadow-md"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <span>{subject}</span>
                    {isSelected && <Check size={14} className="text-sky-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-sky-500 hover:bg-sky-400 text-white font-black text-sm py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl"
            >
              <span>Continue</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Step 2: Level */}
        {step === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
                What&apos;s your current level?
              </h2>
              <p className="text-sm text-slate-300 font-medium">
                We&apos;ll tailor the hero featured content and recommendations to your depth.
              </p>
            </div>

            <div className="space-y-3">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                    selectedLevel === lvl
                      ? "bg-sky-500/20 border-sky-500 text-white font-bold"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold text-white">{lvl}</div>
                    <p className="text-xs text-slate-300 font-normal mt-0.5">
                      {lvl === "Beginner"
                        ? "Starting fresh or building fundamental intuition."
                        : lvl === "Intermediate"
                        ? "Comfortable with basics, seeking deeper mastery."
                        : "Advanced concepts, complex projects, and theory."}
                    </p>
                  </div>
                  {selectedLevel === lvl && <Check size={16} className="text-sky-400 shrink-0" />}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm py-4 rounded-2xl cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 bg-sky-500 hover:bg-sky-400 text-white font-black text-sm py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl"
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Style */}
        {step === 3 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
                How do you like to learn?
              </h2>
              <p className="text-sm text-slate-300 font-medium">
                Choose your preferred learning format.
              </p>
            </div>

            <div className="space-y-2.5">
              {styles.map((stl) => (
                <button
                  key={stl}
                  onClick={() => setSelectedStyle(stl)}
                  className={`w-full p-4 rounded-2xl text-left border text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                    selectedStyle === stl
                      ? "bg-sky-500/20 border-sky-500 text-white"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span>{stl}</span>
                  {selectedStyle === stl && <Check size={16} className="text-sky-400 shrink-0" />}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm py-4 rounded-2xl cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => {
                  onComplete(selectedInterests);
                  onClose();
                }}
                className="w-2/3 bg-sky-500 hover:bg-sky-400 text-white font-black text-sm py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl"
              >
                <Sparkles size={16} />
                <span>Your LingoDesk is Ready</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
