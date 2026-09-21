"use client";

import { UserProfile } from "@/lib/lingoData";
import { Award, Clock, Sparkles, Globe, Shield, Users, LogOut } from "lucide-react";

interface ProfileViewProps {
  userProfile: UserProfile;
  onOpenProfileSwitcher: () => void;
  onOpenOnboarding: () => void;
  onOpenSubscription: () => void;
}

export default function ProfileView({
  userProfile,
  onOpenProfileSwitcher,
  onOpenOnboarding,
  onOpenSubscription,
}: ProfileViewProps) {
  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 select-none animate-fadeIn">

      {/* Header Profile Card */}
      <div className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-2xl">
        <img
          src={userProfile.avatar}
          alt={userProfile.name}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-red-600/80 shadow-2xl"
        />

        <div className="space-y-3 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">
              {userProfile.name}
            </h1>
            <span className="bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-black px-2.5 py-1 rounded-full uppercase">
              {userProfile.subscriptionPlan} Member
            </span>
          </div>

          <p className="text-xs text-zinc-400 font-medium">
            Preferred Language: <span className="text-white font-bold">{userProfile.preferredLanguage}</span>
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
            <button
              onClick={onOpenProfileSwitcher}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Users size={14} />
              <span>Switch Family Profile</span>
            </button>

            <button
              onClick={onOpenSubscription}
              className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles size={14} />
              <span>Manage Subscription</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-[#181818] border border-zinc-800 p-5 rounded-2xl text-center space-y-1">
          <Clock size={20} className="mx-auto text-red-500" />
          <div className="text-2xl font-black text-white">{userProfile.hoursLearned} hrs</div>
          <p className="text-[11px] font-bold text-zinc-400 uppercase">Total Watch Time</p>
        </div>

        <div className="bg-[#181818] border border-zinc-800 p-5 rounded-2xl text-center space-y-1">
          <Award size={20} className="mx-auto text-emerald-400" />
          <div className="text-2xl font-black text-white">{userProfile.completedCoursesCount}</div>
          <p className="text-[11px] font-bold text-zinc-400 uppercase">Courses Completed</p>
        </div>

        <div className="bg-[#181818] border border-zinc-800 p-5 rounded-2xl text-center space-y-1 col-span-2 sm:col-span-1">
          <Globe size={20} className="mx-auto text-amber-400" />
          <div className="text-2xl font-black text-white">Global</div>
          <p className="text-[11px] font-bold text-zinc-400 uppercase">AI Dubbing Active</p>
        </div>
      </div>

      {/* Learning Interests */}
      <div className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-white">Your Learning Interests</h3>
          <button
            onClick={onOpenOnboarding}
            className="text-xs font-bold text-red-400 hover:underline cursor-pointer"
          >
            Edit Preferences
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {userProfile.interests.map((interest) => (
            <span
              key={interest}
              className="px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-bold text-zinc-200"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
