import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Calculator, RefreshCw } from 'lucide-react';

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

  // Mock Chart Data
  const chartPoints = [60, 65, 58, 72, 75, 85, 82, 90];
  const maxVal = Math.max(...chartPoints);
  const minVal = Math.min(...chartPoints);
  const range = maxVal - minVal;
  
  const points = chartPoints.map((val, i) => {
    const x = (i / (chartPoints.length - 1)) * 100;
    const y = 100 - ((val - minVal) / range) * 80; // Leave some padding
    return `${x},${y}`;
  }).join(' ');

  const areaPath = `0,100 ${points} 100,100`;

  return (
    <section ref={sectionRef} className={`py-24 bg-white transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Chart Section */}
          <div className="lg:w-3/5">
            <h2 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-2">Market Trends</h2>
            <h3 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6">Live Gold Performance (XAU/USD)</h3>
            
            <div className="bg-stone-50 rounded-[2.5rem] p-8 border border-stone-100 shadow-lg relative overflow-hidden">
               <div className="flex justify-between items-end mb-8 relative z-10">
                 <div>
                   <p className="text-stone-500 text-sm mb-1">Current Spot Price (oz)</p>
                   <p className="text-4xl font-serif font-bold text-stone-900">$2,345.60</p>
                 </div>
                 <div className="flex items-center gap-2 text-green-500 bg-green-100 px-4 py-2 rounded-full font-bold text-sm">
                    <TrendingUp size={16} /> +1.24%
                 </div>
               </div>

               {/* SVG Chart */}
               <div className="relative h-64 w-full">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                     <defs>
                        <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                           <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
                           <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                        </linearGradient>
                     </defs>
                     {/* Grid Lines */}
                     <line x1="0" y1="20" x2="100" y2="20" stroke="#e7e5e4" strokeWidth="0.5" strokeDasharray="2" />
                     <line x1="0" y1="50" x2="100" y2="50" stroke="#e7e5e4" strokeWidth="0.5" strokeDasharray="2" />
                     <line x1="0" y1="80" x2="100" y2="80" stroke="#e7e5e4" strokeWidth="0.5" strokeDasharray="2" />
                     
                     <path d={`M${areaPath}`} fill="url(#chartGradient)" className="transition-all duration-1000" />
                     <polyline points={points} fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-md" />
                     
                     {/* Points */}
                     {chartPoints.map((val, i) => {
                        const x = (i / (chartPoints.length - 1)) * 100;
                        const y = 100 - ((val - minVal) / range) * 80;
                        return (
                           <circle key={i} cx={x} cy={y} r="1.5" fill="white" stroke="#f59e0b" strokeWidth="1" className="hover:r-2 transition-all" />
                        );
                     })}
                  </svg>
                  
                  {/* X-Axis Labels */}
                  <div className="flex justify-between mt-4 text-xs text-stone-400 font-medium">
                     <span>Mon</span>
                     <span>Tue</span>
                     <span>Wed</span>
                     <span>Thu</span>
                     <span>Fri</span>
                     <span>Sat</span>
                     <span>Sun</span>
                     <span>Today</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Calculator Section */}
          <div className="lg:w-2/5">
             <div className="bg-stone-900 text-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6 text-amber-500">
                   <Calculator size={24} />
                   <h3 className="font-serif text-2xl">Profit Calculator</h3>
                </div>
                <p className="text-stone-400 text-sm mb-8">Estimate the value of your gold purchase based on real-time market rates and purity levels.</p>

                <div className="space-y-6 flex-1">
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

                {/* Result */}
                <div className="mt-8 pt-8 border-t border-stone-800">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-stone-400 text-sm">Estimated Value (USD)</span>
                      <RefreshCw size={14} className="text-stone-600" />
                   </div>
                   <div className="text-4xl md:text-5xl font-serif text-amber-500 font-bold tracking-tight">
                      ${estimatedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                   </div>
                   <p className="text-[10px] text-stone-500 mt-2 italic">*Estimates exclude shipping, insurance, and local taxes. Prices subject to market fluctuation.</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SectionMarketData;
