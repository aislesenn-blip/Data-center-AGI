"use client";

import { X, Star, Globe } from "lucide-react";
import { Teacher, Course } from "@/lib/lingoData";
import CourseCard from "./CourseCard";

interface TeacherProfileModalProps {
  teacher: Teacher | null;
  onClose: () => void;
  courses: Course[];
  onPlayCourse: (course: Course) => void;
  onOpenCourseDetail: (course: Course) => void;
  savedCourseIds: string[];
  onToggleSave: (courseId: string) => void;
}

export default function TeacherProfileModal({
  teacher,
  onClose,
  courses,
  onPlayCourse,
  onOpenCourseDetail,
  savedCourseIds,
  onToggleSave,
}: TeacherProfileModalProps) {
  if (!teacher) return null;

  const teacherCourses = courses.filter((c) => c.teacherId === teacher.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0b1120]/90 backdrop-blur-md flex justify-center items-start p-2 sm:p-4 md:p-6 select-none animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0f172a] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-6 text-white">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Teacher Header Bio Card */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pt-2">
          <img
            src={teacher.avatar}
            alt={teacher.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-sky-500/80 shadow-2xl shrink-0"
          />

          <div className="space-y-2 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-heading font-black text-white">{teacher.name}</h1>
              <span className="bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                Featured Teacher
              </span>
            </div>

            <p className="text-xs font-bold text-slate-400">{teacher.title}</p>
            <p className="text-xs text-slate-300 leading-relaxed max-w-lg">{teacher.bio}</p>

            <div className="text-[11px] font-bold text-slate-400 flex items-center justify-center sm:justify-start gap-1 pt-1">
              <Globe size={13} className="text-sky-400" />
              <span>Native Language: {teacher.nativeLanguage}</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-slate-900 border border-slate-800 rounded-2xl text-center">
          <div>
            <div className="text-lg font-black text-white">{teacher.learnersCount.toLocaleString()}</div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Learners</p>
          </div>
          <div>
            <div className="text-lg font-black text-amber-400 flex items-center justify-center gap-1">
              <Star size={14} className="fill-amber-400" />
              <span>{teacher.rating}</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Rating</p>
          </div>
          <div>
            <div className="text-lg font-black text-white">{teacher.watchTimeHours.toLocaleString()}h</div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Watch Time</p>
          </div>
        </div>

        {/* Teacher Courses List */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Courses by {teacher.name} ({teacherCourses.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {teacherCourses.map((course) => (
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
        </div>

      </div>
    </div>
  );
}
