import React, { useRef, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    id: '01',
    title: 'Mineral Exploration',
    description: 'Advanced geophysical surveys and core sampling to identify high-yield gold deposits with precision and minimal environmental impact.',
  },
  {
    id: '02',
    title: 'Resource Management',
    description: 'Comprehensive site planning and logistics to ensure efficient extraction, regulatory compliance, and sustainable resource utilization.',
  },
  {
    id: '03',
    title: 'Smart Infrastructure',
    description: 'Deploying automated systems and IoT monitoring for real-time safety tracking and operational efficiency in remote mining locations.',
  }
];

const SectionServices: React.FC = () => {
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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section ref={sectionRef} className={`py-24 bg-stone-50 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
             <h2 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-2">Our Capabilities</h2>
             <h3 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">Strength below surface. Proven technical solutions.</h3>
          </div>
          <button className="hidden md:flex items-center gap-2 px-6 py-3 border border-stone-300 rounded-full text-xs font-bold uppercase hover:bg-stone-900 hover:text-white transition-colors mt-6 md:mt-0">
            View All Services
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
           {services.map((service) => (
             <div key={service.id} className="group border-t border-stone-200 py-12 flex flex-col md:flex-row gap-8 items-start md:items-center hover:bg-white transition-colors duration-300 px-4 md:px-8 rounded-3xl">
                <span className="text-4xl md:text-6xl font-serif text-stone-200 group-hover:text-amber-500 transition-colors font-bold">
                  {service.id}
                </span>
                <div className="flex-1">
                   <h4 className="text-2xl font-serif text-stone-900 mb-2">{service.title}</h4>
                   <p className="text-stone-500 max-w-xl">{service.description}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 group-hover:bg-stone-900 group-hover:text-white group-hover:border-stone-900 transition-all">
                   <ArrowUpRight size={20} />
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default SectionServices;