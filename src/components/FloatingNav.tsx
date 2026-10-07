import React from 'react';
import { Home, Package, Search, User } from 'lucide-react';

interface FloatingNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function FloatingNav({ currentTab, onTabChange }: FloatingNavProps) {
  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="bg-white/90 backdrop-blur-md shadow-lg rounded-full px-6 py-3 flex items-center justify-between w-full max-w-sm border border-black/5 pointer-events-auto">
        <NavItem icon={<Home size={24} />} label="Home" active={currentTab === 'home'} onClick={() => onTabChange('home')} />
        <NavItem icon={<Search size={24} />} label="Send" active={currentTab === 'find'} onClick={() => onTabChange('find')} />
        <NavItem icon={<Package size={24} />} label="History" active={currentTab === 'history'} onClick={() => onTabChange('history')} />
        <NavItem icon={<User size={24} />} label="Profile" active={currentTab === 'profile'} onClick={() => onTabChange('profile')} />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center space-y-1 transition-colors ${active ? 'text-bluepost-primary' : 'text-bluepost-muted hover:text-bluepost-dark'}`}>
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
