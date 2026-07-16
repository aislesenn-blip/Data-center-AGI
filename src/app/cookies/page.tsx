import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export default function CookiePolicy() {
  return (
    <main className="min-h-screen relative bg-white">
      <Navigation />

      <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <FadeIn>
          <div className="mb-12 border-b border-black/5 pb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Cookie Policy</h1>
            <p className="text-zinc-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div className="prose prose-zinc max-w-none text-feep-text-muted space-y-8">
            <p className="text-lg leading-relaxed">
              This Cookie Policy explains how FEEP uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-feep-text mb-4">1. What are cookies?</h2>
              <p className="leading-relaxed">
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-feep-text mb-4">2. Why do we use cookies?</h2>
              <p className="leading-relaxed">
                We use first and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies.
              </p>
            </div>

            <div className="pt-8 border-t border-black/5 mt-12">
              <p>For any inquiries regarding our use of cookies, please contact us at <a href="mailto:legal@feep.africa" className="text-feep-text font-semibold hover:underline">legal@feep.africa</a>.</p>
            </div>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </main>
  );
}
