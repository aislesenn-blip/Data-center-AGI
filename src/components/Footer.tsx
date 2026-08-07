import Link from "next/link";
import FadeIn from "./FadeIn";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-diaspedia-text text-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="text-3xl font-bold tracking-tighter text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-diaspedia-primary flex items-center justify-center text-sm font-black text-diaspedia-text">
                d
              </span>
              diaspedia
            </Link>
            <p className="text-zinc-400 max-w-sm text-sm leading-relaxed">
              Together, we make cross-border cheaper. Starting with combined shipments to reduce costs for global diasporas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase text-zinc-500">Diaspedia</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-zinc-300 hover:text-diaspedia-primary text-sm transition-colors">Home</Link></li>
              <li><Link href="/#shipments" className="text-zinc-300 hover:text-diaspedia-primary text-sm transition-colors">Active Shipments</Link></li>
              <li><Link href="/#how-it-works" className="text-zinc-300 hover:text-diaspedia-primary text-sm transition-colors">How it Works</Link></li>
              <li><Link href="/careers" className="text-zinc-300 hover:text-diaspedia-primary text-sm transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase text-zinc-500">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-zinc-300 hover:text-diaspedia-primary text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-zinc-300 hover:text-diaspedia-primary text-sm transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-zinc-300 hover:text-diaspedia-primary text-sm transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase text-zinc-500">Connect</h4>
            <ul className="space-y-3">
              <li><Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-diaspedia-primary text-sm transition-colors">LinkedIn</Link></li>
              <li><Link href="mailto:hello@diaspedia.com" className="text-zinc-300 hover:text-diaspedia-primary text-sm transition-colors">Email Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            &copy; {currentYear} diaspedia. All rights reserved.
          </p>
          <div className="text-xs text-zinc-600 max-w-md text-center sm:text-right">
            Diaspedia is building cross-border payment and logistics infrastructure. Services are subject to local partner compliance.
          </div>
        </div>
      </div>
    </footer>
  );
}
