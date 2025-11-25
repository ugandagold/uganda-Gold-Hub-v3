import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

const heroSlides = [
  {
    image: 'https://github.com/ugandagold/ugandagoldhubpics/blob/main/Generated%20image%201%20(4).png?raw=true',
    label: 'Karamoja Gold Belt'
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen md:h-[110vh] md:min-h-[800px] overflow-hidden bg-stone-900">
      {/* Background Carousel */}
      {heroSlides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('${slide.image}')` }} 
        >
          <div className="absolute inset-0 bg-black/40 md:bg-black/30"></div>
        </div>
      ))}

      {/* Location/Slide Indicator */}
      <div className="absolute bottom-8 right-6 md:right-12 z-20 flex items-center gap-3 animate-fade-in-up">
          <span className="text-white/60 text-xs font-serif italic tracking-wider">{heroSlides[currentSlide].label}</span>
          <div className="flex gap-1.5">
            {heroSlides.map((_, idx) => (
                <button 
                    key={idx} 
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-8 bg-amber-500' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                />
            ))}
          </div>
      </div>

      <div className="relative container mx-auto px-6 h-full flex flex-col justify-end pb-24 md:pb-32 pt-32 md:pt-0">
        
        {/* Floating Product Card - Right Side (Hidden on Mobile) */}
        <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 md:translate-y-0 md:bottom-40 md:top-auto md:right-12 bg-white/20 backdrop-blur-xl border border-white/30 p-4 rounded-3xl max-w-xs shadow-2xl animate-fade-in-up z-20">
          <div className="flex gap-4 items-center">
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white flex items-center justify-center">
              <img src="https://github.com/ugandagold/ugandagoldhubpics/blob/main/imgi_6_goooo-m5KL1R1L7BSQGEo1-1.webp?raw=true" alt="Gold Bar" className="w-full h-full object-cover" />
            </div>
            <div className="text-white">
              <h4 className="font-serif font-semibold text-lg leading-tight">1kg Gold Bullion (99.9%)</h4>
              <p className="text-xs text-white/80 mt-1 mb-2 leading-tight line-clamp-2">Certified LBMA purity, sourced directly from Ugandan mines.</p>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">$76,450.00</span>
                <span className="text-xs text-white/60">+1.2% Today</span>
              </div>
            </div>
          </div>
          {/* Hotspot Dot */}
          <div className="absolute -top-12 -left-12 w-8 h-8 rounded-full border-2 border-amber-400 flex items-center justify-center animate-pulse cursor-pointer">
            <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
          </div>
        </div>

        <div className="max-w-4xl text-white mt-10 md:mt-20 relative z-10">
          {/* Glassy Nav Bar */}
          <div className="inline-flex flex-wrap md:flex-nowrap items-center gap-1 p-1 rounded-2xl md:rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 overflow-hidden">
             {['BULLION', 'NUGGETS', 'DUST', 'REFINING'].map((item, idx) => (
               <button 
                 key={item} 
                 className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-xl md:rounded-full text-[10px] md:text-xs font-bold tracking-wide transition-all whitespace-nowrap ${idx === 0 ? 'bg-amber-400 text-stone-900 shadow-lg' : 'text-white hover:bg-white/10'}`}
               >
                 {item}
               </button>
             ))}
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-serif leading-[0.95] md:leading-[0.9] mb-6 md:mb-8 tracking-tight break-words">
            Premium Gold, <br className="hidden md:block" />
            Responsibly Sourced <br className="hidden md:block" />
            from Uganda
          </h2>
          
          <p className="text-base md:text-lg text-white/90 md:text-white/80 mb-8 md:mb-10 max-w-md leading-relaxed font-light">
            Connecting international investors with high-purity gold straight from the heart of Africa. Transparent, secure, and certified.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <button className="px-8 py-4 bg-amber-500 text-stone-900 rounded-full text-xs font-bold hover:bg-amber-400 transition-colors tracking-widest uppercase text-center border border-amber-400">
              View Market Rates
            </button>
            <button className="flex items-center justify-center gap-3 px-6 py-4 text-white text-xs font-bold tracking-widest uppercase hover:text-white/80 transition-colors group">
              <span className="w-6 h-6 flex items-center justify-center bg-white/20 rounded-full">
                <Play size={10} fill="currentColor" />
              </span>
              Our Extraction Process
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;