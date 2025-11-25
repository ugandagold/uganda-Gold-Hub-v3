import React, { useState, useEffect, useRef } from 'react';
import { Pause, Volume2 } from 'lucide-react';

const tabs = [
  { id: 'heritage', label: 'Mineral Wealth', content: 'Uganda sits on a vast, mineral-rich geological belt. Our hub taps into this natural abundance, connecting artisanal discoveries with the global marketplace.', image: 'https://github.com/ugandagold/ugandagoldhubpics/blob/main/Generated%20image%201%20(6).png?raw=true' },
  { id: 'compliance', label: 'Full Compliance', content: 'We adhere to strict OECD Due Diligence Guidance. Every trade is documented, taxed, and certified by the Department of Geological Survey and Mines.', image: 'https://github.com/ugandagold/ugandagoldhubpics/blob/main/Generated%20image%201%20(7).png?raw=true' },
  { id: 'community', label: 'Community', content: 'We believe in fair trade. A portion of our proceeds is reinvested into mining communities to improve safety standards and local infrastructure.', image: 'https://github.com/ugandagold/ugandagoldhubpics/blob/main/download%20(1).jpg?raw=true' },
];

const SectionStory: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section ref={sectionRef} className={`py-20 md:py-32 bg-[#fafaf9] transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 relative">
          
          {/* Left: Navigation */}
          <div className="w-full lg:w-1/3 z-10">
            <div className="flex flex-col items-start gap-4 md:gap-6">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  className={`text-2xl md:text-3xl lg:text-4xl font-serif transition-all duration-300 flex items-center gap-4 ${activeTab === index ? 'text-stone-900' : 'text-stone-300 hover:text-stone-400'}`}
                >
                  {activeTab === index && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Center: Floating Card */}
          <div className="lg:absolute lg:left-[35%] lg:top-1/2 lg:-translate-y-1/2 lg:z-20 w-full max-w-sm order-last lg:order-none">
            <div className="bg-[#EAE8E2] p-6 rounded-[2rem] shadow-xl animate-fade-in">
               <div className="h-40 overflow-hidden mb-6 rounded-2xl relative">
                 <img src="https://github.com/ugandagold/ugandagoldhubpics/blob/main/bg2.webp?raw=true" alt="Detail" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="text-amber-400 font-serif text-3xl drop-shadow-md">UG Hub</span>
                 </div>
               </div>
               <p className="text-stone-600 leading-relaxed text-sm font-medium">
                 {tabs[activeTab].content}
               </p>
            </div>
          </div>

          {/* Right: Large Image/Video */}
          <div className="lg:w-1/2 w-full flex justify-end">
            <div className="relative h-[400px] md:h-[600px] w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
               <img 
                 src={tabs[activeTab].image} 
                 alt={tabs[activeTab].label} 
                 className="w-full h-full object-cover transition-all duration-500"
               />
               <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                 <div className="flex gap-2 text-white text-xs font-medium">
                     <span>||</span>
                 </div>
                 <div className="text-white">
                     <Volume2 size={16} />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionStory;