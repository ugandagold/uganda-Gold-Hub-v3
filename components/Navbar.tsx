import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const linkClass = (page: string) => 
    `cursor-pointer transition-colors ${currentPage === page ? 'text-amber-600 font-semibold' : 'text-stone-900 hover:text-amber-600'}`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-stone-50/95 backdrop-blur-md py-4 shadow-sm' : 'bg-stone-50/90 py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-12">
            {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => handleNavClick('home')}
          >
             <div className="w-10 h-10 bg-transparent border-2 border-amber-500 rounded-full flex items-center justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-amber-600"><path d="m2 9 3-3 3 3"/><path d="M13 6h7"/><path d="M8 19h13"/><path d="m16 16 3 3-3 3"/></svg>
             </div>
             <h1 className="text-2xl font-serif font-bold tracking-tight text-amber-500 uppercase">ZORION</h1> 
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-8 text-sm font-medium text-stone-400">
            <button onClick={() => handleNavClick('home')} className={linkClass('home')}>Home</button>
            <button onClick={() => handleNavClick('about')} className={linkClass('about')}>About Us</button>
            <button onClick={() => handleNavClick('service')} className={linkClass('service')}>Service</button>
            <button onClick={() => handleNavClick('contact')} className={linkClass('contact')}>Contact Us</button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => handleNavClick('contact')}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 border border-stone-800 rounded-none text-xs font-bold uppercase tracking-widest hover:bg-amber-500 hover:border-amber-500 hover:text-stone-900 transition-all"
          >
            Call Us
          </button>
          <button className="lg:hidden text-stone-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-stone-50 border-t border-stone-200 p-6 lg:hidden flex flex-col gap-4 shadow-xl">
          <button onClick={() => handleNavClick('home')} className="text-lg font-serif text-left text-stone-900 hover:text-amber-600">Home</button>
          <button onClick={() => handleNavClick('about')} className="text-lg font-serif text-left text-stone-900 hover:text-amber-600">About Us</button>
          <button onClick={() => handleNavClick('service')} className="text-lg font-serif text-left text-stone-900 hover:text-amber-600">Service</button>
          <button onClick={() => handleNavClick('contact')} className="text-lg font-serif text-left text-stone-900 hover:text-amber-600">Contact Us</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;