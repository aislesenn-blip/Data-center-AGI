import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { ArrowRight, Globe, Shield, Wallet, Users } from "lucide-react";

export default function Careers() {
  const values = [
    {
      icon: Globe,
      title: "Global First",
      desc: "Our communities span across continents. We build systems that make borders feel invisible."
    },
    {
      icon: Shield,
      title: "Trust Over Everything",
      desc: "Moving packages and money across borders requires absolute precision, transparency, and integrity."
    },
    {
      icon: Users,
      title: "Community Driven",
      desc: "We believe in the power of people coming together to solve major economic friction."
    }
  ];

  return (
    <main className="min-h-screen relative bg-white">
      <Navigation />

      <div className="pt-36 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Build the future of cross-border finance</h1>
            <p className="text-xl text-diaspedia-text-muted max-w-2xl mx-auto leading-relaxed">
              Diaspedia is creating reliable, combined shipping routes and digital rails for global diasporas. Help us make sending items and support home simple and cheap.
            </p>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-diaspedia-bg border border-black/5">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-diaspedia-accent shadow-sm mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{v.title}</h3>
                  <p className="text-sm text-diaspedia-text-muted leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-diaspedia-bg rounded-3xl p-12 text-center border border-black/5">
            <h2 className="text-2xl font-bold mb-4">No open roles currently</h2>
            <p className="text-lg text-diaspedia-text-muted mb-8 max-w-lg mx-auto">
              We are not actively hiring at this moment, but we are always looking for exceptional engineers, product designers, and cross-border operations managers.
            </p>
            <Link href="mailto:careers@diaspedia.com">
              <button className="bg-diaspedia-text text-white px-8 py-4 rounded-xl font-semibold hover:bg-black transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm">
                Send an open application <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </main>
  );
}
