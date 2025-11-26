import React, { useRef, useEffect, useState } from 'react';
import { Shield, Truck, Landmark, Globe, Scale, Briefcase, Building2, Gavel } from 'lucide-react';

const partners = [
  { 
    id: 1, 
    name: 'Directorate of Geological Survey and Mines', 
    acronym: 'DGSM',
    role: 'Regulatory Oversight',
    icon: <Scale size={28} className="text-stone-700" />
  },
  { 
    id: 2, 
    name: 'Uganda Revenue Authority', 
    acronym: 'URA',
    role: 'Tax & Export Compliance',
    icon: <Gavel size={28} className="text-stone-700" />
  },
  { 
    id: 3, 
    name: 'Brinks Global Services', 
    acronym: 'Logistics',
    role: 'Secure International Transport',
    icon: <Shield size={28} className="text-stone-700" />
  },
  { 
    id: 4, 
    name: 'G4S Secure Solutions', 
    acronym: 'Security',
    role: 'Vaulting & Transit',
    icon: <Truck size={28} className="text-stone-700" />
  },
  { 
    id: 5, 
    name: 'Uganda Chamber of Mines', 
    acronym: 'UCMP',
    role: 'Industry Association',
    icon: <Briefcase size={28} className="text-stone-700" />
  },
  { 
    id: 6, 
    name: 'International Trade Banks', 
    acronym: 'Finance',
    role: 'Escrow & DLC Services',
    icon: <Landmark size={28} className="text-stone-700" />
  },
];

const SectionPartners: React.FC = () => {
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
    <section ref={sectionRef} className={`py-20 bg-white border-t border-stone-100 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-3">Our Network</h2>
          <h3 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6">Strategic Partnerships</h3>
          <p className="text-stone-500 max-w-2xl mx-auto leading-relaxed">
            We operate within a strictly regulated framework, partnering with government bodies, world-class logistics providers, and reputable financial institutions to ensure every trade is secure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <div key={partner.id} className="group p-6 rounded-2xl bg-stone-50 border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300 flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-white border border-stone-100 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                {partner.icon}
              </div>
              <div>
                <div className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">{partner.acronym}</div>
                <h4 className="font-serif font-bold text-stone-900 leading-tight mb-1">{partner.name}</h4>
                <p className="text-xs text-stone-500">{partner.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-stone-900 text-white flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <div className="p-4 bg-white/10 rounded-full">
                 <Globe size={32} className="text-amber-500" />
              </div>
              <div>
                 <h4 className="font-serif text-xl font-bold mb-1">International Standards</h4>
                 <p className="text-stone-400 text-sm">Compliant with OECD Due Diligence Guidance for Responsible Supply Chains.</p>
              </div>
           </div>
           <div className="h-px w-full md:w-px md:h-12 bg-stone-700"></div>
           <div className="flex items-center gap-6">
              <div className="p-4 bg-white/10 rounded-full">
                 <Building2 size={32} className="text-amber-500" />
              </div>
              <div>
                 <h4 className="font-serif text-xl font-bold mb-1">Licensed Exporter</h4>
                 <p className="text-stone-400 text-sm">Fully certified by the Ministry of Energy and Mineral Development.</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default SectionPartners;