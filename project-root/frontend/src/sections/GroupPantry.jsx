import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../tools/api';
import { ArrowLeft, Loader } from 'lucide-react';
import ProductCard from "../components/ProductItem";

const GroupPantry = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const [group, setGroup] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGroupAndProducts();
    }, [groupId]);

    const fetchGroupAndProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            // Get group info
            const groupRes = await api.get(`/groups/${groupId}/members`);
            setGroup({ id: groupId, members: groupRes.data.members });

            // Get group products
            const productsRes = await api.get(`/products/group/${groupId}`);
            setProducts(productsRes.data);
        } catch (err) {
            console.error('Error:', err);
            setError(err.response?.data?.error || 'Failed to load group pantry');
        } finally {
            setLoading(false);
        }
    };

    const handleClaim = async (productId) => {
        try {
            await api.post(`/products/${productId}/claim`);
            setProducts(products.filter(p => p.id !== productId));
            alert('Product claimed successfully!');
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to claim product');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader size={48} className="text-fuchsia-600 animate-spin" />
            </div>
        );
    }

    return (
        <div>
            <header className="mb-8 flex items-center gap-4">
                <button
                    onClick={() => navigate('/groups')}
                    className="p-2 rounded-xl bg-gray-700/50 text-gray-400 hover:bg-gray-600 hover:text-white transition-all"
                    title="Go back"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-3xl font-black text-gray-800 dark:text-gray-100">Group Pantry</h1>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">
                        {group?.members?.length || 0} members sharing {products.length} items
                    </p>
                </div>
            </header>

            {error ? (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-center">
                    {error}
                </div>
            ) : products.length > 0 ? (
                <div className="flex flex-col gap-6">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onClaim={handleClaim}
                            mode="explore"
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600 to-cyan-600 rounded-3xl blur-2xl opacity-20"></div>
                        <div className="relative w-24 h-24 bg-gradient-to-br from-fuchsia-600/20 to-cyan-600/20 rounded-3xl border border-fuchsia-500/30 flex items-center justify-center backdrop-blur-xl">
                            <span className="text-4xl">📦</span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">No Items Available</h2>
                    <p className="text-gray-400 text-center max-w-sm">
                        Your group members haven't shared any items yet. Ask them to add items to their fridge and make them available!
                    </p>
                </div>
            )}
        </div>
    );
};

export default GroupPantry;
