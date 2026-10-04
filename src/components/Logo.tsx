import React from 'react';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-bluepost-primary"
      >
        <path
          d="M6 6H16.5C19.5376 6 22 8.46243 22 11.5C22 13.9116 20.4447 15.9625 18.2575 16.7126C21.082 17.2917 23.1818 19.8248 23.1818 22.8182C23.1818 26.2323 20.4141 29 17 29H6V6Z"
          fill="currentColor"
        />
        <path
          d="M13 12H16C16.8284 12 17.5 12.6716 17.5 13.5C17.5 14.3284 16.8284 15 16 15H13V12Z"
          fill="white"
        />
        <path
          d="M13 19H16.5C17.6046 19 18.5 19.8954 18.5 21C18.5 22.1046 17.6046 23 16.5 23H13V19Z"
          fill="white"
        />
        {/* Forward moving accent */}
        <path
          d="M26 12L31 17.5L26 23"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
      <span className="font-bold text-xl text-bluepost-dark tracking-tight">BluePost</span>
    </div>
  );
}
