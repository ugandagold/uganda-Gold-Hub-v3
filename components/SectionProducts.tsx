import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';
import { ShoppingBag, Heart, Check, Loader2, UploadCloud, AlertCircle, FileText, Scale } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

// Fallback data tailored to Gold Trading
const fallbackProducts: Product[] = [
  { id: '1', name: '1kg Gold Bullion (99.9%)', category: 'Bullion', price: 76450.00, originalPrice: 78000.00, image: 'https://images.unsplash.com/photo-1620322880696-e3659ba35d56?q=80&w=600&auto=format&fit=crop', isNew: true },
  { id: '2', name: 'Raw Gold Nuggets (22k)', category: 'Raw Gold', price: 68000.00, image: 'https://images.unsplash.com/photo-1608044893318-6e2e33c41486?q=80&w=600&auto=format&fit=crop' },
  { id: '3', name: 'Gold Dust (Unrefined)', category: 'Dust', price: 62000.00, image: 'https://images.unsplash.com/photo-1618413139632-15f091915d11?q=80&w=600&auto=format&fit=crop', isNew: true },
  { id: '4', name: '100g Gold Bar (Minted)', category: 'Bullion', price: 7700.00, image: 'https://images.unsplash.com/photo-1591896966237-7247256e65e9?q=80&w=600&auto=format&fit=crop' },
  { id: '5', name: 'Investment Coin (1oz)', category: 'Coins', price: 2450.00, image: 'https://images.unsplash.com/photo-1624453387319-062db3936281?q=80&w=600&auto=format&fit=crop' },
  { id: '6', name: 'Jewelry Grade Pellets', category: 'Jewelry', price: 70000.00, image: 'https://images.unsplash.com/photo-1584302971424-9b457a4464c6?q=80&w=600&auto=format&fit=crop' },
];

const categories = [
  { name: 'Bullion', count: 12 },
  { name: 'Raw Gold', count: 8 },
  { name: 'Dust', count: 5 },
  { name: 'Coins', count: 20 },
];

const SectionProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [activeCat, setActiveCat] = useState('Bullion');
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // State for interactive elements
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<Set<string>>(new Set());
  
  // State for upload/error
  const [uploading, setUploading] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  const fetchProducts = async () => {
      if (!isSupabaseConfigured()) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) {
          console.warn('Error loading products:', error.message);
          setDbError(error.message);
        } else {
          setDbError(null);
          if (data && data.length > 0) {
             setProducts(data as Product[]);
          } else {
             console.log('Products table empty, using fallback.');
          }
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(id)) {
        newWishlist.delete(id);
      } else {
        newWishlist.add(id);
      }
      return newWishlist;
    });
  };

  const addToBag = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setCart(prev => {
        const newCart = new Set(prev);
        newCart.add(id);
        return newCart;
    });
  };

  const handleSeedData = async () => {
    setUploading(true);
    try {
      const dataToInsert = fallbackProducts.map(({ id, ...rest }) => rest);
      const { error } = await supabase.from('products').insert(dataToInsert);
      
      if (error) {
        alert(`Error uploading data: ${error.message}`);
      } else {
        alert('✅ Success! Data uploaded.');
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
      alert('An unexpected error occurred.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <section ref={sectionRef} className={`py-20 md:py-24 bg-[#F5F5F4] overflow-hidden transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-16 gap-8">
          <div className="flex flex-wrap items-baseline gap-x-6 md:gap-x-12 gap-y-2 md:gap-y-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCat(cat.name)}
                className={`relative group font-serif transition-all duration-300 leading-none flex items-start ${
                  activeCat === cat.name 
                    ? 'text-3xl md:text-4xl lg:text-5xl text-stone-900' 
                    : 'text-2xl md:text-3xl lg:text-4xl text-stone-300 hover:text-stone-400'
                }`}
              >
                {cat.name}
                <span className={`ml-1 text-[10px] md:text-sm font-sans font-medium transform -translate-y-1 md:-translate-y-2 ${
                   activeCat === cat.name ? 'text-amber-600' : 'text-stone-300'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 self-start lg:self-center">
             {!dbError && products === fallbackProducts && isSupabaseConfigured() && (
              <button 
                onClick={handleSeedData} 
                disabled={uploading}
                className="flex items-center gap-2 px-4 py-2 bg-stone-200 text-stone-600 rounded-full text-xs font-bold hover:bg-stone-300 transition-colors"
              >
                {uploading ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
                Seed Data
              </button>
            )}

            {dbError && (
               <div className="flex flex-col items-end">
                  <div className="text-red-500 flex items-center gap-2 text-xs font-medium bg-red-50 px-3 py-1 rounded-full mb-2">
                    <AlertCircle size={14} />
                    Missing Table
                  </div>
                  <div className="p-4 bg-stone-900 text-white text-[10px] font-mono rounded-xl max-w-xs">
                     <p className="mb-2 text-stone-400">// Run this in Supabase SQL Editor:</p>
                     <code className="block select-all">
                       create table products (
                         id uuid default gen_random_uuid() primary key,
                         name text,
                         category text,
                         price numeric,
                         "originalPrice" numeric,
                         image text,
                         "isNew" boolean,
                         created_at timestamp with time zone default now()
                       );
                       alter table products enable row level security;
                       create policy "Public read" on products for select using (true);
                       create policy "Public insert" on products for insert with check (true);
                     </code>
                  </div>
               </div>
            )}

            {loading && <Loader2 className="animate-spin text-stone-400" size={20} />}
            <button className="px-8 py-4 bg-stone-900 text-white text-xs font-bold rounded-full hover:bg-stone-800 transition-colors uppercase tracking-wider border border-stone-800">
              Full Inventory
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => {
            const isWishlisted = wishlist.has(product.id);
            const isAdded = cart.has(product.id);
            
            return (
            <div 
              key={product.id} 
              className={`group relative p-4 rounded-[2.5rem] transition-all duration-500 cursor-pointer ${
                 idx === 2 ? 'bg-white shadow-2xl md:-translate-y-4 z-10 md:scale-105 border border-amber-100' : 'bg-[#EDEDE9] hover:bg-white hover:shadow-xl hover:-translate-y-2'
              }`}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] rounded-[2rem] mb-6 overflow-hidden flex items-center justify-center bg-white group-hover:bg-stone-50 transition-colors border border-stone-100">
                 
                 {/* New Tag */}
                 {(idx === 2 || product.isNew) && (
                    <span className="absolute top-5 left-5 bg-amber-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full z-20 tracking-widest shadow-md">SPOT PRICE</span>
                 )}

                 <button 
                    onClick={(e) => toggleWishlist(e, product.id)}
                    className="absolute top-5 right-5 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md z-20 hover:scale-110 transition-transform active:scale-90"
                    aria-label="Track Item"
                 >
                    <Scale 
                        size={18} 
                        className={`transition-all duration-300 ${isWishlisted ? 'fill-amber-500 text-amber-500 scale-110' : 'text-stone-400 hover:text-stone-600'}`} 
                    />
                 </button>
                 
                 <div className="w-full h-full p-6 flex items-center justify-center overflow-hidden relative z-0">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-125 origin-center rounded-xl" 
                    />
                 </div>
                 
                 {/* Request Quote Button (Slides up) */}
                 <button
                    onClick={(e) => addToBag(e, product.id)}
                    className={`absolute bottom-6 left-1/2 -translate-x-1/2 h-12 px-6 rounded-full shadow-xl flex items-center gap-2 z-20 transition-all duration-500 ease-out transform w-[90%] justify-center
                        ${isAdded 
                            ? 'bg-stone-900 text-white translate-y-0 opacity-100' 
                            : 'bg-amber-400 text-stone-900 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-amber-300'
                        }
                    `}
                 >
                    {isAdded ? (
                        <>
                            <Check size={16} className="text-green-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-white">Inquired</span>
                        </>
                    ) : (
                        <>
                             <FileText size={16} />
                             <span className="text-xs font-bold uppercase tracking-wider">Request Quote</span>
                        </>
                    )}
                 </button>
              </div>

              {/* Content */}
              <div className="px-2 mb-2">
                 <h3 className="text-lg font-serif text-stone-900 mb-1 leading-tight">{product.name}</h3>
                 <div className="flex items-baseline gap-3 mt-2">
                   <span className="text-lg font-bold text-amber-700">${product.price.toLocaleString()}</span>
                   {product.originalPrice && (
                     <span className="text-sm text-stone-400 line-through">${product.originalPrice.toLocaleString()}</span>
                   )}
                 </div>
              </div>
            </div>
          )})}
        </div>

      </div>
    </section>
  );
};

export default SectionProducts;