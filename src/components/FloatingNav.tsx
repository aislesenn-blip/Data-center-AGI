import React from 'react';
import { Home, Package, Search, User } from 'lucide-react';

export default function FloatingNav() {
  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="bg-white/90 backdrop-blur-md shadow-lg rounded-full px-6 py-3 flex items-center justify-between w-full max-w-sm border border-black/5 pointer-events-auto">
        <NavItem icon={<Home size={24} />} label="Home" active />
        <NavItem icon={<Search size={24} />} label="Find" />
        <NavItem icon={<Package size={24} />} label="Shipments" />
        <NavItem icon={<User size={24} />} label="Profile" />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`flex flex-col items-center justify-center space-y-1 transition-colors ${active ? 'text-bluepost-primary' : 'text-bluepost-muted hover:text-bluepost-dark'}`}>
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
