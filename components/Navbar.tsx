import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/256761389093', '_blank');
  };

  const linkClass = "cursor-pointer transition-colors text-stone-900 hover:text-amber-600 font-medium";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-stone-50/95 backdrop-blur-md py-3 md:py-4 shadow-sm' : 'bg-stone-50/90 py-4 md:py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-12">
              {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer" 
              onClick={() => handleNavClick('home')}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-transparent border-2 border-amber-500 rounded-full flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5 text-amber-600"><path d="m2 9 3-3 3 3"/><path d="M13 6h7"/><path d="M8 19h13"/><path d="m16 16 3 3-3 3"/></svg>
              </div>
              <h1 className="text-lg md:text-2xl font-serif font-bold tracking-tight text-amber-500 uppercase">Uganda Gold Hub</h1> 
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex gap-8 text-sm font-medium text-stone-400">
              <button onClick={() => handleNavClick('home')} className={linkClass}>Home</button>
              <button onClick={() => handleNavClick('about')} className={linkClass}>About Us</button>
              <button onClick={() => handleNavClick('service')} className={linkClass}>Service</button>
              <button onClick={() => handleNavClick('contact')} className={linkClass}>Contact Us</button>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button 
              onClick={handleWhatsApp}
              className="hidden md:flex items-center gap-2 px-6 py-2.5 border border-stone-800 rounded-none text-xs font-bold uppercase tracking-widest hover:bg-green-600 hover:border-green-600 hover:text-white transition-all text-stone-900"
            >
              <MessageCircle size={16} />
              WhatsApp
            </button>
            <button className="lg:hidden text-stone-900 p-2" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] bg-stone-50 transition-transform duration-300 ease-in-out lg:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-6 border-b border-stone-100">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-2 border-amber-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-amber-600"><path d="m2 9 3-3 3 3"/><path d="M13 6h7"/><path d="M8 19h13"/><path d="m16 16 3 3-3 3"/></svg>
                </div>
                <span className="font-serif font-bold text-amber-500 uppercase">UG Gold Hub</span>
             </div>
             <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-stone-900 bg-stone-100 rounded-full">
               <X size={24} />
             </button>
          </div>

          {/* Links */}
          <div className="flex-1 flex flex-col justify-center px-8 gap-6">
            <button onClick={() => handleNavClick('home')} className="text-3xl font-serif font-bold text-stone-900 text-left hover:text-amber-600 transition-colors">Home</button>
            <button onClick={() => handleNavClick('about')} className="text-3xl font-serif font-bold text-stone-900 text-left hover:text-amber-600 transition-colors">About Us</button>
            <button onClick={() => handleNavClick('service')} className="text-3xl font-serif font-bold text-stone-900 text-left hover:text-amber-600 transition-colors">Service</button>
            <button onClick={() => handleNavClick('contact')} className="text-3xl font-serif font-bold text-stone-900 text-left hover:text-amber-600 transition-colors">Contact Us</button>
          </div>

          {/* Mobile Footer Action */}
          <div className="p-8 border-t border-stone-100 bg-stone-100/50">
            <button 
              onClick={handleWhatsApp} 
              className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-green-600/20"
            >
              <MessageCircle size={24} />
              WhatsApp Us
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;