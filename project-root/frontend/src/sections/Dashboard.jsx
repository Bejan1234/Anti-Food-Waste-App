import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import api from '../tools/api';
import ProductCard from "../components/ProductItem";
import ProductModal from "../components/ProductFormModal";

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterCategory, setFilterCategory] = useState('All');

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (err) {
            console.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleToggleAvailable = async (id) => {
        try {
            await api.patch(`/products/${id}/available`);
            fetchProducts();
        } catch (err) {
            alert('Action failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this product?')) return;
        try {
            await api.delete(`/products/${id}`);
            fetchProducts();
        } catch (err) {
            alert('Failed to delete');
        }
    };

    // filter unique categories
    const categoriesList = ['All', ...new Set(products.map(p => p.category))];
    const filteredProducts = filterCategory === 'All' 
        ? products 
        : products.filter(p => p.category === filterCategory);

    return (
        <div className="min-h-screen">
            <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 mb-2">My Fridge</h1>
                    <p className="text-gray-500">Hello {user.username}, you have {products.length} items.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
                >
                    <Plus size={20} />
                    Add Product
                </button>
            </header>

            <main>
                {/* category filter */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {categoriesList.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                                    filterCategory === cat 
                                    ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-200' 
                                    : 'bg-white text-gray-500 hover:bg-gray-50'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* product display */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-12 h-12 border-4 border-emerald-600/20 border-t-emerald-600 rounded-full animate-spin"></div>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="flex flex-col gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                onToggleAvailable={handleToggleAvailable}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="glass p-12 text-center max-w-md mx-auto mt-10">
                        <div className="bg-gradient-to-br from-fuchsia-600 to-cyan-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-fuchsia-200">
                            <Plus className="text-white" size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-3">Time to Stock Up! 🛒</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">Your fridge is ready for action! Add your first item manually or snap a barcode with our scanner. Every item you save helps fight food waste.</p>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="btn-primary py-3 px-8"
                        >
                            Add Your First Item
                        </button>
                    </div>
                )}
            </main>

            <ProductModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onRefresh={fetchProducts} 
            />
        </div>
    );
};

export default Dashboard;
