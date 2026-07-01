import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  bg?: "white" | "gray" | "blue" | "dark";
  id?: string;
}

export function Section({ children, className = "", bg = "white", id }: SectionProps) {
  const bgColors = {
    white: "bg-white",
    gray: "bg-[#F8FAFC]",
    blue: "bg-[#1E3A8A] text-white",
    dark: "bg-[#0F172A] text-white",
  };

  return (
    <section id={id} className={`py-16 md:py-24 lg:py-32 ${bgColors[bg]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({ title, subtitle, align = "left", light = false }: { title: ReactNode, subtitle?: ReactNode, align?: "left" | "center", light?: boolean }) {
  return (
    <div className={`mb-12 md:mb-16 ${align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-2xl"}`}>
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 md:mb-6 ${light ? "text-white" : "text-[#0F172A]"}`}>
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
