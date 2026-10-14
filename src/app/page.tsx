import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import WhoWeServe from "@/components/WhoWeServe";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Products />
      <WhoWeServe />
      <FAQ />

      {/* Simple Footer */}
      <footer className="px-6 py-12 max-w-md mx-auto text-center border-t border-gray-100 mt-8">
        <p className="font-sans text-sm text-text-secondary">
          &copy; {new Date().getFullYear()} DebitBeans. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
