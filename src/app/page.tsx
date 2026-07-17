import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Modular Sections
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import ImpactSection from "@/components/sections/ImpactSection";
import VisionSection from "@/components/sections/VisionSection";
import FounderSection from "@/components/sections/FounderSection";
import InvestorsSection from "@/components/sections/InvestorsSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <CategoriesSection />
      <ImpactSection />
      <VisionSection />
      <FounderSection />
      <InvestorsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}