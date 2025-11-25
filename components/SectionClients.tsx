import React, { useRef, useEffect, useState } from 'react';
import { Quote, Star } from 'lucide-react';

const SectionClients: React.FC = () => {
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
        <div className="mb-16 max-w-2xl">
          <p className="text-sm text-amber-500 font-bold uppercase tracking-widest mb-4">Our Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-serif text-white leading-snug">
            Confidence Built Through Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Testimonial 1 */}
           <div className="bg-stone-800/50 p-8 rounded-[2rem] border border-stone-700">
              <div className="flex text-amber-500 mb-6 gap-1">
                 <Star size={14} fill="currentColor" />
                 <Star size={14} fill="currentColor" />
                 <Star size={14} fill="currentColor" />
                 <Star size={14} fill="currentColor" />
                 <Star size={14} fill="currentColor" />
              </div>
              <p className="text-stone-300 text-sm leading-relaxed mb-8 italic">
                "Delivered what we needed on time, with professionalism. Their team made the entire process seamless from start to finish."
              </p>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-stone-700 flex items-center justify-center text-amber-500 font-serif font-bold text-xl">
                    L
                 </div>
                 <div>
                    <h4 className="font-bold text-white text-sm">Liam J.</h4>
                    <p className="text-xs text-stone-500">Project Manager, Mining CORE</p>
                 </div>
                 <Quote className="ml-auto text-stone-700" size={32} />
              </div>
           </div>

           {/* Testimonial 2 */}
           <div className="bg-stone-800/50 p-8 rounded-[2rem] border border-stone-700">
              <div className="flex text-amber-500 mb-6 gap-1">
                 <Star size={14} fill="currentColor" />
                 <Star size={14} fill="currentColor" />
                 <Star size={14} fill="currentColor" />
                 <Star size={14} fill="currentColor" />
                 <Star size={14} fill="currentColor" />
              </div>
              <p className="text-stone-300 text-sm leading-relaxed mb-8 italic">
                "Their team's deep technical expertise, innovative thinking and hands-on approach made a huge difference in our complex project."
              </p>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-stone-700 flex items-center justify-center text-amber-500 font-serif font-bold text-xl">
                    N
                 </div>
                 <div>
                    <h4 className="font-bold text-white text-sm">Noah A.</h4>
                    <p className="text-xs text-stone-500">Operations Lead, ResourceWorks</p>
                 </div>
                 <Quote className="ml-auto text-stone-700" size={32} />
              </div>
           </div>

           {/* Testimonial 3 */}
           <div className="bg-stone-800/50 p-8 rounded-[2rem] border border-stone-700">
              <div className="flex text-amber-500 mb-6 gap-1">
                 <Star size={14} fill="currentColor" />
                 <Star size={14} fill="currentColor" />
                 <Star size={14} fill="currentColor" />
                 <Star size={14} fill="currentColor" />
                 <Star size={14} fill="currentColor" />
              </div>
              <p className="text-stone-300 text-sm leading-relaxed mb-8 italic">
                "Experience backed by real trust. We have found a partner that values integrity as much as yield."
              </p>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-stone-700 flex items-center justify-center text-amber-500 font-serif font-bold text-xl">
                    L
                 </div>
                 <div>
                    <h4 className="font-bold text-white text-sm">Leon E.</h4>
                    <p className="text-xs text-stone-500">Director, Global Metals</p>
                 </div>
                 <Quote className="ml-auto text-stone-700" size={32} />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default SectionClients;