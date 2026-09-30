"use client";

import React from "react";
import { User } from "lucide-react";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  onProfileClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title = "BluePost",
  showBack = false,
  onBack,
  onProfileClick,
}) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3.5 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-gray-700 hover:text-gray-900 active:bg-gray-100 rounded focus:outline-none"
            aria-label="Go back"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-xl tracking-tight text-[#0066FF]">
            BluePost
          </span>
          {title && title !== "BluePost" && (
            <span className="text-sm font-medium text-gray-500 border-l border-gray-200 pl-2">
              {title}
            </span>
          )}
        </div>
      </div>

      {onProfileClick && (
        <button
          onClick={onProfileClick}
          className="w-9 h-9 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-200 active:scale-95 transition-all"
          aria-label="Profile"
        >
          <User className="w-5 h-5 text-gray-700" />
        </button>
      )}
    </header>
  );
};
