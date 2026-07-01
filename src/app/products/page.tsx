import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Monitor, CreditCard, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  const products = [
    {
      id: "transit-nodes",
      title: "Interactive Transit Nodes",
      desc: "Transform every ride into an immersive commerce and brand experience. Our high-definition screens provide an unmissable, distraction-free environment for passengers to interact with digital services during their daily commute.",
      icon: <Monitor className="w-8 h-8 text-[#1E3A8A]" />,
      image: "https://images.unsplash.com/photo-1593950315186-76a92975b60c?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "connected-os",
      title: "Connected Operating System",
      desc: "Our nodes are powered by a proprietary OS ensuring constant connectivity, real-time diagnostic reporting, and precise location tracking, acting as the secure foundation for third-party application deployment.",
      icon: <Cpu className="w-8 h-8 text-[#1E3A8A]" />,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "urban-commerce",
      title: "Urban Commerce API",
      desc: "Frictionless engagement on the move. Our API allows fintechs, banks, and retail brands to deliver context-aware, location-triggered applications and transactions directly to the passenger.",
      icon: <CreditCard className="w-8 h-8 text-[#1E3A8A]" />,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  return (
    <>
      <Hero
        title={<>The interaction layer for <span className="text-[#1E3A8A]">urban commerce.</span></>}
        subtitle="Explore our advanced transit infrastructure products. We turn public mobility into a synchronized, secure platform where brands and services can seamlessly engage captive audiences."
        align="center"
      />

      <Section bg="white" className="border-t border-gray-100">
        <div className="space-y-24 max-w-[1400px] mx-auto">
          {products.map((product, idx) => (
            <div key={product.id} className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1 w-full">
                <div className="rounded-[2rem] overflow-hidden shadow-2xl relative aspect-[4/3]">
                  <img src={product.image} alt={product.title} className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
              <div className="flex-1">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
                  {product.icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 tracking-tight">{product.title}</h2>
                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">{product.desc}</p>
                <ul className="space-y-4 mb-10">
                  {["Secure Application Deployment", "Full-Motion Interactive Capabilities", "Location-Based API Triggers", "Verified Transaction Reporting"].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                      <div className="w-2 h-2 rounded-full bg-[#2563EB]"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="inline-flex items-center justify-center bg-[#1E3A8A] hover:bg-[#2563EB] text-white px-8 py-4 rounded-xl font-bold transition-colors gap-2 group text-lg">
                  Request Technical Docs
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
