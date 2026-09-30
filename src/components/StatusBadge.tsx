"use client";

import React from "react";
import { ParcelStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: ParcelStatus;
  size?: "sm" | "md";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = "md",
}) => {
  let badgeStyles = "bg-blue-50 text-[#0066FF] border-blue-200";

  if (status === "Collected") {
    badgeStyles = "bg-green-50 text-green-700 border-green-200";
  } else if (status === "Arrived") {
    badgeStyles = "bg-emerald-50 text-emerald-800 border-emerald-300";
  } else if (status === "On the way") {
    badgeStyles = "bg-blue-600 text-white border-blue-600 font-semibold";
  } else if (status === "Bus departed") {
    badgeStyles = "bg-indigo-50 text-indigo-700 border-indigo-200";
  } else if (status === "Payment confirmed") {
    badgeStyles = "bg-gray-100 text-gray-800 border-gray-300";
  }

  const padding = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs font-semibold";

  return (
    <span
      className={`inline-flex items-center rounded-sm border ${padding} ${badgeStyles}`}
    >
      {status}
    </span>
  );
};
