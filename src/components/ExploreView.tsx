"use client";

import { useState, useMemo } from "react";
import { Search, Filter, X, Sparkles, BookOpen } from "lucide-react";
import { Course, ALL_SUBJECTS, SubjectCategory } from "@/lib/lingoData";
import CourseCard from "./CourseCard";

interface ExploreViewProps {
  courses: Course[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onPlayCourse: (course: Course) => void;
  onOpenCourseDetail: (course: Course) => void;
  savedCourseIds: string[];
  onToggleSave: (courseId: string) => void;
}

export default function ExploreView({
  courses,
  searchQuery,
  setSearchQuery,
  onPlayCourse,
  onOpenCourseDetail,
  savedCourseIds,
  onToggleSave,
}: ExploreViewProps) {
  const [selectedSubject, setSelectedSubject] = useState<SubjectCategory | "All">("All");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      // Subject match
      if (selectedSubject !== "All" && c.subject !== selectedSubject) return false;
      // Level match
      if (selectedLevel !== "All" && c.level !== selectedLevel) return false;
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = c.title.toLowerCase().includes(q);
        const subMatch = c.subtitle.toLowerCase().includes(q);
        const teacherMatch = c.teacherName.toLowerCase().includes(q);
        const subjectMatch = c.subject.toLowerCase().includes(q);
        if (!titleMatch && !subMatch && !teacherMatch && !subjectMatch) return false;
      }
      return true;
    });
  }, [courses, selectedSubject, selectedLevel, searchQuery]);

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 select-none animate-fadeIn">

      {/* Header & Main Search Bar */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
          Explore LingoDesk
        </h1>
        <p className="text-sm text-zinc-400 font-medium">
          Discover world-class streaming courses taught by real human experts.
        </p>

        {/* Large Netflix Search Bar */}
        <div className="relative flex items-center max-w-xl mx-auto pt-2">
          <Search size={20} className="absolute left-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What do you want to learn today? (e.g. German, Python, Math)..."
            className="w-full bg-[#1f1f1f] border border-zinc-700/80 hover:border-zinc-500 focus:border-red-500 text-white font-medium text-sm py-4 pl-12 pr-10 rounded-2xl focus:outline-none transition-all shadow-xl placeholder-zinc-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 p-1 rounded-full text-zinc-400 hover:text-white cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Subject Category Pills Bar */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-1">
          <button
            onClick={() => setSelectedSubject("All")}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
              selectedSubject === "All"
                ? "bg-red-600 text-white border-red-500 shadow-lg"
                : "bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-800"
            }`}
          >
            All Subjects
          </button>

          {ALL_SUBJECTS.map((sub) => {
            const isActive = selectedSubject === sub;
            return (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  isActive
                    ? "bg-red-600 text-white border-red-500 shadow-lg"
                    : "bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-800"
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>

        {/* Level Filters */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-xs font-bold text-zinc-400">
          <span>Showing {filteredCourses.length} Courses</span>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-zinc-500">Level:</span>
            {["All", "Beginner", "Intermediate", "Advanced"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  selectedLevel === lvl
                    ? "bg-zinc-800 text-white font-bold"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Grid Results */}
      {filteredCourses.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-[#181818] border border-zinc-800 rounded-3xl p-8 max-w-lg mx-auto">
          <BookOpen size={36} className="mx-auto text-zinc-600" />
          <h3 className="text-lg font-bold text-white">No courses match your criteria</h3>
          <p className="text-xs text-zinc-400">
            Try searching for &ldquo;German&rdquo;, &ldquo;Python&rdquo;, &ldquo;Math&rdquo;, or reset your filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedSubject("All");
              setSelectedLevel("All");
            }}
            className="mt-2 text-xs font-bold text-red-400 underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onPlayCourse={onPlayCourse}
              onOpenCourseDetail={onOpenCourseDetail}
              isSaved={savedCourseIds.includes(course.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      )}

    </div>
  );
}
