import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { FAQItem } from '../types';

const fallbackFaqs: FAQItem[] = [
  { question: 'What is the minimum purity of gold you export?', answer: 'We primarily deal in 22k raw gold (92%+) and refined 24k bullion (99.9%). All exports are accompanied by assay reports from government-certified laboratories.' },
  { question: 'How do you handle international shipping and insurance?', answer: 'We use secure logistics partners (Brinks, G4S) for all international shipments. All cargo is fully insured (CIF) until it reaches the buyer\'s designated customs airport.' },
  { question: 'Do you comply with OECD Due Diligence Guidance?', answer: 'Yes. We are strictly conflict-free. All our gold is traceable to licensed artisanal mines in Uganda, and we provide full chain-of-custody documentation.' },
  { question: 'What are your payment terms?', answer: 'We generally operate on T/T (Telegraphic Transfer). For large contracts, we can utilize SBLC or DLC banking instruments subject to compliance checks.' },
  { question: 'Can buyers visit the mining sites?', answer: 'Qualified investors and buyers are welcome to visit our operations in Uganda. We facilitate site visits to build trust and transparency.' },
  { question: 'What export documentation do you provide?', answer: 'Every shipment includes the Certificate of Origin, Export Permit, Assay Report, Commercial Invoice, and Packing List.' },
];

const SectionFAQ: React.FC = () => {
  const [faqs] = useState<FAQItem[]>(fallbackFaqs);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
    <section ref={sectionRef} className={`py-24 bg-[#F5F5F4] relative transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          {/* Left Side */}
          <div className="lg:w-1/3 relative">
            <span className="text-xs font-bold text-stone-400 uppercase mb-4 block tracking-widest">Trading Guide</span>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-8 leading-snug">
              From assaying to export documentation, here is a guide to trading gold securely with Uganda Gold Hub.
            </h2>
            
            {/* Floating image for visual balance matching screenshot */}
            <div className="hidden lg:block absolute -right-24 top-48 z-10">
               <div className="w-64 h-72 rounded-[2.5rem] overflow-hidden shadow-2xl rotate-6 border-4 border-white">
                  <img src="https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=600&auto=format&fit=crop" alt="Gold Bars" className="w-full h-full object-cover" />
               </div>
            </div>
          </div>

          {/* Right Side - Accordion */}
          <div className="lg:w-2/3 lg:pl-10">
            <div className="divide-y divide-stone-200">
              {faqs.map((faq, index) => (
                <div key={faq.id || index} className="py-6 group">
                  <button 
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex justify-between items-center text-left focus:outline-none"
                  >
                    <span className={`text-lg font-medium transition-colors ${openIndex === index ? 'text-stone-900' : 'text-stone-500 group-hover:text-stone-700'}`}>
                      {faq.question}
                    </span>
                    <span className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${openIndex === index ? 'bg-amber-500 text-white' : 'text-stone-300'}`}>
                      {openIndex === index ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <p className="text-stone-500 leading-relaxed pr-8 text-sm font-light">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFAQ;