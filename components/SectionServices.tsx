import React, { useRef, useEffect, useState } from 'react';
import { ArrowUpRight, Scan, Leaf, Cpu, CheckCircle2 } from 'lucide-react';

interface SectionServicesProps {
  compact?: boolean;
  onNavigate?: (page: string) => void;
}

const services = [
  {
    id: '01',
    title: 'Mineral Exploration',
    icon: <Scan size={32} className="text-amber-500" />,
    description: 'Advanced geophysical surveys and core sampling to identify high-yield gold deposits with precision and minimal environmental impact.',
    expandedDesc: 'We utilize cutting-edge geophysical technologies to map potential deposits with high accuracy. Our exploration phase minimizes financial risk and maximizes yield through data-driven decision making.',
    featuresTitle: 'Technologies Deployed',
    features: [
      'Airborne Magnetometry',
      'Induced Polarization (IP)',
      'Diamond Core Drilling',
      '3D Geological Modeling',
      'Geochemical Soil Sampling',
      'Drone Topography'
    ]
  },
  {
    id: '02',
    title: 'Resource Management',
    icon: <Leaf size={32} className="text-amber-500" />,
    description: 'Comprehensive site planning and logistics to ensure efficient extraction, regulatory compliance, and sustainable resource utilization.',
    expandedDesc: 'Sustainability is at the core of our operations. We implement rigorous environmental management plans that go beyond regulatory compliance to ensure long-term ecological balance.',
    featuresTitle: 'Sustainability Practices',
    features: [
      'Mercury-Free Processing',
      'Zero-Discharge Water Systems',
      'Progressive Land Rehabilitation',
      'Community Development',
      'Native Flora Restoration',
      'Solar-Powered Camps'
    ]
  },
  {
    id: '03',
    title: 'Smart Infrastructure',
    icon: <Cpu size={32} className="text-amber-500" />,
    description: 'Deploying automated systems and IoT monitoring for real-time safety tracking and operational efficiency in remote mining locations.',
    expandedDesc: 'Our mining sites are connected via industrial IoT networks, providing headquarters and international investors with real-time visibility into production rates, machinery health, and security status.',
    featuresTitle: 'Real-Time Benefits',
    features: [
      'Live Production Telemetry',
      'Predictive Maintenance',
      'Geo-fenced Asset Security',
      'Automated Safety Shutoffs',
      'Remote CCTV Surveillance',
      'Fuel Usage Optimization'
    ]
  }
];

const SectionServices: React.FC<SectionServicesProps> = ({ compact = false, onNavigate }) => {
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
    <section ref={sectionRef} className={`py-16 md:py-24 bg-stone-50 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16">
          <div className="max-w-2xl">
             <h2 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-2">Our Capabilities</h2>
             <h3 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">Strength below surface. Proven technical solutions.</h3>
          </div>
          {compact && (
            <button 
              onClick={() => onNavigate?.('service')}
              className="flex items-center gap-2 px-6 py-3 border border-stone-300 rounded-full text-xs font-bold uppercase hover:bg-stone-900 hover:text-white transition-colors mt-6 md:mt-0"
            >
              View All Services
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8">
           {services.map((service) => (
             <div key={service.id} className={`group border-t border-stone-200 py-8 md:py-12 flex flex-col ${compact ? 'md:flex-row items-start md:items-center' : 'gap-6 md:gap-8'} hover:bg-white transition-colors duration-300 px-4 md:px-10 rounded-[2rem]`}>
                
                {/* Header Row */}
                <div className={`flex flex-col md:flex-row ${compact ? 'flex-1 md:items-center gap-4 md:gap-8' : 'w-full justify-between items-start gap-4'}`}>
                  <div className="flex items-center gap-6">
                    <span className="text-4xl md:text-5xl font-serif text-stone-200 group-hover:text-amber-500 transition-colors font-bold">
                      {service.id}
                    </span>
                    {!compact && <div className="p-3 bg-stone-100 rounded-2xl text-stone-600 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">{service.icon}</div>}
                  </div>
                  
                  <div className={compact ? 'flex-1' : 'max-w-3xl'}>
                     <h4 className="text-2xl md:text-3xl font-serif text-stone-900 mb-3">{service.title}</h4>
                     <p className="text-stone-500 leading-relaxed text-sm md:text-base">
                        {compact ? service.description : service.expandedDesc}
                     </p>
                  </div>

                  {compact && (
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 group-hover:bg-stone-900 group-hover:text-white group-hover:border-stone-900 transition-all shrink-0 self-end md:self-auto md:ml-4">
                       <ArrowUpRight size={20} />
                    </div>
                  )}
                </div>

                {/* Detailed Features Grid (Only visible in detailed mode) */}
                {!compact && (
                  <div className="w-full pl-0 md:pl-[calc(4rem+24px)] mt-4 md:mt-8">
                     <div className="bg-stone-100/50 rounded-3xl p-6 md:p-8 border border-stone-100">
                        <h5 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                          {service.featuresTitle}
                          <div className="h-px bg-amber-200 flex-1 opacity-50"></div>
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                           {service.features.map((feature, idx) => (
                             <div key={idx} className="flex items-center gap-3 text-stone-700 font-medium">
                                <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                                <span className="text-sm">{feature}</span>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
                )}

             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default SectionServices;