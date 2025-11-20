import React, { useRef, useEffect, useState } from 'react';
import { Pickaxe, Gem, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  { 
    title: 'Ethical Extraction', 
    image: 'https://images.unsplash.com/photo-1576506542790-512445485a36?q=80&w=1600&auto=format&fit=crop',
    description: 'Partnering with local communities for sustainable and safe mining practices.'
  },
  { 
    title: 'High Purity Refining', 
    image: 'https://images.unsplash.com/photo-1639411677420-b903ce0920c4?q=80&w=1600&auto=format&fit=crop',
    description: 'State-of-the-art laboratories ensuring 99.9% purity in every bar.'
  },
  { 
    title: 'Secure Vaults', 
    image: 'https://images.unsplash.com/photo-1585428247990-3248788f8d49?q=80&w=1600&auto=format&fit=crop',
    description: 'World-class security infrastructure for storage and international logistics.'
  },
  { 
    title: 'Global Logistics', 
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1600&auto=format&fit=crop',
    description: 'Seamless CIF and FOB export procedures to major global hubs.'
  }
];

const SectionManifesto: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section ref={sectionRef} className={`py-20 md:py-32 bg-[#fafaf9] transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto mb-16 md:mb-24">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-serif leading-[1.4] text-stone-900">
            We don't just trade gold – we build trust. 
            <span className="inline-flex align-middle mx-1 md:mx-2 p-1 bg-amber-100 rounded-lg rotate-3">
               <Pickaxe className="text-amber-700" size={20} strokeWidth={1.5} />
            </span>
            Every ounce is tracked from the mine to the market, ensuring conflict-free sourcing.
            <span className="inline-flex align-middle mx-1 md:mx-2 p-1 bg-amber-100 rounded-lg -rotate-3">
               <Gem className="text-amber-700" size={20} strokeWidth={1.5} />
            </span>
            We provide international buyers with verified high-purity gold 
            <span className="inline-flex align-middle mx-1 md:mx-2">
                <img src="https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=100&auto=format&fit=crop" alt="Gold" className="w-8 h-6 md:w-10 md:h-8 rounded-md object-cover opacity-80" />
            </span>
            straight from Uganda's rich mineral belts. 
            <span className="opacity-30"> With rigorous assay testing and transparent documentation, we are the bridge between African resources and global value.</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative h-[400px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl group select-none">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div 
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === currentIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}
                >
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-black/30 md:bg-black/20"></div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col md:flex-row justify-between items-end gap-4">
                        <div className={`text-white transform transition-all duration-700 delay-300 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                             <h3 className="text-3xl md:text-5xl font-serif mb-2 text-amber-400">{slide.title}</h3>
                             <p className="text-white/90 text-sm md:text-base font-light max-w-md">{slide.description}</p>
                        </div>
                        
                        {/* Index number */}
                         <div className={`text-white/40 font-serif text-6xl hidden md:block transform transition-all duration-700 delay-300 ${index === currentIndex ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                             0{index + 1}
                         </div>
                    </div>
                </div>
            ))}

            {/* Controls */}
            <button 
                onClick={prevSlide} 
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 transition-all hover:scale-110"
                aria-label="Previous slide"
            >
                <ChevronLeft size={28} />
            </button>
            <button 
                onClick={nextSlide} 
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 transition-all hover:scale-110"
                aria-label="Next slide"
            >
                <ChevronRight size={28} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/20 backdrop-blur-sm p-2 rounded-full border border-white/10">
                {slides.map((_, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default SectionManifesto;