import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const posts = [
  {
    title: 'Understanding the critical role of geophysical surveys',
    image: 'https://images.unsplash.com/photo-1578326457399-3b34dbbf23b8?q=80&w=600&auto=format&fit=crop',
    date: '23 April',
    category: 'Geology'
  },
  {
    title: 'Mastering survey techniques in mineral exploration',
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=600&auto=format&fit=crop',
    date: '15 April',
    category: 'Techniques'
  },
  {
    title: 'Creative approaches to site mapping and documentation',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop',
    date: '15 April',
    category: 'Innovation'
  }
];

const SectionBlog: React.FC = () => {
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
    <section ref={sectionRef} className={`py-24 bg-stone-50 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
           <p className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-2">Our Blog</p>
           <h2 className="text-3xl md:text-5xl font-serif text-stone-900">Insights & Industry Updates</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {posts.map((post, idx) => (
             <div key={idx} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] mb-6">
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute top-4 left-4 bg-amber-500 text-stone-900 text-xs font-bold px-3 py-1 rounded-full">
                      {post.date}
                   </div>
                </div>
                <div>
                   <p className="text-xs font-bold text-amber-600 uppercase mb-2 tracking-widest">{post.category}</p>
                   <h3 className="text-xl font-serif text-stone-900 leading-snug mb-4 group-hover:text-amber-600 transition-colors">
                     {post.title}
                   </h3>
                   <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-widest group-hover:text-stone-900 transition-colors">
                      Read More <ArrowRight size={14} />
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default SectionBlog;