import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  image: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, image }) => {
  return (
    <div className="relative h-[50vh] min-h-[400px] bg-stone-900 flex items-center justify-center overflow-hidden mt-[80px]">
      <div className="absolute inset-0">
        <img src={image} alt={title} className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-stone-900/20 to-stone-900/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      <div className="relative z-10 text-center px-6 animate-fade-in-up max-w-4xl mx-auto">
        <div className="inline-block p-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <p className="text-amber-400 font-bold uppercase tracking-widest text-xs">{subtitle}</p>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif text-white">{title}</h1>
      </div>
    </div>
  );
};

export default PageHeader;