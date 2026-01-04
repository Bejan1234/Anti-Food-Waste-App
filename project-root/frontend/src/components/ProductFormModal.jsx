import React, { useState } from 'react';
import { X, Scan, Loader2, Save } from 'lucide-react';
import api from '../tools/api';

const ProductFormModal = ({ isOpen, onClose, onRefresh }) => {
    const [loading, setLoading] = useState(false);
    const [barcode, setBarcode] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        category: 'Other',
        expirationDate: '',
        brand: '',
        image: ''
    });

    const categories = ['Vegetables', 'Fruits', 'Meat', 'Dairy', 'Bakery', 'Drinks', 'Other'];

    const handleScan = async () => {
        if (!barcode) return;
        setLoading(true);
        try {
            const res = await api.get(`/products/scan/${barcode}`);
            setFormData({
                ...formData,
                name: res.data.name || '',
                brand: res.data.brand || '',
                image: res.data.image || ''
            });
        } catch (err) {
            alert('Could not find product data for this barcode');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/products', formData);
            onRefresh();
            onClose();
            setFormData({ name: '', category: 'Other', expirationDate: '', brand: '', image: '' });
            setBarcode('');
        } catch (err) {
            alert('Failed to add product');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="glass w-full max-w-lg overflow-hidden flex flex-col border border-fuchsia-300/80">
                <div className="p-6 border-b border-fuchsia-200/60 bg-gradient-to-r from-fuchsia-600 to-cyan-600 flex justify-between items-center">
                    <h2 className="text-2xl font-black text-white">📦 Add Product</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white">
                        <X size={22} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[80vh] space-y-6">
                    {/* Scanner Input */}
                    <div className="space-y-3 bg-white dark:bg-gray-800 p-5 rounded-lg border-2 border-fuchsia-300 dark:border-fuchsia-500">
                        <label className="text-base font-black text-fuchsia-600 dark:text-fuchsia-400 flex items-center gap-2">🔍 Quick Scan</label>
                        <p className="text-xs text-gray-700 dark:text-gray-300">Enter or scan a barcode to auto-fill product details</p>
                        <div className="flex gap-3">
                            <input 
                                type="text" 
                                className="input-field flex-1 dark:bg-gray-900 dark:text-white dark:border-gray-600" 
                                placeholder="Enter barcode..."
                                value={barcode}
                                onChange={(e) => setBarcode(e.target.value)}
                            />
                            <button 
                                onClick={handleScan}
                                disabled={loading}
                                className="bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-fuchsia-700 hover:to-cyan-700 transition-all disabled:opacity-50 font-bold flex items-center gap-2 shadow-lg shadow-fuchsia-500/50 dark:shadow-fuchsia-600/30 whitespace-nowrap"
                            >
                                {loading ? <Loader2 className="animate-spin" size={18} /> : <Scan size={18} />}
                                <span>Scan</span>
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 gap-5">
                            {/* Product Image Preview */}
                            {formData.image && (
                                <div className="flex justify-center">
                                    <img 
                                        src={formData.image} 
                                        alt="Product" 
                                        className="w-32 h-32 object-cover rounded-lg border-2 border-fuchsia-300 dark:border-fuchsia-500 shadow-lg"
                                    />
                                </div>
                            )}
                            <div>
                                <label className="text-sm font-bold text-gray-800 uppercase tracking-wide block mb-2">📦 Product Name</label>
                                <input 
                                    type="text" 
                                    className="input-field" 
                                    placeholder="e.g., Milk, Chicken Breast, Bread..."
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required 
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-bold text-gray-800 uppercase tracking-wide block mb-2">🏷️ Category</label>
                                    <select 
                                        className="input-field"
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    >
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-800 uppercase tracking-wide block mb-2">📅 Expires</label>
                                    <input 
                                        type="date" 
                                        className="input-field" 
                                        value={formData.expirationDate}
                                        onChange={(e) => setFormData({...formData, expirationDate: e.target.value})}
                                        required 
                                    />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-8 font-bold text-base">
                            <Save size={20} />
                            Save to Fridge
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductFormModal;
