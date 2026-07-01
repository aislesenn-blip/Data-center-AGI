import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Monitor, Smartphone, Navigation, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  const products = [
    {
      id: "in-transit",
      title: "In-Transit Digital Displays",
      desc: "Our flagship offering. High-definition screens installed inside premium auto-rickshaws, capturing a captive audience with 100% share of voice during their journey.",
      icon: <Monitor className="w-6 h-6 sm:w-8 sm:h-8 text-[#1E3A8A]" />,
      features: ["Captive Audience", "100% Video Completion Rate", "Audio Enabled (Optional)", "Interactive QR Codes"]
    },
    {
      id: "geo-fenced",
      title: "Geo-Fenced Campaigns",
      desc: "Don't just buy time; buy context. Serve specific creatives only when a vehicle enters a predefined geographic zone, such as a university campus or a specific retail district.",
      icon: <Navigation className="w-6 h-6 sm:w-8 sm:h-8 text-[#1E3A8A]" />,
      features: ["Hyper-local Targeting", "Dynamic Contextual Relevance", "Reduced Wastage", "Footfall Attribution"]
    }
  ];

  return (
    <>
      <Hero
        title={<>Premium canvas for <span className="text-[#1E3A8A]">mobility brands.</span></>}
        subtitle="Explore our portfolio of high-impact digital transit products. We provide the AdTech infrastructure to reach consumers where traditional billboards cannot."
        align="center"
      />

      <Section bg="white" className="border-t border-gray-100">
        <div className="space-y-16 md:space-y-24">
          {products.map((product, idx) => (
            <div key={product.id} className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1 w-full">
                <div className="rounded-3xl overflow-hidden shadow-xl relative aspect-[4/3] bg-gray-100 border border-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 font-medium">Product visualization</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                  {product.icon}
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F172A] mb-3 sm:mb-4 tracking-tight">{product.title}</h2>
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">{product.desc}</p>
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm sm:text-base text-gray-700 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="inline-flex items-center justify-center bg-[#1E3A8A] hover:bg-[#2563EB] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-medium transition-colors gap-2 group w-full sm:w-auto min-h-[56px] md:min-h-[48px] touch-manipulation">
                  Request Media Kit
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
