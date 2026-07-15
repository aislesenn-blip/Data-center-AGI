import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import WhyFeep from "@/components/WhyFeep";
import HowItWorks from "@/components/HowItWorks";
import Impact from "@/components/Impact";
import WhyNow from "@/components/WhyNow";
import Vision from "@/components/Vision";
import Investors from "@/components/Investors";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full h-full relative scroll-smooth selection:bg-feep-primary/30">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <WhyFeep />
      <HowItWorks />
      <Impact />
      <WhyNow />
      <Vision />
      <Investors />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
