import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const posts = [
    { title: "The Future of Programmatic DOOH in Emerging Markets", category: "Industry Insights", date: "Oct 12, 2023" },
    { title: "How 3D Anamorphic Billboards Drive 3x Engagement", category: "Creative Strategy", date: "Sep 28, 2023" },
    { title: "Measuring Footfall: The New Standard in OOH Attribution", category: "Data & Tech", date: "Sep 15, 2023" },
  ];

  return (
    <>
      <Hero
        title={<>Insights & <span className="text-[#1E3A8A]">Intelligence</span></>}
        subtitle="Explore the latest trends, technological advancements, and creative strategies shaping the future of out-of-home advertising."
        align="center"
      />
      <Section bg="gray" className="border-t border-gray-100">
        <div className="grid md:grid-cols-3 gap-8">
           {posts.map((post, idx) => (
             <AnimatedCard key={idx} delay={idx * 0.1} className="flex flex-col h-full">
                <div className="flex-1">
                   <p className="text-sm font-bold text-[#2563EB] uppercase tracking-wider mb-2">{post.category}</p>
                   <h3 className="text-xl font-bold text-[#0F172A] mb-4 leading-tight">{post.title}</h3>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                   <span className="text-sm text-gray-500">{post.date}</span>
                   <Link href="#" className="text-[#1E3A8A] hover:text-[#2563EB] transition-colors">
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