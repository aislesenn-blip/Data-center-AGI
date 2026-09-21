"use client";

import { useState } from "react";
import { Play, Plus, Check, ChevronDown, Star, Clock, Globe } from "lucide-react";
import { Course, UserProgress } from "@/lib/lingoData";

interface CourseCardProps {
  course: Course;
  userProgress?: UserProgress;
  onPlayCourse: (course: Course) => void;
  onOpenCourseDetail: (course: Course) => void;
  isSaved: boolean;
  onToggleSave: (courseId: string) => void;
}

export default function CourseCard({
  course,
  userProgress,
  onPlayCourse,
  onOpenCourseDetail,
  isSaved,
  onToggleSave,
}: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative shrink-0 w-64 sm:w-72 md:w-80 group cursor-pointer select-none"
    >
      {/* Thumbnail Card Container */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/80 shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:z-30">

        {/* Background Image */}
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-center z-10">
          {course.badge ? (
            <span className="bg-red-600/90 text-white font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider shadow">
              {course.badge}
            </span>
          ) : (
            <span className="bg-black/60 backdrop-blur-md text-zinc-300 font-bold text-[10px] px-2 py-0.5 rounded border border-white/10">
              {course.subject}
            </span>
          )}

          <span className="bg-black/70 backdrop-blur-md text-zinc-200 text-[10px] font-bold px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
            <Globe size={10} className="text-red-400" />
            <span>{course.originalLanguage.split(" ")[0]}</span>
          </span>
        </div>

        {/* Bottom Content Preview */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 space-y-1">
          <h3 className="font-heading font-black text-sm text-white truncate drop-shadow">
            {course.title}
          </h3>

          <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-300">
            <div className="flex items-center gap-1.5 truncate max-w-[170px]">
              <img
                src={course.teacherAvatar}
                alt={course.teacherName}
                className="w-4 h-4 rounded-full object-cover border border-zinc-500"
              />
              <span className="truncate text-zinc-300 font-medium">{course.teacherName}</span>
            </div>

            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star size={11} className="fill-amber-400" />
              <span>{course.rating}</span>
            </div>
          </div>

          {/* Continue Watching / Learning Progress Bar if available */}
          {userProgress && (
            <div className="pt-1.5 space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-zinc-400">
                <span className="text-red-400">{userProgress.percentComplete}% complete</span>
                <span>{userProgress.lastWatchedAt}</span>
              </div>
              <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-red-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${userProgress.percentComplete}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Hover Action Overlay Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm z-20 p-3 flex flex-col justify-between transition-opacity duration-200">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-bold text-emerald-400">
                <span>{course.matchScore}% Match</span>
                <span className="text-zinc-300">{course.duration} &bull; {course.episodesCount} Ep</span>
              </div>

              <h4 className="font-heading font-black text-xs text-white line-clamp-1">
                {course.title}
              </h4>

              <p className="text-[11px] text-zinc-300 line-clamp-2 leading-tight font-medium">
                {course.subtitle}
              </p>
            </div>

            {/* Quick Hover Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayCourse(course);
                  }}
                  className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-transform active:scale-95 shadow cursor-pointer"
                  title="Play Lesson"
                >
                  <Play size={15} className="fill-black ml-0.5" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(course.id);
                  }}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                    isSaved
                      ? "bg-zinc-800 text-emerald-400 border-emerald-500"
                      : "bg-black/60 text-white border-zinc-600 hover:border-white"
                  }`}
                  title={isSaved ? "Saved in My Learning" : "Save to My Learning"}
                >
                  {isSaved ? <Check size={14} /> : <Plus size={14} />}
                </button>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCourseDetail(course);
                }}
                className="w-8 h-8 rounded-full bg-black/60 text-white border border-zinc-600 flex items-center justify-center hover:border-white transition-all cursor-pointer"
                title="Course Details"
              >
                <ChevronDown size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
