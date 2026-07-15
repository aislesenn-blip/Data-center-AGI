export default function Footer() {
  return (
    <footer className="bg-white py-12 px-6 md:px-12 lg:px-24 border-t border-zinc-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">

        <div className="text-center md:text-left">
          <div className="text-2xl font-bold tracking-tighter mb-4">FEEP</div>
          <p className="text-sm text-zinc-500 max-w-xs">
            Education financing built for the future.
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 text-sm font-medium text-zinc-600">
          <a href="#about" className="hover:text-zinc-900 transition-colors">About</a>
          <a href="#mission" className="hover:text-zinc-900 transition-colors">Mission</a>
          <a href="#impact" className="hover:text-zinc-900 transition-colors">Partners</a>
          <a href="#careers" className="hover:text-zinc-900 transition-colors">Careers</a>
          <a href="#contact" className="hover:text-zinc-900 transition-colors">Contact</a>
          <a href="#linkedin" className="hover:text-zinc-900 transition-colors">LinkedIn</a>
          <a href="mailto:hello@feep.com" className="hover:text-zinc-900 transition-colors">Email</a>
          <a href="#privacy" className="hover:text-zinc-900 transition-colors">Privacy</a>
          <a href="#terms" className="hover:text-zinc-900 transition-colors">Terms</a>
        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-400">
        <p>&copy; {new Date().getFullYear()} FEEP Global. All rights reserved.</p>
        <p>Global Headquarters</p>
      </div>
    </footer>
  );
}
