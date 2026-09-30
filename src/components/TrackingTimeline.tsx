"use client";

import React from "react";
import { Check } from "lucide-react";

interface TimelineItem {
  title: string;
  description?: string;
  timestamp?: string;
  completed: boolean;
  current: boolean;
}

interface TrackingTimelineProps {
  items: TimelineItem[];
}

export const TrackingTimeline: React.FC<TrackingTimelineProps> = ({ items }) => {
  return (
    <div className="space-y-4 py-2">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex gap-3">
            {/* Circle / Line column */}
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  item.completed
                    ? "bg-[#0066FF] text-white"
                    : item.current
                    ? "bg-blue-100 text-[#0066FF] border-2 border-[#0066FF]"
                    : "bg-gray-100 text-gray-400 border border-gray-300"
                }`}
              >
                {item.completed ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {!isLast && (
                <div
                  className={`w-0.5 flex-1 my-1 ${
                    item.completed ? "bg-[#0066FF]" : "bg-gray-200"
                  }`}
                  style={{ minHeight: "24px" }}
                />
              )}
            </div>

            {/* Content column */}
            <div className="pb-2 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <h4
                  className={`text-sm font-semibold ${
                    item.current
                      ? "text-[#0066FF]"
                      : item.completed
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {item.title}
                </h4>
                {item.timestamp && (
                  <span className="text-xs text-gray-500 font-medium">
                    {item.timestamp}
                  </span>
                )}
              </div>
              {item.description && (
                <p className="text-xs text-gray-600 mt-0.5">{item.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
