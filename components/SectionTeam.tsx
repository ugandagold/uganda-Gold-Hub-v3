import React, { useRef, useEffect, useState } from 'react';
import { TeamMember } from '../types';
import { Linkedin, Twitter, Facebook } from 'lucide-react';

// Team data from screenshot
const teamData: TeamMember[] = [
  { id: '1', name: 'Leo Carter', role: 'Equipment Operator', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600&auto=format&fit=crop', quote: 'Precision in operation ensures safety for everyone.' },
  { id: '2', name: 'Evan Brooks', role: 'Safety Inspector', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600&auto=format&fit=crop', quote: 'Safety is not just a checkbox, it is a culture.' },
  { id: '3', name: 'Mira Collins', role: 'Geological Survey', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop', quote: 'Every rock tells a story of the earth\'s history.' },
  { id: '4', name: 'Isaac Nolan', role: 'Mineral Processing', image: 'https://images.unsplash.com/photo-1586297098710-0382a496c814?q=80&w=600&auto=format&fit=crop', quote: 'Efficiency in processing maximizes value.' },
  { id: '5', name: 'Talia Reyes', role: 'Compliance Officer', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop', quote: 'Adhering to standards builds trust with partners.' },
  { id: '6', name: 'Noah Price', role: 'Blasting Technician', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', quote: 'Controlled power unlocks the resources we need.' },
];

const SectionTeam: React.FC = () => {
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
    <section ref={sectionRef} className={`py-24 bg-stone-900 text-white transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm text-amber-500 uppercase tracking-widest mb-4">Our Team</p>
          <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
             Meet the experts behind our operations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamData.map((member) => (
            <div key={member.id} className="group">
              <div className="relative overflow-hidden rounded-3xl mb-6 aspect-[4/4]">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                {/* Overlay with social icons */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 flex justify-end gap-3">
                   <span className="p-2 bg-amber-500 text-stone-900 rounded-full hover:bg-white transition-colors cursor-pointer"><Facebook size={16} /></span>
                   <span className="p-2 bg-amber-500 text-stone-900 rounded-full hover:bg-white transition-colors cursor-pointer"><Twitter size={16} /></span>
                   <span className="p-2 bg-amber-500 text-stone-900 rounded-full hover:bg-white transition-colors cursor-pointer"><Linkedin size={16} /></span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-white">{member.name}</h3>
                <p className="text-sm text-stone-400 mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionTeam;