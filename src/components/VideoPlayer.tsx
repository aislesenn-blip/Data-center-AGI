"use client";

import { useState, useRef, useEffect } from "react";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Globe,
  ChevronRight,
  Check,
  Award
} from "lucide-react";
import { Course, Lesson, TEACHERS } from "@/lib/lingoData";

interface VideoPlayerProps {
  course: Course;
  currentLesson: Lesson;
  onClose: () => void;
  onLessonChange: (lesson: Lesson) => void;
  onLessonCompleted: (courseId: string, lessonId: string) => void;
}

export default function VideoPlayer({
  course,
  currentLesson,
  onClose,
  onLessonChange,
  onLessonCompleted,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showAudioMenu, setShowAudioMenu] = useState(false);
  const [showSubtitlesMenu, setShowSubtitlesMenu] = useState(false);
  const [selectedAudioTrack, setSelectedAudioTrack] = useState<string>("Deutsch — Original");
  const [selectedSubtitleTrack, setSelectedSubtitleTrack] = useState<string>("Off");
  const [isEnded, setIsEnded] = useState(false);

  const teacher = TEACHERS.find((t) => t.id === course.teacherId);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      setIsEnded(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
    onLessonCompleted(course.id, currentLesson.id);
  };

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const nextLessonIndex = course.lessons.findIndex((l) => l.id === currentLesson.id) + 1;
  const nextLesson = course.lessons[nextLessonIndex];

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b1120] flex flex-col justify-between select-none overflow-hidden text-white animate-fadeIn">

      {/* Top Header Controls Overlay */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 sm:p-6 bg-gradient-to-b from-[#0b1120]/95 via-[#0b1120]/50 to-transparent flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white transition-all cursor-pointer"
            aria-label="Exit Player"
          >
            <X size={20} />
          </button>

          <div>
            <span className="text-[10px] sm:text-xs font-bold text-sky-400 uppercase tracking-wider block">
              {course.title} &bull; Episode {currentLesson.episodeNumber}
            </span>
            <h2 className="text-sm sm:text-base font-heading font-black text-white truncate max-w-xs sm:max-w-md">
              {currentLesson.title}
            </h2>
          </div>
        </div>

        {/* Top Right Audio/Dubbing Indicator Badge */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAudioMenu(!showAudioMenu)}
            className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full text-xs font-bold text-slate-200 transition-all cursor-pointer"
          >
            <Globe size={14} className="text-sky-400" />
            <span className="hidden sm:inline">{selectedAudioTrack}</span>
          </button>
        </div>
      </div>

      {/* Main Video Viewport */}
      <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src={currentLesson.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
          autoPlay
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          className="w-full h-full object-contain max-h-[85vh]"
          onClick={togglePlay}
        />

        {/* Subtitles Overlay Simulation */}
        {selectedSubtitleTrack !== "Off" && (
          <div className="absolute bottom-20 inset-x-0 text-center pointer-events-none z-20">
            <span className="bg-slate-900/90 text-white font-medium text-sm sm:text-base px-4 py-1.5 rounded-lg border border-slate-700/80 shadow-2xl backdrop-blur-md">
              [{selectedSubtitleTrack}] &ldquo;Understanding fundamental concepts allows us to see patterns clearly.&rdquo;
            </span>
          </div>
        )}

        {/* Lesson Complete Overlay */}
        {isEnded && (
          <div className="absolute inset-0 bg-[#0b1120]/90 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 space-y-5 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center">
              <Award size={32} />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-emerald-400 tracking-widest">
                Lesson Complete
              </span>
              <h3 className="text-2xl font-heading font-black text-white">{currentLesson.title}</h3>
              <p className="text-xs text-slate-300 max-w-md">
                Great progress! Continue learning with the next episode or review your notes.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {nextLesson ? (
                <button
                  onClick={() => {
                    setIsEnded(false);
                    onLessonChange(nextLesson);
                  }}
                  className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-black text-sm px-6 py-3 rounded-2xl shadow-xl transition-all cursor-pointer"
                >
                  <span>Next Episode: {nextLesson.title}</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="bg-white text-slate-900 font-black text-sm px-6 py-3 rounded-2xl shadow-xl transition-all cursor-pointer"
                >
                  Return to LingoDesk
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="relative z-30 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/90 to-transparent p-4 sm:p-6 space-y-3">

        {/* Seekbar */}
        <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500 focus:outline-none"
          />
          <span>{formatTime(duration)}</span>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between">

          {/* Left Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-sky-500 text-white hover:bg-sky-400 transition-all cursor-pointer shadow-lg"
            >
              {isPlaying ? <Pause size={20} className="fill-white" /> : <Play size={20} className="fill-white ml-0.5" />}
            </button>

            <button
              onClick={() => skipTime(-10)}
              className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Rewind 10s"
            >
              <RotateCcw size={18} />
            </button>

            <button
              onClick={() => skipTime(10)}
              className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Forward 10s"
            >
              <RotateCw size={18} />
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

          {/* Right Controls: Speed, Audio Dubbing, Subtitles */}
          <div className="flex items-center gap-2 sm:gap-3 relative">

            {/* Speed Selector */}
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
              >
                {playbackSpeed}x
              </button>
              {showSpeedMenu && (
                <div className="absolute bottom-10 right-0 bg-slate-900 border border-slate-700 rounded-xl p-1.5 space-y-1 z-50 text-xs">
                  {[0.75, 1, 1.25, 1.5, 2].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => {
                        setPlaybackSpeed(speed);
                        setShowSpeedMenu(false);
                      }}
                      className={`w-full px-3 py-1.5 rounded text-left font-bold cursor-pointer ${
                        playbackSpeed === speed ? "bg-sky-600 text-white" : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* AI Audio Dubbing Menu Button */}
            <div className="relative">
              <button
                onClick={() => setShowAudioMenu(!showAudioMenu)}
                className="flex items-center gap-1.5 p-2 rounded bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
                title="Audio Dubbing Language"
              >
                <Globe size={16} className="text-sky-400" />
                <span className="hidden sm:inline">Audio</span>
              </button>

              {showAudioMenu && (
                <div className="absolute bottom-12 right-0 w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-3 z-50 text-xs space-y-2">
                  <div className="font-bold text-slate-400 uppercase text-[10px] border-b border-slate-800 pb-1.5">
                    Select Audio Track
                  </div>
                  <div className="space-y-1">
                    {[
                      "Deutsch — Original",
                      "English — Dubbed",
                      "Français — Dubbed",
                      "Español — Dubbed",
                      "Kiswahili — Dubbed"
                    ].map((track) => (
                      <button
                        key={track}
                        onClick={() => {
                          setSelectedAudioTrack(track);
                          setShowAudioMenu(false);
                        }}
                        className={`w-full p-2 rounded-xl text-left font-medium flex items-center justify-between cursor-pointer ${
                          selectedAudioTrack === track
                            ? "bg-sky-600 text-white font-bold"
                            : "text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        <span>{track}</span>
                        {selectedAudioTrack === track && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Subtitles Menu */}
            <div className="relative">
              <button
                onClick={() => setShowSubtitlesMenu(!showSubtitlesMenu)}
                className="p-2 rounded bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
                title="Subtitles"
              >
                CC
              </button>

              {showSubtitlesMenu && (
                <div className="absolute bottom-12 right-0 w-48 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-3 z-50 text-xs space-y-2">
                  <div className="font-bold text-slate-400 uppercase text-[10px] border-b border-slate-800 pb-1.5">
                    Subtitles
                  </div>
                  <div className="space-y-1">
                    {["Off", "Deutsch", "English", "Français", "Español", "Kiswahili"].map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          setSelectedSubtitleTrack(sub);
                          setShowSubtitlesMenu(false);
                        }}
                        className={`w-full p-2 rounded-xl text-left font-medium flex items-center justify-between cursor-pointer ${
                          selectedSubtitleTrack === sub
                            ? "bg-sky-600 text-white font-bold"
                            : "text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        <span>{sub}</span>
                        {selectedSubtitleTrack === sub && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
