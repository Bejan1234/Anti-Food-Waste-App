import React, { useState } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import api from '../tools/api';

const CreateGroupModal = ({ isOpen, onClose, onRefresh }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/groups', formData);
            onRefresh();
            onClose();
            setFormData({ name: '', description: '' });
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to create group');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md transition-all">
            <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-gray-200 dark:border-gray-800">
                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-fuchsia-600 to-cyan-600 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-black text-white flex items-center gap-2">
                            <Sparkles size={28} />
                            New Group
                        </h2>
                        <p className="text-white/80 text-xs font-bold uppercase tracking-widest mt-1">Build your community</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors text-white">
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Group Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Group Name</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-3 rounded-xl border-2 border-fuchsia-200 dark:border-fuchsia-500/30 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-fuchsia-600 focus:ring-2 focus:ring-fuchsia-500/20 transition-all"
                            placeholder="e.g. University Dorm, Neighbors..."
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required 
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Description</label>
                        <textarea 
                            className="w-full px-4 py-3 rounded-xl border-2 border-cyan-200 dark:border-cyan-500/30 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none min-h-[120px]"
                            placeholder="What is this group for? Share your goals..."
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        ></textarea>
                    </div>

                    {/* Create Button */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-fuchsia-500/40 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                <span>Creating...</span>
                            </>
                        ) : (
                            <>
                                <Sparkles size={20} />
                                <span>Create Group</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateGroupModal;
