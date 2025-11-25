import React, { useState, useEffect, useRef } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';

const SectionMarketData: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Calculator State
  const [weight, setWeight] = useState<number | string>(1);
  const [unit, setUnit] = useState<'kg' | 'oz' | 'g'>('kg');
  const [purity, setPurity] = useState<'24k' | '22k' | 'raw'>('24k');
  const [estimatedValue, setEstimatedValue] = useState<number>(0);

  // Constants for Calculation (Mock Base Rates)
  const BASE_PRICE_PER_KG_24K = 76450;
  
  useEffect(() => {
    const w = parseFloat(weight.toString()) || 0;
    let multiplier = 1;
    
    // Unit conversion to KG
    if (unit === 'oz') multiplier = 0.0311035;
    if (unit === 'g') multiplier = 0.001;
    
    let purityFactor = 1;
    if (purity === '22k') purityFactor = 0.916;
    if (purity === 'raw') purityFactor = 0.88; // Approx for raw dust/nuggets

    const total = w * multiplier * BASE_PRICE_PER_KG_24K * purityFactor;
    setEstimatedValue(total);
  }, [weight, unit, purity]);

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
    <section ref={sectionRef} className={`py-24 bg-white transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
             <div className="bg-stone-900 text-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl h-full flex flex-col">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2 text-amber-500">
                        <Calculator size={24} />
                        <h3 className="font-serif text-3xl">Profit Calculator</h3>
                        </div>
                        <p className="text-stone-400 text-sm max-w-md">Estimate the value of your gold purchase based on real-time market rates and purity levels.</p>
                    </div>
                </div>

                <div className="space-y-8 flex-1">
                   {/* Inputs Row */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Weight Input */}
                        <div>
                            <label className="block text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">Weight</label>
                            <div className="flex bg-stone-800 rounded-xl overflow-hidden border border-stone-700 focus-within:border-amber-500 transition-colors">
                                <input 
                                type="number" 
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="w-full bg-transparent p-4 text-white outline-none"
                                min="0"
                                />
                                <div className="flex border-l border-stone-700">
                                    <button onClick={() => setUnit('kg')} className={`px-4 text-sm font-bold transition-colors ${unit === 'kg' ? 'bg-amber-500 text-stone-900' : 'text-stone-400 hover:text-white'}`}>KG</button>
                                    <button onClick={() => setUnit('oz')} className={`px-4 text-sm font-bold transition-colors ${unit === 'oz' ? 'bg-amber-500 text-stone-900' : 'text-stone-400 hover:text-white'}`}>OZ</button>
                                    <button onClick={() => setUnit('g')} className={`px-4 text-sm font-bold transition-colors ${unit === 'g' ? 'bg-amber-500 text-stone-900' : 'text-stone-400 hover:text-white'}`}>G</button>
                                </div>
                            </div>
                        </div>

                        {/* Purity Select */}
                        <div>
                            <label className="block text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">Purity Grade</label>
                            <div className="grid grid-cols-3 gap-3">
                                <button 
                                onClick={() => setPurity('24k')}
                                className={`py-3 rounded-xl border font-medium text-sm transition-all ${purity === '24k' ? 'bg-white text-stone-900 border-white' : 'border-stone-700 text-stone-400 hover:border-stone-500'}`}
                                >
                                    24K (99.9%)
                                </button>
                                <button 
                                onClick={() => setPurity('22k')}
                                className={`py-3 rounded-xl border font-medium text-sm transition-all ${purity === '22k' ? 'bg-white text-stone-900 border-white' : 'border-stone-700 text-stone-400 hover:border-stone-500'}`}
                                >
                                    22K (91.6%)
                                </button>
                                <button 
                                onClick={() => setPurity('raw')}
                                className={`py-3 rounded-xl border font-medium text-sm transition-all ${purity === 'raw' ? 'bg-white text-stone-900 border-white' : 'border-stone-700 text-stone-400 hover:border-stone-500'}`}
                                >
                                    Raw/Dust
                                </button>
                            </div>
                        </div>
                   </div>
                </div>

                {/* Result */}
                <div className="mt-8 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-stone-400 text-sm">
                         <RefreshCw size={14} className="text-stone-600" />
                         <span>Estimated Market Value (USD)</span>
                    </div>
                   <div className="text-4xl md:text-5xl font-serif text-amber-500 font-bold tracking-tight">
                      ${estimatedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                   </div>
                </div>
                <p className="text-[10px] text-stone-500 mt-4 text-center md:text-right italic">*Estimates exclude shipping, insurance, and local taxes. Prices subject to market fluctuation.</p>
             </div>
        </div>
      </div>
    </section>
  );
};

export default SectionMarketData;