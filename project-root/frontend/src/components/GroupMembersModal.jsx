import React, { useState, useEffect } from 'react';
import { X, Users, User, Tag, Loader2 } from 'lucide-react';
import api from '../tools/api';

const GroupMembersModal = ({ isOpen, onClose, group }) => {
    const [members, setMembers] = useState([]);
    const [adminId, setAdminId] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // user auth data
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/groups/${group.id}/members`);
            setMembers(res.data.members);
            setAdminId(res.data.adminId);
        } catch (err) {
            console.error('Failed to fetch members');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen && group) {
            fetchMembers();
        }
    }, [isOpen, group]);

    const handleKickMember = async (userId) => {
        if (!window.confirm('Are you sure you want to remove this member from the group?')) return;
        try {
            await api.delete(`/groups/${group.id}/members/${userId}`);
            fetchMembers(); // reload
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to remove member');
        }
    };

    if (!isOpen) return null;

    const isAdmin = currentUser.id === adminId;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all">
            <div className="w-full max-w-md overflow-hidden flex flex-col max-h-[85vh] rounded-2xl border border-gray-700/50 bg-gray-800/40 backdrop-blur-xl">
                <div className="p-6 border-b border-gray-700/50 flex justify-between items-center bg-gradient-to-r from-fuchsia-600/20 to-cyan-600/20">
                    <div>
                        <h2 className="text-2xl font-black text-white">{group?.name}</h2>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">👥 Community Members</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
                        <X size={22} />
                    </button>
                </div>

                <div className="p-4 overflow-y-auto flex-1">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-3">
                            <Loader2 className="animate-spin text-fuchsia-500" size={32} />
                            <p className="text-sm text-gray-400 font-medium">Loading members...</p>
                        </div>
                    ) : members.length > 0 ? (
                        <div className="space-y-3">
                            {members.map(member => (
                                <div key={member.id} className="flex items-center gap-3 p-4 rounded-xl bg-gray-700/30 border border-gray-600/50 hover:border-fuchsia-500/50 hover:bg-gray-700/50 transition-all">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-600 to-cyan-600 flex items-center justify-center text-white font-bold shadow-lg shadow-fuchsia-500/30">
                                        {member.username?.[0].toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-bold text-white truncate">{member.username}</p>
                                            {member.id === adminId && (
                                                <span className="text-[9px] px-2 py-1 bg-green-500/20 text-green-400 rounded-md font-black uppercase tracking-tighter border border-green-500/30">Admin</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <Tag size={10} className="text-gray-500" />
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                                {member.dietaryTags || 'No Restrictions'}
                                            </span>
                                        </div>
                                    </div>
                                    {/* admin tools - always visible at top */}
                                    {isAdmin && member.id !== currentUser.id && (
                                        <button 
                                            onClick={() => handleKickMember(member.id)}
                                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all"
                                            title="Remove Member"
                                        >
                                            <X size={18} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-400 italic">No members found.</p>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-gray-700/50 bg-gradient-to-r from-fuchsia-600/10 to-cyan-600/10">
                    <button 
                        onClick={onClose}
                        className="w-full py-3 text-sm font-bold text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all"
                    >
                        Close View
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GroupMembersModal;
