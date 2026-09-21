"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CourseRow from "@/components/CourseRow";
import CourseDetailModal from "@/components/CourseDetailModal";
import VideoPlayer from "@/components/VideoPlayer";
import ExploreView from "@/components/ExploreView";
import MyLearningView from "@/components/MyLearningView";
import ProfileView from "@/components/ProfileView";
import TeacherProfileModal from "@/components/TeacherProfileModal";
import CreatorStudioView from "@/components/CreatorStudioView";
import SubscriptionView from "@/components/SubscriptionView";
import OnboardingModal from "@/components/OnboardingModal";
import FamilyProfileSwitcher from "@/components/FamilyProfileSwitcher";

import {
  COURSES,
  TEACHERS,
  INITIAL_USER_PROGRESS,
  DEFAULT_USER_PROFILE,
  Course,
  Lesson,
  Teacher,
  UserProgress,
  UserProfile,
  SubjectCategory,
} from "@/lib/lingoData";

import { Tv, Compass, Bookmark, Video, User } from "lucide-react";

export default function Home() {
  // Navigation View State
  const [activeTab, setActiveTab] = useState<
    "home" | "explore" | "my-learning" | "creator-studio" | "subscription" | "profile"
  >("home");

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Global Audio Preference
  const [selectedAudioLanguage, setSelectedAudioLanguage] = useState("Deutsch (Original)");

  // State: Dynamic Courses Catalog (supports newly published courses from Creator Studio)
  const [courses, setCourses] = useState<Course[]>(COURSES);

  // State: Saved Courses (My List)
  const [savedCourseIds, setSavedCourseIds] = useState<string[]>([
    "course-math-simple",
    "course-german-everyday",
    "course-python-beginners",
  ]);

  // State: User Progress Tracking
  const [userProgressList, setUserProgressList] = useState<UserProgress[]>(INITIAL_USER_PROGRESS);

  // State: Active Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE);

  // Modals & Overlays State
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<Course | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [activePlayingCourse, setActivePlayingCourse] = useState<Course | null>(null);
  const [activePlayingLesson, setActivePlayingLesson] = useState<Lesson | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showProfileSwitcher, setShowProfileSwitcher] = useState(false);

  // Progress Map Helper
  const progressMap = userProgressList.reduce((acc, curr) => {
    acc[curr.courseId] = curr;
    return acc;
  }, {} as Record<string, UserProgress>);

  // Handlers
  const handleToggleSave = (courseId: string) => {
    setSavedCourseIds((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  const handlePlayCourse = (course: Course, lesson?: Lesson) => {
    setActivePlayingCourse(course);
    setActivePlayingLesson(lesson || course.lessons[0]);
  };

  const handleLessonCompleted = (courseId: string, lessonId: string) => {
    setUserProgressList((prev) => {
      const existingIndex = prev.findIndex((p) => p.courseId === courseId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          percentComplete: Math.min(100, updated[existingIndex].percentComplete + 20),
          lastWatchedAt: "Just now",
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            courseId,
            lastEpisodeId: lessonId,
            percentComplete: 20,
            lastWatchedAt: "Just now",
          },
        ];
      }
    });
  };

  const handleAddNewPublishedCourse = (newCourse: Course) => {
    setCourses((prev) => [newCourse, ...prev]);
  };

  // Grouped Courses for Homepage Rows
  const featuredHeroCourse = courses.find((c) => c.id === "course-math-simple") || courses[0];
  const continueCourses = courses.filter((c) => progressMap[c.id]);
  const trendingCourses = courses.filter((c) => c.badge === "TRENDING" || c.rating >= 4.93);
  const pickedForYouCourses = courses.filter((c) => c.matchScore >= 95);
  const germanCourses = courses.filter((c) => c.subject === "Languages");
  const mathCourses = courses.filter((c) => c.subject === "Mathematics");
  const techCourses = courses.filter((c) => c.subject === "Technology");
  const businessCourses = courses.filter((c) => c.subject === "Business" || c.subject === "Finance");
  const scienceCourses = courses.filter((c) => c.subject === "Science");
  const cookingCourses = courses.filter((c) => c.subject === "Cooking");
  const practicalCourses = courses.filter((c) => c.subject === "Practical Skills" || c.subject === "Creative");
  const newReleases = courses.filter((c) => c.badge === "NEW");

  return (
    <div className="min-h-screen bg-[#141414] text-white font-sans antialiased overflow-x-hidden selection:bg-red-600 selection:text-white">

      {/* Persistent Netflix Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        userProfile={userProfile}
        onOpenProfileSwitcher={() => setShowProfileSwitcher(true)}
        onOpenOnboarding={() => setShowOnboarding(true)}
        selectedAudioLanguage={selectedAudioLanguage}
        setSelectedAudioLanguage={setSelectedAudioLanguage}
      />

      {/* VIEW ROUTER */}
      <main className="pb-24">
        {/* VIEW 1: HOME */}
        {activeTab === "home" && (
          <div className="space-y-6 sm:space-y-8 animate-fadeIn">
            {/* Cinematic Hero */}
            <Hero
              featuredCourse={featuredHeroCourse}
              onPlayCourse={handlePlayCourse}
              onOpenCourseDetail={(course) => setSelectedCourseDetail(course)}
              isSaved={savedCourseIds.includes(featuredHeroCourse.id)}
              onToggleSave={handleToggleSave}
            />

            {/* Content Rows */}
            <div className="space-y-4 -mt-10 sm:-mt-16 relative z-30">
              {/* Row 1: Continue Learning */}
              {continueCourses.length > 0 && (
                <CourseRow
                  title="Continue Learning"
                  subtitle="Resume where you left off"
                  courses={continueCourses}
                  userProgressMap={progressMap}
                  onPlayCourse={handlePlayCourse}
                  onOpenCourseDetail={(course) => setSelectedCourseDetail(course)}
                  savedCourseIds={savedCourseIds}
                  onToggleSave={handleToggleSave}
                />
              )}

              {/* Row 2: Trending on LingoDesk */}
              <CourseRow
                title="Trending on LingoDesk"
                subtitle="Most watched productions globally this week"
                courses={trendingCourses}
                userProgressMap={progressMap}
                onPlayCourse={handlePlayCourse}
                onOpenCourseDetail={(course) => setSelectedCourseDetail(course)}
                savedCourseIds={savedCourseIds}
                onToggleSave={handleToggleSave}
              />

              {/* Row 3: Picked for You */}
              <CourseRow
                title="Picked for You"
                subtitle="Based on your learning history and interest in Mathematics & Languages"
                courses={pickedForYouCourses}
                userProgressMap={progressMap}
                onPlayCourse={handlePlayCourse}
                onOpenCourseDetail={(course) => setSelectedCourseDetail(course)}
                savedCourseIds={savedCourseIds}
                onToggleSave={handleToggleSave}
              />

              {/* Row 4: Learn Languages */}
              <CourseRow
                title="Conversational Languages & German"
                courses={germanCourses}
                userProgressMap={progressMap}
                onPlayCourse={handlePlayCourse}
                onOpenCourseDetail={(course) => setSelectedCourseDetail(course)}
                savedCourseIds={savedCourseIds}
                onToggleSave={handleToggleSave}
              />

              {/* Row 5: Technology & Coding */}
              <CourseRow
                title="Technology & Software Engineering"
                courses={techCourses}
                userProgressMap={progressMap}
                onPlayCourse={handlePlayCourse}
                onOpenCourseDetail={(course) => setSelectedCourseDetail(course)}
                savedCourseIds={savedCourseIds}
                onToggleSave={handleToggleSave}
              />

              {/* Row 6: Mathematics & Logic */}
              <CourseRow
                title="Mathematics & Visual Thinking"
                courses={mathCourses}
                userProgressMap={progressMap}
                onPlayCourse={handlePlayCourse}
                onOpenCourseDetail={(course) => setSelectedCourseDetail(course)}
                savedCourseIds={savedCourseIds}
                onToggleSave={handleToggleSave}
              />

              {/* Row 7: Science & Physics */}
              <CourseRow
                title="Science & Cosmic Exploration"
                courses={scienceCourses}
                userProgressMap={progressMap}
                onPlayCourse={handlePlayCourse}
                onOpenCourseDetail={(course) => setSelectedCourseDetail(course)}
                savedCourseIds={savedCourseIds}
                onToggleSave={handleToggleSave}
              />

              {/* Row 8: Business & Finance */}
              <CourseRow
                title="Business & Strategic Finance"
                courses={businessCourses}
                userProgressMap={progressMap}
                onPlayCourse={handlePlayCourse}
                onOpenCourseDetail={(course) => setSelectedCourseDetail(course)}
                savedCourseIds={savedCourseIds}
                onToggleSave={handleToggleSave}
              />

              {/* Row 9: Culinary Arts & Cooking */}
              <CourseRow
                title="Culinary Arts & Cooking"
                courses={cookingCourses}
                userProgressMap={progressMap}
                onPlayCourse={handlePlayCourse}
                onOpenCourseDetail={(course) => setSelectedCourseDetail(course)}
                savedCourseIds={savedCourseIds}
                onToggleSave={handleToggleSave}
              />

              {/* Row 10: Skills for Life */}
              <CourseRow
                title="Skills for Life & Creative Mastery"
                courses={practicalCourses}
                userProgressMap={progressMap}
                onPlayCourse={handlePlayCourse}
                onOpenCourseDetail={(course) => setSelectedCourseDetail(course)}
                savedCourseIds={savedCourseIds}
                onToggleSave={handleToggleSave}
              />

              {/* Row 11: New on LingoDesk */}
              {newReleases.length > 0 && (
                <CourseRow
                  title="New on LingoDesk"
                  courses={newReleases}
                  userProgressMap={progressMap}
                  onPlayCourse={handlePlayCourse}
                  onOpenCourseDetail={(course) => setSelectedCourseDetail(course)}
                  savedCourseIds={savedCourseIds}
                  onToggleSave={handleToggleSave}
                />
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: EXPLORE */}
        {activeTab === "explore" && (
          <ExploreView
            courses={courses}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onPlayCourse={handlePlayCourse}
            onOpenCourseDetail={(course) => setSelectedCourseDetail(course)}
            savedCourseIds={savedCourseIds}
            onToggleSave={handleToggleSave}
          />
        )}

        {/* VIEW 3: MY LEARNING */}
        {activeTab === "my-learning" && (
          <MyLearningView
            courses={courses}
            userProgressList={userProgressList}
            savedCourseIds={savedCourseIds}
            onPlayCourse={handlePlayCourse}
            onOpenCourseDetail={(course) => setSelectedCourseDetail(course)}
            onToggleSave={handleToggleSave}
          />
        )}

        {/* VIEW 4: CREATOR STUDIO */}
        {activeTab === "creator-studio" && (
          <CreatorStudioView
            publishedCourses={courses}
            onAddNewCourse={handleAddNewPublishedCourse}
            onOpenCourseDetail={(course) => setSelectedCourseDetail(course)}
          />
        )}

        {/* VIEW 5: SUBSCRIPTION PLANS */}
        {activeTab === "subscription" && (
          <SubscriptionView
            currentPlan={userProfile.subscriptionPlan}
            onSelectPlan={(plan) =>
              setUserProfile({ ...userProfile, subscriptionPlan: plan })
            }
          />
        )}

        {/* VIEW 6: PROFILE */}
        {activeTab === "profile" && (
          <ProfileView
            userProfile={userProfile}
            onOpenProfileSwitcher={() => setShowProfileSwitcher(true)}
            onOpenOnboarding={() => setShowOnboarding(true)}
            onOpenSubscription={() => setActiveTab("subscription")}
          />
        )}
      </main>

      {/* MODALS */}
      {/* Course Detail Modal */}
      {selectedCourseDetail && (
        <CourseDetailModal
          course={selectedCourseDetail}
          onClose={() => setSelectedCourseDetail(null)}
          onPlayLesson={(course, lesson) => {
            setSelectedCourseDetail(null);
            handlePlayCourse(course, lesson);
          }}
          isSaved={savedCourseIds.includes(selectedCourseDetail.id)}
          onToggleSave={handleToggleSave}
          onOpenTeacherProfile={(teacher) => setSelectedTeacher(teacher)}
          allCourses={courses}
        />
      )}

      {/* Video Player Overlay */}
      {activePlayingCourse && activePlayingLesson && (
        <VideoPlayer
          course={activePlayingCourse}
          currentLesson={activePlayingLesson}
          onClose={() => {
            setActivePlayingCourse(null);
            setActivePlayingLesson(null);
          }}
          onLessonChange={(lesson) => setActivePlayingLesson(lesson)}
          onLessonCompleted={handleLessonCompleted}
        />
      )}

      {/* Teacher Profile Modal */}
      {selectedTeacher && (
        <TeacherProfileModal
          teacher={selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
          courses={courses}
          onPlayCourse={handlePlayCourse}
          onOpenCourseDetail={(course) => {
            setSelectedTeacher(null);
            setSelectedCourseDetail(course);
          }}
          savedCourseIds={savedCourseIds}
          onToggleSave={handleToggleSave}
        />
      )}

      {/* Onboarding Wizard Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={(selectedInterests) => {
          setUserProfile({ ...userProfile, interests: selectedInterests });
        }}
      />

      {/* Family Profile Switcher Modal */}
      <FamilyProfileSwitcher
        isOpen={showProfileSwitcher}
        onClose={() => setShowProfileSwitcher(false)}
        currentProfile={userProfile}
        onSwitchProfile={(profile) => setUserProfile(profile)}
      />

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#141414]/95 backdrop-blur-md border-t border-zinc-800 px-2 py-2 flex justify-around items-center text-[10px] font-bold text-zinc-400">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center gap-1 p-1.5 cursor-pointer ${
            activeTab === "home" ? "text-white font-black" : "hover:text-white"
          }`}
        >
          <Tv size={18} className={activeTab === "home" ? "text-red-600" : ""} />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab("explore")}
          className={`flex flex-col items-center gap-1 p-1.5 cursor-pointer ${
            activeTab === "explore" ? "text-white font-black" : "hover:text-white"
          }`}
        >
          <Compass size={18} className={activeTab === "explore" ? "text-red-600" : ""} />
          <span>Explore</span>
        </button>

        <button
          onClick={() => setActiveTab("my-learning")}
          className={`flex flex-col items-center gap-1 p-1.5 cursor-pointer ${
            activeTab === "my-learning" ? "text-white font-black" : "hover:text-white"
          }`}
        >
          <Bookmark size={18} className={activeTab === "my-learning" ? "text-red-600" : ""} />
          <span>My Learning</span>
        </button>

        <button
          onClick={() => setActiveTab("creator-studio")}
          className={`flex flex-col items-center gap-1 p-1.5 cursor-pointer ${
            activeTab === "creator-studio" ? "text-red-400 font-black" : "hover:text-white"
          }`}
        >
          <Video size={18} />
          <span>Creator</span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center gap-1 p-1.5 cursor-pointer ${
            activeTab === "profile" ? "text-white font-black" : "hover:text-white"
          }`}
        >
          <User size={18} className={activeTab === "profile" ? "text-red-600" : ""} />
          <span>Profile</span>
        </button>
      </nav>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800/80 bg-[#101010] py-10 px-4 sm:px-6 lg:px-8 text-xs text-zinc-500 space-y-4 text-center select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-heading font-black text-lg text-red-600 tracking-tighter">
            LINGO<span className="text-white">DESK</span>
          </div>

          <p className="font-medium text-zinc-400">
            One subscription. Everything worth learning.
          </p>

          <p className="text-[11px] text-zinc-600">
            &copy; {new Date().getFullYear()} LingoDesk Inc. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
