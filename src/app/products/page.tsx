import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Monitor, Smartphone, Train, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  const products = [
    {
      id: "billboards",
      title: "Large Format Digital Billboards",
      desc: "Dominate the skyline with ultra-high-definition, monumental digital screens on key arterial routes. Perfect for building massive brand awareness and delivering memorable creative campaigns.",
      icon: <Monitor className="w-8 h-8 text-[#1E3A8A]" />,
      image: "https://images.unsplash.com/photo-1598285906232-2630cecc3a42?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "street-furniture",
      title: "Street Furniture & Urban Panels",
      desc: "Engage pedestrians and vehicular traffic at eye level. Located in high-dwell environments like transit shelters and pedestrian zones, offering opportunities for detailed messaging and mobile integration.",
      icon: <Smartphone className="w-8 h-8 text-[#1E3A8A]" />,
      image: "https://images.unsplash.com/photo-1518972554767-f58c73229862?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "transit",
      title: "Transit & Airport Networks",
      desc: "Reach a captive audience of business travelers, tourists, and daily commuters. Premium indoor digital networks that offer 100% video completion rates and highly targeted audience profiles.",
      icon: <Train className="w-8 h-8 text-[#1E3A8A]" />,
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  return (
    <>
      <Hero
        title={<>Premium canvas for <span className="text-[#1E3A8A]">premium brands.</span></>}
        subtitle="Explore our portfolio of high-impact digital out-of-home products. From monumental billboards to intimate street-level screens, we provide the infrastructure for world-class storytelling."
        align="center"
      />

      <Section bg="white" className="border-t border-gray-100">
        <div className="space-y-24">
          {products.map((product, idx) => (
            <div key={product.id} className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1 w-full">
                <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-[4/3]">
                  <img src={product.image} alt={product.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  {product.icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 tracking-tight">{product.title}</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">{product.desc}</p>
                <ul className="space-y-3 mb-8">
                  {["100% Share of Voice Options", "Full-Motion Video Capabilities", "Programmatic Integration (VIOOH/Broadsign)", "Dynamic Creative Support"].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="inline-flex items-center justify-center bg-[#1E3A8A] hover:bg-[#2563EB] text-white px-6 py-3 rounded-lg font-medium transition-colors gap-2 group">
                  Request Media Kit
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}