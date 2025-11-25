import React, { useRef, useEffect, useState } from 'react';
import { FileText, ShieldCheck, Globe, MessageCircle } from 'lucide-react';

const resources = [
  {
    title: 'Corporate Profile 2024',
    type: 'PDF',
    size: '4.2 MB',
    icon: <Globe size={24} />,
    desc: 'Overview of our mining sites, reserves, and leadership team.'
  },
  {
    title: 'Draft LOI Template',
    type: 'DOCX',
    size: '1.5 MB',
    icon: <FileText size={24} />,
    desc: 'Standard Letter of Intent format required for initiating trade.'
  },
  {
    title: 'KYC / CIS Form',
    type: 'PDF',
    size: '2.1 MB',
    icon: <ShieldCheck size={24} />,
    desc: 'Know Your Customer & Client Information Sheet for compliance.'
  },
  {
    title: 'Sourcing Compliance Policy',
    type: 'PDF',
    size: '3.8 MB',
    icon: <FileText size={24} />,
    desc: 'Our conflict-free sourcing policy and supply chain statement.'
  }
];

const SectionResources: React.FC = () => {
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
    <section ref={sectionRef} className={`py-24 bg-[#fafaf9] transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
           <div>
              <h2 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-2">Compliance Center</h2>
              <h3 className="text-3xl md:text-4xl font-serif text-stone-900">Document Hub</h3>
           </div>
           <p className="text-stone-500 max-w-md text-sm md:text-right">
             To ensure security and verify intent, all compliance documents must be requested directly. Click a document to request it via our secure WhatsApp channel.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {resources.map((item, idx) => (
             <a 
               key={idx} 
               href={`https://wa.me/256761389093?text=${encodeURIComponent(`Hello, I would like to request the ${item.title} from Uganda Gold Hub.`)}`}
               target="_blank"
               rel="noopener noreferrer"
               className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer block"
             >
                <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-500 flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:text-white transition-colors">
                   {item.icon}
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-900 mb-2">{item.title}</h4>
                <p className="text-xs text-stone-400 mb-6 h-10">{item.desc}</p>
                
                <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                   <div className="flex gap-2 items-center">
                      <span className="text-[10px] font-bold bg-stone-100 text-stone-500 px-2 py-1 rounded">{item.type}</span>
                      <span className="text-[10px] text-stone-400">Verified</span>
                   </div>
                   <div className="flex items-center gap-2 text-stone-400 group-hover:text-green-600 transition-colors">
                      <span className="text-[10px] font-bold uppercase tracking-wider hidden group-hover:block">Request</span>
                      <MessageCircle size={18} />
                   </div>
                </div>
             </a>
           ))}
        </div>
      </div>
    </section>
  );
};

export default SectionResources;