import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Careers() {
  return (
    <main className="min-h-screen relative bg-white">
      <Navigation />

      <div className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Join FEEP</h1>
            <p className="text-xl text-feep-text-muted max-w-2xl mx-auto leading-relaxed">
              We are building the financial infrastructure for education in emerging markets. Join us in making uninterrupted learning a reality for millions.
            </p>
          </div>

          <div className="bg-feep-bg rounded-3xl p-12 text-center border border-black/5">
            <h2 className="text-2xl font-bold mb-4">No open roles currently</h2>
            <p className="text-lg text-feep-text-muted mb-8 max-w-lg mx-auto">
              We are not actively hiring at this moment, but we are always looking for exceptional talent in engineering, product, and partnerships.
            </p>
            <Link href="mailto:careers@feep.africa">
              <button className="bg-feep-text text-white px-8 py-4 rounded-xl font-semibold hover:bg-black transition-colors inline-flex items-center gap-2">
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
