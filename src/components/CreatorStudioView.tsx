"use client";

import { useState } from "react";
import {
  Video,
  Plus,
  BarChart3,
  Euro,
  Users,
  Clock,
  Sparkles,
  Check,
  Globe,
  Upload,
  ArrowRight,
  Eye,
  Layers
} from "lucide-react";
import { Course, ALL_SUBJECTS, SubjectCategory } from "@/lib/lingoData";

interface CreatorStudioViewProps {
  publishedCourses: Course[];
  onAddNewCourse: (newCourse: Course) => void;
  onOpenCourseDetail: (course: Course) => void;
}

export default function CreatorStudioView({
  publishedCourses,
  onAddNewCourse,
  onOpenCourseDetail,
}: CreatorStudioViewProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "create" | "analytics">("overview");

  // Create Course Wizard State
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3 | 4>(1);
  const [newTitle, setNewTitle] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newSubject, setNewSubject] = useState<SubjectCategory>("Languages");
  const [newLevel, setNewLevel] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");
  const [newLanguage, setNewLanguage] = useState("Deutsch 🇩🇪");
  const [selectedThumbnail, setSelectedThumbnail] = useState(
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
  );
  const [lessonsList, setLessonsList] = useState([
    {
      id: "l-1",
      title: "1. Introduction & Foundational Concepts",
      episodeNumber: 1,
      duration: "18m",
      description: "Welcome to the course! In this lesson we cover core mental models.",
    },
    {
      id: "l-2",
      title: "2. Practical Demonstration & Real-World Application",
      episodeNumber: 2,
      duration: "24m",
      description: "Step-by-step demonstration of key techniques in practice.",
    },
  ]);
  const [lessonInputTitle, setLessonInputTitle] = useState("");
  const [lessonInputDuration, setLessonInputDuration] = useState("20m");
  const [publishSuccessMsg, setPublishSuccessMsg] = useState(false);

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonInputTitle.trim()) return;
    setLessonsList([
      ...lessonsList,
      {
        id: `l-${Date.now()}`,
        title: `${lessonsList.length + 1}. ${lessonInputTitle.trim()}`,
        episodeNumber: lessonsList.length + 1,
        duration: lessonInputDuration.trim() || "15m",
        description: "Hands-on video lesson explaining foundational concepts.",
      },
    ]);
    setLessonInputTitle("");
  };

  const handlePublishCourse = () => {
    const created: Course = {
      id: `course-${Date.now()}`,
      title: newTitle || "New Educational Masterclass",
      subtitle: newSubtitle || "Master practical skills with real-world human expertise.",
      description: newDescription || "High-production streaming series on LingoDesk.",
      teacherId: "teacher-anna-muller",
      teacherName: "Anna Müller",
      teacherAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
      subject: newSubject,
      level: newLevel,
      duration: `${lessonsList.length * 20}m`,
      episodesCount: lessonsList.length,
      rating: 4.9,
      matchScore: 98,
      originalLanguage: newLanguage,
      availableLanguages: ["Deutsch", "English", "Français", "Español", "Kiswahili"],
      hasDubbing: true,
      thumbnail: selectedThumbnail,
      backdrop: selectedThumbnail,
      badge: "NEW",
      whatYouWillLearn: [
        "Gain practical intuition from a real-world human expert",
        "Apply core concepts in everyday professional scenarios",
        "Master step-by-step techniques with interactive lessons"
      ],
      lessons: lessonsList.map((l, i) => ({
        ...l,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      }))
    };

    onAddNewCourse(created);
    setPublishSuccessMsg(true);
    setTimeout(() => {
      setPublishSuccessMsg(false);
      setWizardStep(1);
      setNewTitle("");
      setNewSubtitle("");
      setNewDescription("");
      setActiveTab("courses");
    }, 2000);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 select-none animate-fadeIn text-white">

      {/* Studio Header & Tagline Banner */}
      <div className="bg-gradient-to-r from-red-950/60 via-zinc-900 to-black border border-red-900/40 p-6 sm:p-8 rounded-3xl space-y-3 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-red-600 text-white font-black text-[10px] px-2.5 py-1 rounded uppercase tracking-wider">
                Creator Economy
              </span>
              <span className="text-xs text-zinc-400 font-bold">&bull; Demo/Prototype Data</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-black text-white">
              LingoDesk Creator Studio
            </h1>
            <p className="text-sm font-semibold text-zinc-300">
              &laquo;Teach once. Reach the world.&raquo;
            </p>
          </div>

          <button
            onClick={() => setActiveTab("create")}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black text-sm px-5 py-3 rounded-2xl shadow-xl transition-all cursor-pointer"
          >
            <Plus size={18} />
            <span>Create New Course</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-zinc-800 flex gap-6 text-xs sm:text-sm font-bold text-zinc-400">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === "overview"
              ? "border-red-600 text-white font-black"
              : "border-transparent hover:text-zinc-200"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("courses")}
          className={`pb-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === "courses"
              ? "border-red-600 text-white font-black"
              : "border-transparent hover:text-zinc-200"
          }`}
        >
          My Courses ({publishedCourses.length})
        </button>
        <button
          onClick={() => setActiveTab("create")}
          className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === "create"
              ? "border-red-600 text-white font-black"
              : "border-transparent hover:text-zinc-200"
          }`}
        >
          <Video size={15} className="text-red-500" />
          <span>Course Publishing Wizard</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#181818] border border-zinc-800 p-5 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-zinc-400 text-xs font-bold uppercase">
                <span>Total Learners</span>
                <Users size={16} className="text-red-500" />
              </div>
              <div className="text-3xl font-black text-white">12,482</div>
              <p className="text-[11px] text-emerald-400 font-bold">+18% this month</p>
            </div>

            <div className="bg-[#181818] border border-zinc-800 p-5 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-zinc-400 text-xs font-bold uppercase">
                <span>Watch Time</span>
                <Clock size={16} className="text-red-500" />
              </div>
              <div className="text-3xl font-black text-white">83,291 hrs</div>
              <p className="text-[11px] text-emerald-400 font-bold">+24% global engagement</p>
            </div>

            <div className="bg-[#181818] border border-zinc-800 p-5 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-zinc-400 text-xs font-bold uppercase">
                <span>Est. Creator Earnings</span>
                <Euro size={16} className="text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-emerald-400">&euro;4,821</div>
              <p className="text-[11px] text-zinc-400 font-medium">Distributed via watch time</p>
            </div>

            <div className="bg-[#181818] border border-zinc-800 p-5 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-zinc-400 text-xs font-bold uppercase">
                <span>Global Languages</span>
                <Globe size={16} className="text-amber-400" />
              </div>
              <div className="text-3xl font-black text-white">5 Languages</div>
              <p className="text-[11px] text-amber-400 font-bold">AI Dubbed automatically</p>
            </div>
          </div>

          {/* Top Performing Production Table */}
          <div className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white">Top Performing Course</h3>
              <span className="text-xs text-zinc-400 font-medium">Updated Live</span>
            </div>

            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?q=80&w=400&auto=format&fit=crop"
                  alt="German for Everyday Life"
                  className="w-16 h-12 rounded-xl object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">German for Everyday Life</h4>
                  <p className="text-xs text-zinc-400 font-medium">18 Episodes &bull; 82,100 Hours Watched</p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-base font-black text-emerald-400">&euro;3,240.50</div>
                <p className="text-[11px] text-zinc-400">Monthly Watch Revenue Share</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY COURSES */}
      {activeTab === "courses" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {publishedCourses.map((course) => (
              <div
                key={course.id}
                className="p-4 bg-[#181818] border border-zinc-800 rounded-2xl flex justify-between items-center gap-4 hover:border-zinc-700 transition-all"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-20 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{course.title}</h4>
                    <p className="text-xs text-zinc-400 font-medium">{course.subject} &bull; {course.lessons.length} Lessons</p>
                  </div>
                </div>

                <button
                  onClick={() => onOpenCourseDetail(course)}
                  className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white transition-all cursor-pointer"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CREATE COURSE WIZARD */}
      {activeTab === "create" && (
        <div className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 max-w-3xl mx-auto">

          {/* Steps Indicator */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4 text-xs font-bold text-zinc-400">
            <span className={wizardStep === 1 ? "text-red-500 font-black" : ""}>1. Course Details</span>
            <span className={wizardStep === 2 ? "text-red-500 font-black" : ""}>2. Upload Lessons</span>
            <span className={wizardStep === 3 ? "text-red-500 font-black" : ""}>3. Preview</span>
            <span className={wizardStep === 4 ? "text-red-500 font-black" : ""}>4. Publish</span>
          </div>

          {publishSuccessMsg ? (
            <div className="py-12 text-center space-y-3 bg-emerald-950/40 border border-emerald-800/40 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-black font-black flex items-center justify-center mx-auto">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Course Published Successfully!</h3>
              <p className="text-xs text-zinc-300">
                Your course is now live in the LingoDesk library with AI Dubbing enabled.
              </p>
            </div>
          ) : (
            <>
              {/* STEP 1 */}
              {wizardStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-400 block">Course Title</label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. German for Everyday Life, Quantum Mechanics Made Simple"
                      className="w-full bg-zinc-900 border border-zinc-700 p-3.5 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-400 block">Subtitle / Headline</label>
                    <input
                      type="text"
                      value={newSubtitle}
                      onChange={(e) => setNewSubtitle(e.target.value)}
                      placeholder="e.g. Understand the core ideas without memorization."
                      className="w-full bg-zinc-900 border border-zinc-700 p-3.5 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-zinc-400 block">Category Subject</label>
                      <select
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value as SubjectCategory)}
                        className="w-full bg-zinc-900 border border-zinc-700 p-3.5 rounded-xl text-xs font-bold text-white focus:outline-none"
                      >
                        {ALL_SUBJECTS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-zinc-400 block">Original Language</label>
                      <select
                        value={newLanguage}
                        onChange={(e) => setNewLanguage(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 p-3.5 rounded-xl text-xs font-bold text-white focus:outline-none"
                      >
                        <option value="Deutsch 🇩🇪">Deutsch 🇩🇪</option>
                        <option value="English 🇬🇧">English 🇬🇧</option>
                        <option value="Français 🇫🇷">Français 🇫🇷</option>
                        <option value="Español 🇪🇸">Español 🇪🇸</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => setWizardStep(2)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs py-4 rounded-2xl transition-all cursor-pointer shadow-lg mt-2 flex items-center justify-center gap-2"
                  >
                    <span>Next: Add Lessons</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {/* STEP 2 */}
              {wizardStep === 2 && (
                <div className="space-y-4">
                  <form onSubmit={handleAddLesson} className="p-4 bg-zinc-900 rounded-2xl space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase">Add Lesson / Episode</h4>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={lessonInputTitle}
                        onChange={(e) => setLessonInputTitle(e.target.value)}
                        placeholder="Lesson title e.g. Understanding Vector Spaces"
                        className="flex-1 bg-zinc-800 border border-zinc-700 p-3 rounded-xl text-xs font-bold text-white"
                      />
                      <button
                        type="submit"
                        className="bg-white text-black font-black text-xs px-4 rounded-xl hover:bg-zinc-200 cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </form>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase">Lesson Playlist ({lessonsList.length})</h4>
                    {lessonsList.map((l) => (
                      <div key={l.id} className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold text-white flex justify-between">
                        <span>{l.title}</span>
                        <span className="text-zinc-500">{l.duration}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setWizardStep(1)}
                      className="w-1/3 bg-zinc-800 text-white font-bold text-xs py-3.5 rounded-2xl"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setWizardStep(3)}
                      className="w-2/3 bg-red-600 text-white font-black text-xs py-3.5 rounded-2xl flex items-center justify-center gap-2"
                    >
                      <span>Next: Preview</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 & 4 */}
              {(wizardStep === 3 || wizardStep === 4) && (
                <div className="space-y-4">
                  <div className="p-4 bg-zinc-900 rounded-2xl space-y-2">
                    <span className="text-[10px] font-black uppercase text-red-500">Preview</span>
                    <h3 className="text-xl font-black text-white">{newTitle || "Untitled Course"}</h3>
                    <p className="text-xs text-zinc-400">{newSubtitle}</p>
                    <div className="text-xs font-bold text-emerald-400 pt-1">
                      {lessonsList.length} Lessons &bull; AI Dubbing Enabled (5 Languages)
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setWizardStep(2)}
                      className="w-1/3 bg-zinc-800 text-white font-bold text-xs py-3.5 rounded-2xl"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePublishCourse}
                      className="w-2/3 bg-red-600 hover:bg-red-700 text-white font-black text-xs py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-xl cursor-pointer"
                    >
                      <Sparkles size={16} />
                      <span>Publish Course Live</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      )}

    </div>
  );
}
