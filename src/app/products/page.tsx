import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Monitor, Car, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  const products = [
    {
      id: "in-rickshaw-displays",
      title: "In-Rickshaw Smart Screens",
      desc: "Transform every ride into an immersive brand experience. Our high-definition screens installed inside auto-rickshaws provide an unmissable, distraction-free environment for passengers during their daily commute.",
      icon: <Car className="w-8 h-8 text-[#1E3A8A]" />,
      image: "https://images.unsplash.com/photo-1593950315186-76a92975b60c?auto=format&fit=crop&q=80&w=1200" // Note: Replaced with a more generic tech/mobility image, a specific rickshaw screen image would be best
    },
    {
      id: "connected-fleet",
      title: "Connected Fleet Technology",
      desc: "Our displays are powered by a proprietary OS ensuring constant connectivity, real-time diagnostic reporting, and precise location tracking, turning analog vehicles into a synchronized digital network.",
      icon: <Cpu className="w-8 h-8 text-[#1E3A8A]" />,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "dynamic-content",
      title: "Context-Aware Content Delivery",
      desc: "Deliver the right message at the right place. Our system allows for dynamic creative swapping based on real-time location, time of day, and environmental triggers as the vehicle moves through the city.",
      icon: <Monitor className="w-8 h-8 text-[#1E3A8A]" />,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  return (
    <>
      <Hero
        title={<>Next-generation <span className="text-[#1E3A8A]">mobility media.</span></>}
        subtitle="Explore our advanced in-vehicle digital advertising technology. We turn auto-rickshaws into powerful, moving digital canvases that capture attention where it matters most."
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
                  {["100% Share of Voice Options", "Full-Motion Video Capabilities", "Location-Based Triggers", "Verified Playback Reporting"].map((feature, i) => (
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
