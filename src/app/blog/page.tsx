import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const posts = [
    { title: "The Future of Programmatic Transit in Emerging Markets", category: "Industry Insights", date: "Oct 12, 2023" },
    { title: "How Geo-Fencing Drives 3x Engagement for FMCG Brands", category: "Creative Strategy", date: "Sep 28, 2023" },
    { title: "Measuring Mobility: The New Standard in Attribution", category: "Data & Tech", date: "Sep 15, 2023" },
    { title: "Empowering Fleet Owners with Digital Revenue Streams", category: "Partnerships", date: "Aug 22, 2023" },
  ];

  return (
    <>
      <Hero
        title={<>Insights & <span className="text-[#1E3A8A]">Intelligence</span></>}
        subtitle="Explore the latest trends, technological advancements, and creative strategies shaping the future of mobility advertising."
        align="center"
      />
      <Section bg="gray" className="border-t border-gray-100">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
           {posts.map((post, idx) => (
             <AnimatedCard key={idx} delay={idx * 0.1} className="flex flex-col h-full p-6 sm:p-8 group">
                <div className="flex-1">
                   <p className="text-xs sm:text-sm font-bold text-[#2563EB] uppercase tracking-wider mb-2 sm:mb-3">{post.category}</p>
                   <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-4 leading-tight group-hover:text-[#1E3A8A] transition-colors">{post.title}</h3>
                </div>
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100 flex items-center justify-between">
                   <span className="text-xs sm:text-sm text-gray-500 font-medium">{post.date}</span>
                   <Link href="#" className="text-[#1E3A8A] hover:text-[#2563EB] transition-colors p-2 -mr-2 touch-manipulation">
                     <ArrowRight className="w-5 h-5" />
                   </Link>
                </div>
             </AnimatedCard>
           ))}
        </div>
      </Section>
    </>
  );
}
