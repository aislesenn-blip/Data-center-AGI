"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Course, UserProgress } from "@/lib/lingoData";
import CourseCard from "./CourseCard";

interface CourseRowProps {
  title: string;
  subtitle?: string;
  courses: Course[];
  userProgressMap?: Record<string, UserProgress>;
  onPlayCourse: (course: Course) => void;
  onOpenCourseDetail: (course: Course) => void;
  savedCourseIds: string[];
  onToggleSave: (courseId: string) => void;
}

export default function CourseRow({
  title,
  subtitle,
  courses,
  userProgressMap,
  onPlayCourse,
  onOpenCourseDetail,
  savedCourseIds,
  onToggleSave,
}: CourseRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (courses.length === 0) return null;

  return (
    <section className="space-y-2 py-4 relative group/row select-none">

      {/* Row Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-baseline justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-heading font-black text-white tracking-tight flex items-center gap-2">
            <span>{title}</span>
          </h2>
          {subtitle && (
            <p className="text-xs font-semibold text-zinc-400 mt-0.5">{subtitle}</p>
          )}
        </div>

        <span className="text-xs font-bold text-zinc-500 hover:text-red-400 transition-colors cursor-pointer hidden sm:inline-block">
          Explore All &rsaquo;
        </span>
      </div>

      {/* Row Carousel Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Left Scroll Arrow Button */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-black/80 hover:bg-black text-white border border-zinc-700/80 items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 shadow-2xl cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Scrollable Track */}
        <div
          ref={rowRef}
          className="flex items-center gap-4 overflow-x-auto no-scrollbar py-3 px-1 scroll-smooth"
        >
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              userProgress={userProgressMap?.[course.id]}
              onPlayCourse={onPlayCourse}
              onOpenCourseDetail={onOpenCourseDetail}
              isSaved={savedCourseIds.includes(course.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>

        {/* Right Scroll Arrow Button */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-black/80 hover:bg-black text-white border border-zinc-700/80 items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 shadow-2xl cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
}
