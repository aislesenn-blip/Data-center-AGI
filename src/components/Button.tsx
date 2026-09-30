"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  fullWidth = true,
  size = "md",
  children,
  className = "",
  disabled = false,
  ...props
}) => {
  let baseStyles =
    "font-medium rounded-md transition-all flex items-center justify-center gap-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  let sizeStyles = "px-4 py-3 text-base";
  if (size === "sm") sizeStyles = "px-3 py-2 text-sm";
  if (size === "lg") sizeStyles = "px-5 py-4 text-lg font-semibold";

  let variantStyles = "bg-[#0066FF] hover:bg-[#0052CC] text-white active:bg-[#0040A0]";
  if (variant === "secondary") {
    variantStyles = "bg-gray-100 hover:bg-gray-200 text-gray-900 active:bg-gray-300 border border-gray-200";
  } else if (variant === "outline") {
    variantStyles = "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 active:bg-gray-100";
  } else if (variant === "danger") {
    variantStyles = "bg-red-600 hover:bg-red-700 text-white active:bg-red-800";
  }

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
