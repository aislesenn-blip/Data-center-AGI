"use client";

import { X, Plus, Check } from "lucide-react";
import { UserProfile } from "@/lib/lingoData";

interface FamilyProfileSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile;
  onSwitchProfile: (profile: UserProfile) => void;
}

export default function FamilyProfileSwitcher({
  isOpen,
  onClose,
  currentProfile,
  onSwitchProfile,
}: FamilyProfileSwitcherProps) {
  if (!isOpen) return null;

  const familyProfiles: UserProfile[] = [
    {
      id: "user-alex",
      name: "Alex Vance",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop",
      role: "learner",
      preferredLanguage: "English (US)",
      interests: ["Languages", "Mathematics", "Technology", "Science"],
      hoursLearned: 48,
      completedCoursesCount: 6,
      subscriptionPlan: "Family"
    },
    {
      id: "user-elena",
      name: "Elena (Language Focus)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
      role: "learner",
      preferredLanguage: "Deutsch (DE)",
      interests: ["Languages", "Cooking", "Business"],
      hoursLearned: 32,
      completedCoursesCount: 4,
      subscriptionPlan: "Family"
    },
    {
      id: "user-leo-kids",
      name: "Leo (Science & Math - Kids)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      role: "learner",
      preferredLanguage: "English (US)",
      interests: ["Science", "Mathematics", "Music"],
      hoursLearned: 19,
      completedCoursesCount: 2,
      subscriptionPlan: "Family"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
      <div className="relative w-full max-w-xl bg-[#181818] border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-center text-white">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="space-y-1">
          <h2 className="text-2xl font-heading font-black text-white">Who is learning?</h2>
          <p className="text-xs text-zinc-400">Switch profiles to load personalized progress & recommendations.</p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-3 gap-4 pt-2">
          {familyProfiles.map((p) => {
            const isSelected = currentProfile.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  onSwitchProfile(p);
                  onClose();
                }}
                className="group flex flex-col items-center space-y-2 cursor-pointer focus:outline-none"
              >
                <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 transition-all group-hover:scale-105 ${
                  isSelected ? "border-sky-400 ring-4 ring-sky-500/30" : "border-slate-700 group-hover:border-white"
                }`}>
                  <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                  {isSelected && (
                    <div className="absolute inset-0 bg-sky-500/30 flex items-center justify-center">
                      <Check size={24} className="text-white drop-shadow" />
                    </div>
                  )}
                </div>
                <span className={`text-xs font-bold truncate max-w-[100px] ${isSelected ? "text-white font-black" : "text-zinc-400 group-hover:text-white"}`}>
                  {p.name.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
