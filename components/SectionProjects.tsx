import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'Terrablast Resource Management & Blasting',
    location: 'Australia',
    year: '2023-2026',
    image: 'https://images.unsplash.com/photo-1578326457399-3b34dbbf23b8?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Minerex Site Resource Management & Survey',
    location: 'Canada',
    year: '2022-2025',
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Coreline Advanced Mineral Exploration',
    location: 'South Africa',
    year: '2021-2024',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Orevision Integrated Survey & Extraction',
    location: 'Chile',
    year: '2021-2024',
    image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Deepcore Strategic High-Risk Site Evaluation',
    location: 'Peru',
    year: '2022-2025',
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Tratalink Mineral Logistics & Site Planning',
    location: 'Mongolia',
    year: '2022-2025',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop'
  }
];

const SectionProjects: React.FC = () => {
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
    <section ref={sectionRef} className={`py-24 bg-[#F5F5F4] transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
           <div>
              <h2 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-2">Our Projects</h2>
              <h3 className="text-3xl md:text-4xl font-serif text-stone-900">Take a closer look at our latest projects</h3>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {projects.map((project, idx) => (
             <div key={idx} className="group relative overflow-hidden rounded-[2rem] aspect-[4/3] cursor-pointer">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
                
                <div className="absolute top-6 left-6">
                   <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{project.location}, {project.year}</span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                   <h4 className="text-white font-serif text-xl leading-snug mb-4">{project.title}</h4>
                   <div className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      View Case Study <ArrowRight size={14} />
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default SectionProjects;