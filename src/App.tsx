import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { Scene3D } from './components/Scene3D';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const sections = [
  { id: 'overview', title: 'Overview', color: '#FF4D4D', 
    content: "Singapore's T219 metro project represents a milestone in underground construction." },
  { id: 'challenge', title: 'The Challenge', color: '#4D79FF',
    content: "Constructing underground in Singapore's dense urban environment while maintaining stability." },
  { id: 'solution', title: 'Our Solution', color: '#4DFF4D',
    content: "Innovative diaphragm wall technology combined with advanced monitoring systems." },
  { id: 'key-figures', title: 'Key Figures', color: '#FFD84D',
    content: "450+ team members, 3 stations, 9 years of dedication." },
  { id: 'gallery', title: 'Gallery', color: '#FF4DFF',
    content: "Witness the evolution of this remarkable engineering achievement." },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const section = Math.floor(window.scrollY / window.innerHeight);
      setActiveSection(section);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateSection = (direction: 'prev' | 'next') => {
    const newSection = direction === 'prev' 
      ? Math.max(0, activeSection - 1)
      : Math.min(sections.length - 1, activeSection + 1);
    
    window.scrollTo({ top: newSection * window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <Navigation
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        sections={sections}
        activeSection={activeSection}
      />

      {sections.map((section, index) => (
        <motion.section
          key={section.id}
          className="relative h-screen flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: activeSection === index ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 -z-10">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <OrbitControls enableZoom={false} enablePan={false} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Scene3D activeSection={activeSection} sections={sections} />
            </Canvas>
          </div>

          <div className="container mx-auto px-6 text-white text-center z-10">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl font-bold mb-8" style={{ color: section.color }}>
                {section.title}
              </h1>
              <p className="text-xl max-w-2xl mx-auto leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          </div>

          {index < sections.length - 1 && (
            <ChevronDown
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-8 animate-bounce cursor-pointer text-white"
              onClick={() => navigateSection('next')}
            />
          )}
        </motion.section>
      ))}

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => window.scrollTo({ top: index * window.innerHeight, behavior: 'smooth' })}
            className="w-3 h-3 rounded-full transition-colors duration-300"
            style={{ 
              backgroundColor: activeSection === index ? section.color : 'rgba(255,255,255,0.3)' 
            }}
          />
        ))}
      </div>

      <button
        onClick={() => navigateSection('prev')}
        className="fixed top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => navigateSection('next')}
        className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}