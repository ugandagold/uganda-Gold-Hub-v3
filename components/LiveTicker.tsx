import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const marketData = [
  { symbol: 'XAU/USD', price: '2,345.60', change: '+1.2%', up: true },
  { symbol: 'XAG/USD', price: '28.45', change: '+0.8%', up: true },
  { symbol: 'XPT/USD', price: '980.10', change: '-0.4%', up: false },
  { symbol: 'UGX/USD', price: '3,780.00', change: '+0.1%', up: true },
  { symbol: 'LBMA AM', price: '2,341.00', change: '+0.5%', up: true },
];

const LiveTicker: React.FC = () => {
  return (
    <div className="bg-stone-900 border-b border-stone-800 text-white overflow-hidden py-2 relative z-50 mt-[88px] md:mt-[80px]">
      <div className="flex whitespace-nowrap animate-marquee items-center gap-12">
        {/* Double the data to create seamless loop */}
        {[...marketData, ...marketData, ...marketData].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 text-xs font-medium font-mono">
            <span className="text-stone-400">{item.symbol}</span>
            <span className="text-white">${item.price}</span>
            <span className={`flex items-center gap-1 ${item.up ? 'text-green-400' : 'text-red-400'}`}>
              {item.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {item.change}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default LiveTicker;