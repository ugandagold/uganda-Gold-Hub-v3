import React, { useState } from 'react';
import { ArrowRight, Check, Loader2, Lock, Phone, Mail } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    // Mock API call time
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <footer className="bg-black text-white pt-16 md:pt-24 pb-8 overflow-hidden relative z-0">
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Massive Text */}
         <div className="w-full flex justify-center border-b border-white/10 pb-12 md:pb-16 mb-12 md:mb-16">
           <h1 className="text-[15vw] md:text-[20vw] font-serif leading-[0.8] tracking-tight text-center select-none text-amber-500/20">GOLD HUB</h1>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 mb-16 md:mb-20">
          {/* Newsletter */}
          <div className="max-w-md">
            <h3 className="text-lg font-bold mb-4 text-white">Market Insights</h3>
            <p className="text-stone-400 text-xs mb-8 leading-relaxed max-w-xs">Get daily gold price updates, mining reports, and export regulation changes delivered to your inbox.</p>
            
            <form onSubmit={handleSubscribe}>
              <div className="flex items-center bg-white/5 rounded-full p-1 pr-2 border border-white/10 transition-colors focus-within:border-amber-500/50">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your corporate email" 
                  disabled={status === 'success' || status === 'loading'}
                  className="bg-transparent border-none outline-none text-white flex-1 placeholder-stone-600 text-sm px-4 py-2 disabled:opacity-50 min-w-0"
                />
                <button 
                  type="submit"
                  disabled={status === 'success' || status === 'loading'}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ${status === 'success' ? 'bg-green-500 text-white' : 'bg-amber-500 text-stone-900 hover:bg-amber-400'}`}
                >
                  {status === 'loading' ? <Loader2 size={14} className="animate-spin" /> : 
                   status === 'success' ? <Check size={14} /> : 
                   <ArrowRight size={14} />}
                </button>
              </div>
            </form>
            {status === 'success' && <p className="text-green-400 text-xs mt-2 ml-4">Subscribed to market updates!</p>}
            {status === 'error' && <p className="text-red-400 text-xs mt-2 ml-4">Connection failed. Try again.</p>}
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 md:gap-12 text-xs">
             <div>
               <h4 className="text-stone-500 mb-6 font-bold uppercase tracking-widest">Trading</h4>
               <ul className="space-y-4">
                 <li><a href="#" className="hover:text-amber-400 transition-colors">Spot Prices</a></li>
                 <li><a href="#" className="hover:text-amber-400 transition-colors">Bullion</a></li>
                 <li><a href="#" className="hover:text-amber-400 transition-colors">Raw Dust</a></li>
                 <li><a href="#" className="hover:text-amber-400 transition-colors">Assay Services</a></li>
               </ul>
             </div>
             
             <div>
               <h4 className="text-stone-500 mb-6 font-bold uppercase tracking-widest">Contact</h4>
               <ul className="space-y-4">
                 <li>
                    <a href="tel:+256761389093" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                        <Phone size={14} className="text-amber-500" />
                        <span className="font-bold">+256 761 389 093</span>
                    </a>
                 </li>
                 <li>
                    <a href="mailto:ugandagoldhub@gmail.com" className="flex items-center gap-2 hover:text-amber-400 transition-colors break-all">
                        <Mail size={14} className="text-amber-500 shrink-0" />
                        <span className="font-bold">ugandagoldhub@gmail.com</span>
                    </a>
                 </li>
                 <li><a href="#" className="hover:text-amber-400 transition-colors">LinkedIn</a></li>
                 <li><a href="#" className="hover:text-amber-400 transition-colors">Twitter</a></li>
               </ul>
             </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-stone-500 text-[10px] uppercase tracking-widest text-center md:text-left">© 2024 Uganda Gold Hub. All rights reserved.</p>
           <div className="flex gap-6">
              {onAdminClick && (
                <button 
                  onClick={onAdminClick} 
                  className="text-stone-600 hover:text-amber-500 transition-colors flex items-center gap-1"
                  title="Admin Access"
                >
                  <Lock size={12} />
                </button>
              )}
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;