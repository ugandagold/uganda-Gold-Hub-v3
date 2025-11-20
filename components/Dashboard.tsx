import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { Product } from '../types';
import { Package, Users, LayoutDashboard, Plus, Trash2, X, ArrowLeft, Loader2, Search, Image as ImageIcon } from 'lucide-react';

interface DashboardProps {
  onBack: () => void;
}

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'subscribers'>('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Add Product Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Living Room',
    price: '',
    originalPrice: '',
    image: '',
    isNew: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Products
      const { data: productsData } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (productsData) setProducts(productsData as Product[]);

      // Fetch Subscribers
      const { data: subsData } = await supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false });
      if (subsData) setSubscribers(subsData as Subscriber[]);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      alert('Error deleting product');
      console.error(error);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name: newProduct.name,
        category: newProduct.category,
        price: parseFloat(newProduct.price),
        originalPrice: newProduct.originalPrice ? parseFloat(newProduct.originalPrice) : null,
        image: newProduct.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop', // Fallback
        isNew: newProduct.isNew
      };

      const { data, error } = await supabase.from('products').insert([payload]).select();
      
      if (error) throw error;
      
      if (data) {
        setProducts(prev => [data[0] as Product, ...prev]);
        setShowAddModal(false);
        setNewProduct({ name: '', category: 'Living Room', price: '', originalPrice: '', image: '', isNew: false });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Make sure RLS policies allow inserts.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-100 flex font-sans text-stone-900">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 text-white flex flex-col">
        <div className="p-6 border-b border-stone-800">
          <h2 className="font-serif text-2xl font-bold">Nestery<span className="text-stone-500 text-sm font-sans ml-2">Admin</span></h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-stone-800 text-white' : 'text-stone-400 hover:bg-stone-800/50 hover:text-white'}`}
          >
            <LayoutDashboard size={20} />
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'products' ? 'bg-stone-800 text-white' : 'text-stone-400 hover:bg-stone-800/50 hover:text-white'}`}
          >
            <Package size={20} />
            Products
          </button>
          <button 
            onClick={() => setActiveTab('subscribers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'subscribers' ? 'bg-stone-800 text-white' : 'text-stone-400 hover:bg-stone-800/50 hover:text-white'}`}
          >
            <Users size={20} />
            Subscribers
          </button>
        </nav>

        <div className="p-4 border-t border-stone-800">
          <button onClick={onBack} className="w-full flex items-center gap-2 px-4 py-3 text-stone-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            Back to Site
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-stone-200 p-6 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-2xl font-serif font-bold capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 bg-stone-200 rounded-full flex items-center justify-center font-bold text-stone-600">A</div>
             <span className="text-sm font-medium">Admin User</span>
          </div>
        </header>

        <div className="p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                    <Package size={24} />
                  </div>
                  <span className="text-xs font-bold text-stone-400 bg-stone-50 px-2 py-1 rounded-lg">+2 this week</span>
                </div>
                <h3 className="text-stone-500 font-medium mb-1">Total Products</h3>
                <p className="text-3xl font-serif font-bold text-stone-900">{products.length}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                    <Users size={24} />
                  </div>
                  <span className="text-xs font-bold text-stone-400 bg-stone-50 px-2 py-1 rounded-lg">+12%</span>
                </div>
                <h3 className="text-stone-500 font-medium mb-1">Newsletter Subs</h3>
                <p className="text-3xl font-serif font-bold text-stone-900">{subscribers.length}</p>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="relative w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-stone-200"
                  />
                </div>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-stone-900 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-stone-800 transition-colors text-sm font-bold"
                >
                  <Plus size={18} />
                  Add Product
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider border-b border-stone-200">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Image</th>
                      <th className="px-6 py-4 font-semibold">Product Name</th>
                      <th className="px-6 py-4 font-semibold">Category</th>
                      <th className="px-6 py-4 font-semibold">Price</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {loading ? (
                       <tr><td colSpan={5} className="p-8 text-center text-stone-400"><Loader2 className="animate-spin mx-auto mb-2" />Loading...</td></tr>
                    ) : filteredProducts.length === 0 ? (
                       <tr><td colSpan={5} className="p-8 text-center text-stone-400">No products found.</td></tr>
                    ) : (
                      filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-stone-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100">
                              <img src={product.image} alt="" className="w-full h-full object-cover mix-blend-multiply" />
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium text-stone-900">{product.name} {product.isNew && <span className="ml-2 text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold">NEW</span>}</td>
                          <td className="px-6 py-4 text-stone-500 text-sm">{product.category}</td>
                          <td className="px-6 py-4 font-serif">${product.price}</td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Subscribers Tab */}
          {activeTab === 'subscribers' && (
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Email Address</th>
                    <th className="px-6 py-4 font-semibold">Subscribed Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {loading ? (
                      <tr><td colSpan={2} className="p-8 text-center text-stone-400">Loading...</td></tr>
                  ) : subscribers.length === 0 ? (
                      <tr><td colSpan={2} className="p-8 text-center text-stone-400">No subscribers yet.</td></tr>
                  ) : (
                    subscribers.map((sub) => (
                      <tr key={sub.id} className="hover:bg-stone-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-stone-900">{sub.email}</td>
                        <td className="px-6 py-4 text-stone-500 text-sm">{new Date(sub.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold">Add New Product</h3>
              <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-900"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Name</label>
                <input 
                  required 
                  type="text" 
                  className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Category</label>
                    <select 
                      className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    >
                      <option value="Living Room">Living Room</option>
                      <option value="Kitchen">Kitchen</option>
                      <option value="Bedroom">Bedroom</option>
                      <option value="Terrace">Terrace</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Price ($)</label>
                    <input 
                      required 
                      type="number" step="0.01"
                      className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    />
                 </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Image URL</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="https://..."
                    className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  />
                  <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-stone-400 border border-stone-200 shrink-0">
                    {newProduct.image ? <img src={newProduct.image} alt="Preview" className="w-full h-full object-cover rounded-lg" /> : <ImageIcon size={20} />}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                 <input 
                   type="checkbox" 
                   id="isNew"
                   checked={newProduct.isNew}
                   onChange={(e) => setNewProduct({...newProduct, isNew: e.target.checked})}
                   className="w-4 h-4 accent-stone-900"
                 />
                 <label htmlFor="isNew" className="text-sm text-stone-600">Mark as "New Arrival"</label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-stone-500 hover:bg-stone-100 rounded-lg font-medium">Cancel</button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-stone-900 text-white rounded-lg font-bold hover:bg-stone-800 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
