"use client";

import { useState } from "react";
import { Play, Check, Bookmark, Clock, Award, Trash2 } from "lucide-react";
import { Course, UserProgress } from "@/lib/lingoData";
import CourseCard from "./CourseCard";

interface MyLearningViewProps {
  courses: Course[];
  userProgressList: UserProgress[];
  savedCourseIds: string[];
  onPlayCourse: (course: Course) => void;
  onOpenCourseDetail: (course: Course) => void;
  onToggleSave: (courseId: string) => void;
}

export default function MyLearningView({
  courses,
  userProgressList,
  savedCourseIds,
  onPlayCourse,
  onOpenCourseDetail,
  onToggleSave,
}: MyLearningViewProps) {
  const [activeTab, setActiveTab] = useState<"continue" | "saved" | "history">("continue");

  const progressMap = userProgressList.reduce((acc, curr) => {
    acc[curr.courseId] = curr;
    return acc;
  }, {} as Record<string, UserProgress>);

  const continueCourses = courses.filter((c) => progressMap[c.id]);
  const savedCourses = courses.filter((c) => savedCourseIds.includes(c.id));

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 select-none animate-fadeIn">

      {/* Page Title */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-heading font-black text-white tracking-tight">
          My Learning
        </h1>
        <p className="text-sm text-zinc-400 font-medium">
          Your personal library, active progress, and saved productions.
        </p>
      </div>

      {/* Tabs Row */}
      <div className="border-b border-zinc-800 flex gap-6 text-xs sm:text-sm font-bold text-zinc-400">
        <button
          onClick={() => setActiveTab("continue")}
          className={`pb-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === "continue"
              ? "border-red-600 text-white font-black"
              : "border-transparent hover:text-zinc-200"
          }`}
        >
          Continue Learning ({continueCourses.length})
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`pb-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === "saved"
              ? "border-red-600 text-white font-black"
              : "border-transparent hover:text-zinc-200"
          }`}
        >
          Saved / My List ({savedCourses.length})
        </button>
      </div>

      {/* TAB 1: CONTINUE LEARNING */}
      {activeTab === "continue" && (
        <div>
          {continueCourses.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-[#181818] border border-zinc-800 rounded-3xl p-8 max-w-md mx-auto">
              <Clock size={32} className="mx-auto text-zinc-600" />
              <h3 className="text-base font-bold text-white">No active courses yet</h3>
              <p className="text-xs text-zinc-400">Start watching any course to track your progress automatically.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {continueCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  userProgress={progressMap[course.id]}
                  onPlayCourse={onPlayCourse}
                  onOpenCourseDetail={onOpenCourseDetail}
                  isSaved={savedCourseIds.includes(course.id)}
                  onToggleSave={onToggleSave}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SAVED LIST */}
      {activeTab === "saved" && (
        <div>
          {savedCourses.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-[#181818] border border-zinc-800 rounded-3xl p-8 max-w-md mx-auto">
              <Bookmark size={32} className="mx-auto text-zinc-600" />
              <h3 className="text-base font-bold text-white">Your list is empty</h3>
              <p className="text-xs text-zinc-400">Click &ldquo;＋ My Learning&rdquo; on any course poster to save it here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {savedCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  userProgress={progressMap[course.id]}
                  onPlayCourse={onPlayCourse}
                  onOpenCourseDetail={onOpenCourseDetail}
                  isSaved={true}
                  onToggleSave={onToggleSave}
                />
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
