import React, { useRef, useEffect, useState } from 'react';
import { FileText, Handshake, Eye, Plane, BadgeCheck } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Letter of Intent (LOI)',
    icon: <FileText size={24} />,
    description: 'Buyer submits a formal Letter of Intent detailing quantity, purity, and destination airport.'
  },
  {
    id: 2,
    title: 'Sales Purchase Agreement',
    icon: <Handshake size={24} />,
    description: 'We issue a Full Corporate Offer (FCO). Upon acceptance, a binding SPA is signed by both parties.'
  },
  {
    id: 3,
    title: 'Proof of Product (POP)',
    icon: <Eye size={24} />,
    description: 'Client views the gold physically in our secure vault or receives video verification with current-day codes.'
  },
  {
    id: 4,
    title: 'Export & Logistics',
    icon: <Plane size={24} />,
    description: 'We handle all export documentation, taxes, and insurance (CIF) via Brinks or G4S to the destination.'
  },
  {
    id: 5,
    title: 'Final Assay & Payment',
    icon: <BadgeCheck size={24} />,
    description: 'Final payment is released only after the gold is assayed at the buyer\'s refinery of choice.'
  }
];

const SectionProcess: React.FC = () => {
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
        <div className="text-center mb-20">
           <p className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-2">How It Works</p>
           <h2 className="text-3xl md:text-5xl font-serif text-white">Secure Trading Procedure</h2>
           <p className="text-stone-400 mt-4 max-w-2xl mx-auto">We follow international ICC standards for gold trade. Our transparent 5-step process ensures security for both buyer and seller.</p>
        </div>

        <div className="relative">
           {/* Connecting Line (Desktop) */}
           <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-stone-800"></div>
           
           <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {steps.map((step, idx) => (
                <div key={step.id} className="relative flex flex-col items-center text-center group">
                   {/* Step Circle */}
                   <div className="w-24 h-24 rounded-full bg-stone-800 border-2 border-stone-700 flex items-center justify-center relative z-10 mb-6 transition-all duration-500 group-hover:border-amber-500 group-hover:bg-stone-900 group-hover:scale-110 shadow-xl">
                      <div className="text-stone-300 group-hover:text-amber-500 transition-colors">
                        {step.icon}
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-500 text-stone-900 font-bold flex items-center justify-center text-sm">
                        {step.id}
                      </div>
                   </div>
                   
                   <h3 className="text-xl font-serif font-bold mb-3 text-white group-hover:text-amber-500 transition-colors">{step.title}</h3>
                   <p className="text-sm text-stone-400 leading-relaxed">{step.description}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default SectionProcess;