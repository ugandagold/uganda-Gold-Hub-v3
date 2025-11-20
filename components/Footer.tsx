import React, { useState } from 'react';
import { ArrowRight, Check, Loader2, Lock } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

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
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert({ email });
      if (error) throw error;
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
      // Reset error after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <footer className="bg-black text-white pt-24 pb-8 overflow-hidden relative z-0">
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Massive Text */}
         <div className="w-full flex justify-center border-b border-white/10 pb-16 mb-16">
           <h1 className="text-[18vw] md:text-[20vw] font-serif leading-[0.8] tracking-tight text-center select-none text-amber-500/20">GOLD HUB</h1>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20">
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
                  className="bg-transparent border-none outline-none text-white flex-1 placeholder-stone-600 text-sm px-4 py-2 disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={status === 'success' || status === 'loading'}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${status === 'success' ? 'bg-green-500 text-white' : 'bg-amber-500 text-stone-900 hover:bg-amber-400'}`}
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-xs">
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
               <h4 className="text-stone-500 mb-6 font-bold uppercase tracking-widest">Company</h4>
               <ul className="space-y-4">
                 <li><a href="#" className="hover:text-amber-400 transition-colors">About Us</a></li>
                 <li><a href="#" className="hover:text-amber-400 transition-colors">Compliance</a></li>
                 <li><a href="#" className="hover:text-amber-400 transition-colors">Mining Sites</a></li>
               </ul>
             </div>
             <div>
               <h4 className="text-stone-500 mb-6 font-bold uppercase tracking-widest">Legal</h4>
               <ul className="space-y-4">
                 <li><a href="#" className="hover:text-amber-400 transition-colors">Export Permits</a></li>
                 <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
                 <li><a href="#" className="hover:text-amber-400 transition-colors">Terms of Trade</a></li>
               </ul>
             </div>
             <div>
               <h4 className="text-stone-500 mb-6 font-bold uppercase tracking-widest">Contact</h4>
               <ul className="space-y-4">
                 <li><a href="#" className="hover:text-amber-400 transition-colors flex items-center gap-1">Kampala HQ</a></li>
                 <li><a href="#" className="hover:text-amber-400 transition-colors flex items-center gap-1">Entebbe Office</a></li>
               </ul>
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-stone-500 pt-8 border-t border-white/10 uppercase tracking-wider">
           <p>© Uganda Gold Hub Ltd.</p>
           <div className="flex gap-4">
             <p>Licensed by DGSM - 2025</p>
             {onAdminClick && (
               <button onClick={onAdminClick} className="hover:text-white transition-colors flex items-center gap-1">
                 <Lock size={10} /> Staff Portal
               </button>
             )}
           </div>
           <p className="flex items-center gap-1">Secure Trading Platform</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;