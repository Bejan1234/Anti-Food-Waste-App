import React, { useState, useEffect } from 'react';
import api from '../tools/api';
import ProductCard from "../components/ProductItem";
import { Search, Compass } from 'lucide-react';

const Explore = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchExploreProducts = async () => {
        setLoading(true);
        try {
            const res = await api.get('/products/explore');
            setProducts(res.data);
        } catch (err) {
            console.error('Failed to fetch explore products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExploreProducts();
    }, []);

    const handleClaim = async (id) => {
        if (!window.confirm('Do you want to claim this product?')) return;
        try {
            await api.post(`/products/${id}/claim`);
            fetchExploreProducts(); // refresh list
            alert('Product claimed! Check "My Fridge"');
        } catch (err) {
            alert(err.response?.data?.error || 'Claim failed');
        }
    };

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-black text-gray-900 mb-2">🌍 Community Market</h1>
                <p className="text-gray-500">Explore amazing items shared by your neighbors. Find treasures, reduce waste, help others!</p>
            </header>

            {/* Search Bar */}
            <div className="relative mb-8 max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search by name or brand..."
                    className="input-field py-4"
                    style={{ paddingLeft: '3.5rem' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

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
                            mode="explore"
                            onClaim={handleClaim}
                        />
                    ))}
                </div>
            ) : (
                <div className="glass p-12 text-center max-w-md mx-auto mt-10">
                    <div className="bg-gradient-to-br from-cyan-600 to-fuchsia-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-200">
                        <Compass className="text-white" size={40} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-3">Community is Growing! 🌱</h2>
                    <p className="text-gray-600 leading-relaxed">No shared items at the moment, but more members are joining every day! Share your spare food to help others reduce waste and build our community.</p>
                </div>
            )}
        </div>
    );
};

export default Explore;
