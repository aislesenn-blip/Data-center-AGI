"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Globe,
  User,
  Sparkles,
  ChevronDown,
  Tv,
  Users,
  Compass,
  Bookmark,
  Video
} from "lucide-react";
import { UserProfile } from "@/lib/lingoData";

interface HeaderProps {
  activeTab: "home" | "explore" | "my-learning" | "creator-studio" | "subscription" | "profile";
  setActiveTab: (tab: "home" | "explore" | "my-learning" | "creator-studio" | "subscription" | "profile") => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  userProfile: UserProfile;
  onOpenProfileSwitcher: () => void;
  onOpenOnboarding: () => void;
  selectedAudioLanguage: string;
  setSelectedAudioLanguage: (lang: string) => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  userProfile,
  onOpenProfileSwitcher,
  onOpenOnboarding,
  selectedAudioLanguage,
  setSelectedAudioLanguage,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const audioOptions = [
    { label: "Deutsch (Original)", code: "de" },
    { label: "English (Dubbed)", code: "en" },
    { label: "Français (Dubbed)", code: "fr" },
    { label: "Español (Dubbed)", code: "es" },
    { label: "Kiswahili (Dubbed)", code: "sw" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-[#141414]/95 backdrop-blur-md shadow-2xl border-b border-white/5"
          : "bg-gradient-to-b from-black/90 via-black/50 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">

        {/* Left Side: Brand Logo & Navigation Links */}
        <div className="flex items-center gap-6 lg:gap-10">
          {/* Logo */}
          <button
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-1.5 focus:outline-none group text-left cursor-pointer"
          >
            <span className="font-heading font-black text-2xl sm:text-3xl tracking-tighter text-red-600 group-hover:scale-105 transition-transform">
              LINGO<span className="text-white">DESK</span>
            </span>
            <span className="hidden sm:inline-block bg-red-600/20 text-red-400 border border-red-500/30 text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ml-1">
              Streaming
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <button
              onClick={() => setActiveTab("home")}
              className={`transition-colors cursor-pointer ${
                activeTab === "home" ? "text-white font-bold" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab("explore")}
              className={`transition-colors cursor-pointer ${
                activeTab === "explore" ? "text-white font-bold" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => setActiveTab("my-learning")}
              className={`transition-colors cursor-pointer ${
                activeTab === "my-learning" ? "text-white font-bold" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              My Learning
            </button>
            <button
              onClick={() => setActiveTab("creator-studio")}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === "creator-studio"
                  ? "text-red-400 font-bold"
                  : "text-zinc-400 hover:text-red-400"
              }`}
            >
              <Video size={15} />
              <span>Creator Studio</span>
            </button>
            <button
              onClick={() => setActiveTab("subscription")}
              className={`flex items-center gap-1 transition-colors cursor-pointer ${
                activeTab === "subscription"
                  ? "text-amber-400 font-bold"
                  : "text-zinc-400 hover:text-amber-400"
              }`}
            >
              <Sparkles size={14} className="text-amber-400" />
              <span>Plans</span>
            </button>
          </nav>
        </div>

        {/* Right Side: Search, Language Indicator, Profile */}
        <div className="flex items-center gap-3 sm:gap-5">

          {/* Search Bar */}
          <div className="relative flex items-center">
            <div
              className={`flex items-center bg-black/60 border border-zinc-700/60 rounded-full px-3 py-1.5 transition-all ${
                isSearchExpanded || searchQuery ? "w-48 sm:w-64 border-red-500/50 bg-black/80" : "w-10 sm:w-10 overflow-hidden"
              }`}
            >
              <button
                onClick={() => {
                  setIsSearchExpanded(!isSearchExpanded);
                  if (!isSearchExpanded) setActiveTab("explore");
                }}
                className="text-zinc-300 hover:text-white shrink-0 cursor-pointer"
              >
                <Search size={18} />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== "explore") setActiveTab("explore");
                }}
                placeholder="Search German, Python, Math..."
                className={`bg-transparent text-xs text-white placeholder-zinc-500 ml-2 focus:outline-none w-full ${
                  isSearchExpanded || searchQuery ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              />
            </div>
          </div>

          {/* AI Language/Dubbing Quick Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/50 px-2.5 py-1.5 rounded-full text-xs font-semibold text-zinc-300 hover:text-white transition-all cursor-pointer"
              title="Global Audio Preference"
            >
              <Globe size={15} className="text-red-500" />
              <span className="hidden sm:inline-block truncate max-w-[100px]">{selectedAudioLanguage}</span>
              <ChevronDown size={12} className="text-zinc-500" />
            </button>

            {/* Language Selector Dropdown */}
            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[#1f1f1f] border border-zinc-700 rounded-2xl shadow-2xl p-2 z-50 text-xs">
                <div className="px-3 py-2 border-b border-zinc-800 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  AI Dubbing Default Audio
                </div>
                <div className="py-1 space-y-0.5">
                  {audioOptions.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => {
                        setSelectedAudioLanguage(opt.label);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between font-medium transition-colors cursor-pointer ${
                        selectedAudioLanguage === opt.label
                          ? "bg-red-600 text-white font-bold"
                          : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {selectedAudioLanguage === opt.label && <span className="text-[10px]">Active</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Switcher & Avatar */}
          <button
            onClick={onOpenProfileSwitcher}
            className="flex items-center gap-2 p-1 bg-zinc-900/80 hover:bg-zinc-800 rounded-full border border-zinc-700/60 cursor-pointer transition-all"
          >
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-8 h-8 rounded-full object-cover border border-red-500/40"
            />
            <span className="hidden lg:inline-block text-xs font-bold text-white pr-2">
              {userProfile.name.split(" ")[0]}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
