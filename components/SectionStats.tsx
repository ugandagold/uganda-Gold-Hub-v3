import React, { useState, useEffect, useRef } from 'react';

const SectionStats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState({ sites: 0, hours: 0, tons: 0 });

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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const interval = duration / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        // Ease out cubic function for smooth landing
        const ease = 1 - Math.pow(1 - progress, 3); 
        
        setCounts({
          sites: Math.min(Math.floor(35 * ease), 35),
          hours: Math.min(Math.floor(24 * ease), 24),
          tons: Math.min(Math.floor(120 * ease), 120)
        });

        if (step >= steps) clearInterval(timer);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-16 bg-stone-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1608044893318-6e2e33c41486?q=80&w=2000&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="p-4">
            <p className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-2">
              {counts.sites}+
            </p>
            <p className="text-sm md:text-base font-medium uppercase tracking-widest text-stone-300">Active Mining Sites</p>
          </div>
          <div className="p-4">
            <p className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-2">
              {counts.hours}/7
            </p>
            <p className="text-sm md:text-base font-medium uppercase tracking-widest text-stone-300">Monitoring & Operations</p>
          </div>
          <div className="p-4">
            <p className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-2">
              {counts.tons}M+
            </p>
            <p className="text-sm md:text-base font-medium uppercase tracking-widest text-stone-300">Tons Processed Annually</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionStats;