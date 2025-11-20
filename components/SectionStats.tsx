import React from 'react';

const SectionStats: React.FC = () => {
  return (
    <section className="py-16 bg-stone-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618413139632-15f091915d11?q=80&w=2000&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="p-4">
            <p className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-2">35+</p>
            <p className="text-sm md:text-base font-medium uppercase tracking-widest text-stone-300">Active Mining Sites</p>
          </div>
          <div className="p-4">
            <p className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-2">24/7</p>
            <p className="text-sm md:text-base font-medium uppercase tracking-widest text-stone-300">Monitoring & Operations</p>
          </div>
          <div className="p-4">
            <p className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-2">120M+</p>
            <p className="text-sm md:text-base font-medium uppercase tracking-widest text-stone-300">Tons Processed Annually</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionStats;