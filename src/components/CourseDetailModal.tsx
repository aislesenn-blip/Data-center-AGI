"use client";

import { useState } from "react";
import {
  X,
  Play,
  Plus,
  Check,
  Star,
  Globe,
  Clock,
  Sparkles,
  BookOpen,
  UserCheck,
  Layers,
  Volume2,
  FileText,
  Share2
} from "lucide-react";
import { Course, Lesson, Teacher, TEACHERS } from "@/lib/lingoData";

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onPlayLesson: (course: Course, lesson: Lesson) => void;
  isSaved: boolean;
  onToggleSave: (courseId: string) => void;
  onOpenTeacherProfile: (teacher: Teacher) => void;
  allCourses: Course[];
}

export default function CourseDetailModal({
  course,
  onClose,
  onPlayLesson,
  isSaved,
  onToggleSave,
  onOpenTeacherProfile,
  allCourses,
}: CourseDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"episodes" | "about" | "localization" | "similar">("episodes");
  const [copiedShare, setCopiedShare] = useState(false);

  if (!course) return null;

  const teacher = TEACHERS.find((t) => t.id === course.teacherId) || {
    id: course.teacherId,
    name: course.teacherName,
    title: "Expert Educator",
    avatar: course.teacherAvatar,
    bio: "Passionate educator on LingoDesk.",
    rating: course.rating,
    learnersCount: 25000,
    watchTimeHours: 85000,
    nativeLanguage: course.originalLanguage,
  };

  const relatedCourses = allCourses
    .filter((c) => c.subject === course.subject && c.id !== course.id)
    .slice(0, 3);

  const handleShare = () => {
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex justify-center items-start p-2 sm:p-4 md:p-6 select-none animate-fadeIn">

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#181818] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl my-4 sm:my-8 text-white">

        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 p-2.5 rounded-full bg-black/70 border border-white/20 text-white hover:bg-black transition-all cursor-pointer shadow-lg"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Backdrop & Header Banner */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-black">
          <img
            src={course.backdrop}
            alt={course.title}
            className="w-full h-full object-cover filter brightness-90 contrast-105"
          />

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#181818] via-[#181818]/60 to-transparent w-full sm:w-2/3" />

          {/* Banner Meta Content */}
          <div className="absolute bottom-6 left-6 right-6 z-20 space-y-3">
            {course.badge && (
              <span className="inline-flex items-center gap-1.5 bg-red-600/90 text-white font-black text-[10px] sm:text-xs px-2.5 py-1 rounded uppercase tracking-wider shadow">
                <Sparkles size={12} className="text-amber-300" />
                <span>{course.badge}</span>
              </span>
            )}

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-xs sm:text-sm font-medium text-zinc-300 max-w-xl line-clamp-2">
              {course.subtitle}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onPlayLesson(course, course.lessons[0])}
                className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-black font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xl active:scale-95"
              >
                <Play size={16} className="fill-black" />
                <span>Start Lesson 1</span>
              </button>

              <button
                onClick={() => onToggleSave(course.id)}
                className={`flex items-center gap-2 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl border transition-all cursor-pointer backdrop-blur-md ${
                  isSaved
                    ? "bg-zinc-800 text-emerald-400 border-emerald-500"
                    : "bg-zinc-900/80 hover:bg-zinc-800 text-white border-zinc-700"
                }`}
              >
                {isSaved ? <Check size={16} /> : <Plus size={16} />}
                <span>{isSaved ? "Saved" : "My Learning"}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white cursor-pointer relative"
                title="Share Course"
              >
                <Share2 size={16} />
                {copiedShare && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded shadow border border-zinc-700">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Course Stats Row */}
        <div className="px-6 py-4 bg-[#141414] border-y border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-zinc-300">
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-bold">{course.matchScore}% Match</span>
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <Star size={13} className="fill-amber-400" />
              <span>{course.rating}</span>
            </span>
            <span className="px-2 py-0.5 rounded border border-zinc-700 bg-zinc-900 text-zinc-200">
              {course.level}
            </span>
            <span>{course.duration}</span>
            <span>{course.lessons.length} Episodes</span>
          </div>

          {/* Teacher Badge Clickable */}
          <button
            onClick={() => onOpenTeacherProfile(teacher)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer group"
          >
            <img
              src={teacher.avatar}
              alt={teacher.name}
              className="w-6 h-6 rounded-full object-cover border border-zinc-500"
            />
            <span className="text-zinc-300 group-hover:text-red-400 font-bold">
              Teacher: {teacher.name}
            </span>
          </button>
        </div>

        {/* Inner Tabs Navigation */}
        <div className="px-6 border-b border-zinc-800 flex gap-6 text-xs sm:text-sm font-bold text-zinc-400 pt-3">
          <button
            onClick={() => setActiveTab("episodes")}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === "episodes"
                ? "border-red-600 text-white font-black"
                : "border-transparent hover:text-zinc-200"
            }`}
          >
            Episodes ({course.lessons.length})
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === "about"
                ? "border-red-600 text-white font-black"
                : "border-transparent hover:text-zinc-200"
            }`}
          >
            About & Syllabus
          </button>
          <button
            onClick={() => setActiveTab("localization")}
            className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === "localization"
                ? "border-red-600 text-white font-black"
                : "border-transparent hover:text-zinc-200"
            }`}
          >
            <Globe size={14} className="text-red-500" />
            <span>AI Localization</span>
          </button>
          {relatedCourses.length > 0 && (
            <button
              onClick={() => setActiveTab("similar")}
              className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                activeTab === "similar"
                  ? "border-red-600 text-white font-black"
                  : "border-transparent hover:text-zinc-200"
              }`}
            >
              More Like This
            </button>
          )}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 space-y-6">

          {/* TAB 1: EPISODES */}
          {activeTab === "episodes" && (
            <div className="space-y-4">
              <div className="space-y-3">
                {course.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    onClick={() => onPlayLesson(course, lesson)}
                    className="p-4 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800/80 transition-all cursor-pointer flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-red-600/20 text-red-400 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                        <Play size={18} className="fill-current ml-0.5" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                            Ep {lesson.episodeNumber}
                          </span>
                          <span className="text-xs text-zinc-500 font-bold">&bull; {lesson.duration}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                          {lesson.title}
                        </h4>
                        <p className="text-xs text-zinc-400 line-clamp-1">{lesson.description}</p>
                      </div>
                    </div>

                    <div className="text-xs font-bold text-zinc-500 group-hover:text-white shrink-0">
                      Watch &rsaquo;
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ABOUT & SYLLABUS */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white">Course Overview</h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                  {course.description}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-base font-bold text-white">What You&apos;ll Learn</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.whatYouWillLearn.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-semibold text-zinc-300 flex items-start gap-2.5"
                    >
                      <Check size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teacher Highlight */}
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-red-500/50"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{teacher.name}</h4>
                    <p className="text-xs text-zinc-400 font-medium">{teacher.title}</p>
                  </div>
                </div>

                <button
                  onClick={() => onOpenTeacherProfile(teacher)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white transition-all cursor-pointer"
                >
                  View Teacher Profile
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: LOCALIZATION TECH DEMO */}
          {activeTab === "localization" && (
            <div className="space-y-6">
              <div className="p-4 bg-red-950/40 border border-red-800/40 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-red-400 uppercase tracking-widest">
                  <Globe size={16} />
                  <span>AI Localization & Lip Sync Technology</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  LingoDesk enables real human experts to record once and instantly teach globally.
                  Using neural AI dubbing and lip synchronization, lessons maintain the original speaker&apos;s natural tone and nuance across multiple international languages.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Audio Dubbing Options */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Audio Language Tracks
                  </h4>
                  <div className="space-y-2">
                    {course.availableLanguages.map((lang) => (
                      <div
                        key={lang}
                        className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold flex items-center justify-between"
                      >
                        <span className="text-white">{lang}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-black uppercase ${
                          lang === "Deutsch" && course.originalLanguage.includes("Deutsch")
                            ? "bg-zinc-800 text-zinc-300"
                            : "bg-red-600/20 text-red-400 border border-red-500/30"
                        }`}>
                          {lang === "Deutsch" && course.originalLanguage.includes("Deutsch") ? "Original" : "AI Dubbed"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtitles Options */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Subtitle Options
                  </h4>
                  <div className="space-y-2">
                    {["Off", "Deutsch", "English", "Français", "Español", "Kiswahili"].map((sub) => (
                      <div
                        key={sub}
                        className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold flex items-center justify-between text-zinc-300"
                      >
                        <span>{sub}</span>
                        <span className="text-[10px] text-zinc-500 uppercase">
                          {sub === "Off" ? "Disabled" : "AI Generated"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SIMILAR COURSES */}
          {activeTab === "similar" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedCourses.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onPlayLesson(rel, rel.lessons[0])}
                  className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-600 transition-all cursor-pointer space-y-2"
                >
                  <img
                    src={rel.thumbnail}
                    alt={rel.title}
                    className="w-full aspect-video object-cover rounded-xl"
                  />
                  <h4 className="text-xs font-bold text-white line-clamp-1">{rel.title}</h4>
                  <p className="text-[11px] text-zinc-400">{rel.duration} &bull; {rel.level}</p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
