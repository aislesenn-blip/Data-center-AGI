import React from 'react';

export default function MapLayer() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-bluepost-bg">
      {/* Abstract map representation for the background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-bluepost-primary) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bluepost-bg/80" />

      {/* Abstract decorative route lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <path d="M -100 200 Q 200 100 500 400 T 1000 300" stroke="var(--color-bluepost-primary)" strokeWidth="4" fill="none" />
        <path d="M 0 500 Q 300 600 600 200 T 1200 400" stroke="var(--color-bluepost-primary)" strokeWidth="2" fill="none" strokeDasharray="8 8" />
      </svg>
    </div>
  );
}
