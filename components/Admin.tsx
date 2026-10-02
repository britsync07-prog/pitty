import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trash2, Plus, LogOut, Loader2, CheckCircle2, Edit3, XCircle, ArrowLeft } from 'lucide-react';
import { CATEGORIES, STORE_INFO } from '../constants';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [newItem, setNewItem] = useState({
    name: '',
    banglaName: '',
    price: '',
    category: 'Bangles & Jewelry',
    description: '',
    image: '', // Primary
    images: [] as string[] // Gallery
  });

  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': file.type,
          'X-Filename': encodeURIComponent(file.name)
        },
        body: file 
      });
      
      const data = await res.json();
      if (data.url) {
        setNewItem(prev => ({ 
            ...prev, 
            images: [...prev.images, data.url],
            image: prev.image || data.url
        }));
      }
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const checkAuth = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        setIsLoggedIn(true);
        localStorage.setItem('admin_token', password);
        fetchCollections();
      } else setError('Invalid password');
    } catch (err) { setError('Connection failed'); }
    finally { setLoading(false); }
  };

  const fetchCollections = async () => {
    try {
      const res = await fetch('/api/collections');
      const data = await res.json();
      if (Array.isArray(data)) {
        setCollections(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.image) return alert("Please upload at least one image or provide an image URL.");
    const token = localStorage.getItem('admin_token');
    
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/collections?id=${editingId}` : '/api/collections';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': token || '' },
        body: JSON.stringify(newItem)
      });
      if (res.ok) {
        setNewItem({ name: '', banglaName: '', price: '', category: 'Bangles & Jewelry', description: '', image: '', images: [] });
        setEditingId(null);
        fetchCollections();
      }
    } catch (err) { console.error(err); }
  };

  const startEdit = (item: any) => {
    setEditingId(item.id);
    let gallery = [];
    try {
        gallery = JSON.parse(item.images || "[]");
    } catch(e) {
        gallery = [item.image];
    }
    setNewItem({
        name: item.name,
        banglaName: item.banglaName || '',
        price: String(item.price).replace(/[^0-9.]/g, ''),
        category: item.category || 'Bangles & Jewelry',
        description: item.description || '',
        image: item.image,
        images: gallery
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewItem({ name: '', banglaName: '', price: '', category: 'Bangles & Jewelry', description: '', image: '', images: [] });
  };

  const handleDeleteItem = async (id: number) => {
    const token = localStorage.getItem('admin_token');
    if (!confirm('Are you sure you want to remove this item?')) return;
    try {
      const res = await fetch(`/api/collections?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': token || '' }
      });
      if (res.ok) fetchCollections();
    } catch (err) { console.error(err); }
  };

  const removeImage = (urlToRemove: string) => {
      setNewItem(prev => {
          const newImages = prev.images.filter(url => url !== urlToRemove);
          return {
              ...prev,
              images: newImages,
              image: prev.image === urlToRemove ? (newImages[0] || '') : prev.image
          };
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
        setPassword(token);
        fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: token }) }).then(res => {
            if (res.ok) { setIsLoggedIn(true); fetchCollections(); }
            else localStorage.removeItem('admin_token');
        });
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50/40 px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 rounded-3xl border border-rose-100 shadow-xl w-full max-w-md">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500">Merchant Portal</span>
            <h1 className="font-serif text-3xl text-zinc-900 mt-1">Pretty Pocket</h1>
          </div>
          <form onSubmit={checkAuth} className="space-y-4">
            <input 
              type="password" 
              placeholder="Admin Password" 
              className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:outline-none focus:border-rose-500 text-sm" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            {error && <p className="text-rose-500 text-xs">{error}</p>}
            <button disabled={loading} className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl transition-colors flex items-center justify-center font-medium text-sm shadow-md shadow-rose-600/20">
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Enter Dashboard'}
            </button>
            <div className="text-center pt-2">
              <a href="/" className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors">
                ← Return to store website
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rose-50/30 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="font-serif text-3xl text-zinc-900">Pretty Pocket Dashboard</h1>
            <a href="/" className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors border-l border-zinc-300 pl-4 ml-2 flex items-center gap-1">
              <ArrowLeft size={14} />
              <span>View Storefront</span>
            </a>
          </div>
          <button onClick={() => { setIsLoggedIn(false); localStorage.removeItem('admin_token'); }} className="flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-rose-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-white">
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add / Edit Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm sticky top-8">
              <div className="flex justify-between items-center mb-4">
                  <h2 className="font-serif text-xl text-zinc-900">{editingId ? 'Edit Product' : 'Add New Item'}</h2>
                  {editingId && (
                      <button onClick={cancelEdit} className="text-zinc-400 hover:text-black transition-colors">
                          <XCircle size={20} />
                      </button>
                  )}
              </div>
              <form onSubmit={handleSaveItem} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Product Name (English)</label>
                  <input placeholder="e.g. Jelly Bangles Set" className="w-full px-3.5 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:border-rose-500" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} required />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Bangla Name (Optional)</label>
                  <input placeholder="e.g. পার্পল ও গ্রিন জেলি চুড়ি" className="w-full px-3.5 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:border-rose-500" value={newItem.banglaName} onChange={e => setNewItem({...newItem, banglaName: e.target.value})} />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Category</label>
                  <select 
                    value={newItem.category} 
                    onChange={e => setNewItem({...newItem, category: e.target.value})}
                    className="w-full px-3.5 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:border-rose-500 bg-white"
                  >
                    {CATEGORIES.filter(c => c !== 'All Products').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Price (in Taka)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">৳</span>
                    <input placeholder="e.g. 220" className="w-full pl-8 pr-4 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:border-rose-500" value={newItem.price} onChange={e => { const val = e.target.value.replace(/[^0-9.]/g, ''); setNewItem({...newItem, price: val}); }} required />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Image URL</label>
                  <input placeholder="https://..." className="w-full px-3.5 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:border-rose-500 text-xs" value={newItem.image} onChange={e => setNewItem({...newItem, image: e.target.value})} />
                </div>
                
                <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 font-medium">Or Upload Photo</label>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                        {newItem.images.map((url, i) => (
                            <div key={i} className="relative aspect-square group rounded-lg overflow-hidden">
                                <img src={url} className={`w-full h-full object-cover border-2 ${newItem.image === url ? 'border-rose-500' : 'border-transparent'}`} />
                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                                    <button type="button" onClick={() => setNewItem({...newItem, image: url})} className="text-[10px] text-white uppercase font-bold hover:underline">Front</button>
                                    <button type="button" onClick={() => removeImage(url)} className="text-[10px] text-red-300 uppercase font-bold hover:underline">Delete</button>
                                </div>
                                {newItem.image === url && (
                                    <div className="absolute top-1 right-1 bg-rose-600 text-white p-0.5 rounded-full shadow">
                                        <CheckCircle2 size={12} />
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="relative aspect-square rounded-lg border-2 border-dashed border-rose-200 flex items-center justify-center hover:border-rose-400 transition-colors cursor-pointer bg-rose-50/30">
                            <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            {uploading ? <Loader2 size={16} className="animate-spin text-rose-600" /> : <Plus size={16} className="text-rose-400" />}
                        </div>
                    </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Description</label>
                  <textarea placeholder="Product description, size details, colors..." className="w-full px-3.5 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:border-rose-500 h-28 text-xs leading-relaxed" value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} />
                </div>

                <button disabled={uploading || !newItem.image} className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl transition-colors flex items-center justify-center gap-2 font-semibold text-xs uppercase tracking-wider disabled:bg-zinc-300 shadow-md shadow-rose-600/20">
                  {editingId ? <Edit3 size={16} /> : <Plus size={16} />} 
                  {uploading ? 'Uploading...' : (editingId ? 'Update Product' : 'Save Product')}
                </button>
              </form>
            </div>
          </div>

          {/* Catalog Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-zinc-100 flex justify-between items-center">
                  <h3 className="font-serif text-lg text-zinc-900">Store Catalog</h3>
                  <span className="text-xs text-zinc-400">{collections.length} items registered</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                      <thead className="bg-rose-50/40 border-b border-zinc-100 text-xs uppercase tracking-wider text-zinc-500">
                          <tr>
                              <th className="px-6 py-3.5 font-medium">Item</th>
                              <th className="px-6 py-3.5 font-medium">Category</th>
                              <th className="px-6 py-3.5 font-medium">Price</th>
                              <th className="px-6 py-3.5 font-medium text-right pr-8">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                          {collections.length === 0 ? (
                            <tr>
                              <td colSpan={4} className="px-6 py-12 text-center text-zinc-400 text-xs">
                                No custom items in database yet. The website is currently displaying the full default catalog seeded in constants.ts. Add custom items here anytime!
                              </td>
                            </tr>
                          ) : (
                            collections.map(item => (
                              <tr key={item.id} className={`hover:bg-rose-50/30 transition-colors ${editingId === item.id ? 'bg-rose-50/50' : ''}`}>
                                  <td className="px-6 py-4">
                                      <div className="flex items-center gap-3">
                                          <img src={item.image} className="w-12 h-12 object-cover rounded-lg bg-rose-50 border border-rose-100" />
                                          <div className="flex flex-col">
                                              <span className="font-medium text-zinc-900">{item.name}</span>
                                              <span className="text-[10px] text-zinc-400">ID: {item.id}</span>
                                          </div>
                                      </div>
                                  </td>
                                  <td className="px-6 py-4 text-xs text-zinc-500 font-light">{item.category || 'Bangles & Jewelry'}</td>
                                  <td className="px-6 py-4 text-rose-600 font-bold font-serif">৳{String(item.price).replace(/[^0-9.]/g, '')}</td>
                                  <td className="px-6 py-4 text-right pr-8">
                                      <div className="flex items-center justify-end gap-2">
                                          <button onClick={() => startEdit(item)} className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors" title="Edit">
                                              <Edit3 size={16} />
                                          </button>
                                          <button onClick={() => handleDeleteItem(item.id)} className="p-1.5 rounded-lg text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                                              <Trash2 size={16} />
                                          </button>
                                      </div>
                                  </td>
                              </tr>
                            ))
                          )}
                      </tbody>
                  </table>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
