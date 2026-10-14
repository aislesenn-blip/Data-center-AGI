import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm">
      <div className="flex items-center justify-between py-6 px-6 max-w-md mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-db-blue flex items-center justify-center text-white font-serif font-bold text-lg">
            DB
          </div>
          <span className="font-sans font-bold text-db-blue text-xl tracking-tight">
            DebitBeans
          </span>
        </div>

        {/* Hamburger Menu */}
        <button aria-label="Menu" className="text-text-primary p-2">
          <Menu className="w-6 h-6 stroke-1" />
        </button>
      </div>
    </header>
  );
}
