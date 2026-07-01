import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  bg?: "white" | "gray" | "blue";
  id?: string;
}

export function Section({ children, className = "", bg = "white", id }: SectionProps) {
  const bgColors = {
    white: "bg-white",
    gray: "bg-[#F8FAFC]",
    blue: "bg-[#1E3A8A] text-white",
  };

  return (
    <section id={id} className={`py-24 lg:py-32 ${bgColors[bg]} ${className}`}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({ title, subtitle, align = "left", light = false }: { title: string, subtitle?: string, align?: "left" | "center", light?: boolean }) {
  return (
    <div className={`mb-16 md:mb-20 ${align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-2xl"}`}>
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight ${light ? "text-white" : "text-[#0F172A]"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-xl leading-relaxed ${light ? "text-blue-100" : "text-gray-600"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}