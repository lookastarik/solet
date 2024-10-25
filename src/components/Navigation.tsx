import React from 'react';
import { Train } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationProps {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  sections: Array<{ id: string; title: string; color: string }>;
  activeSection: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  scrolled,
  menuOpen,
  setMenuOpen,
  sections,
  activeSection,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className={`w-full transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Train className={`w-8 h-8 ${scrolled ? 'text-blue-600' : 'text-white'}`} />
            <span className={`font-bold text-xl ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              T219 Project
            </span>
          </div>
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className={`z-50 text-2xl ${scrolled ? 'text-gray-800' : 'text-white'}`}
          >
            {menuOpen ? '×' : '☰'}
          </button>
        </div>
      </nav>

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: menuOpen ? 0 : '100%' }}
        transition={{ type: 'tween' }}
        className="fixed top-0 right-0 bottom-0 w-80 bg-black/95 backdrop-blur-lg text-white z-40 p-8 pt-20"
      >
        <ul className="space-y-6">
          {sections.map((section, index) => (
            <motion.li
              key={section.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => {
                  window.scrollTo({ top: index * window.innerHeight, behavior: 'smooth' });
                  setMenuOpen(false);
                }}
                className={`text-lg transition-colors ${activeSection === index ? 'font-bold' : ''}`}
                style={{ color: section.color }}
              >
                {section.title}
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </header>
  );
};