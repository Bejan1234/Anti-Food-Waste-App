import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../tools/api';
import { Users, Plus, Tag, LogIn, Mail, Trash2, ShoppingBag } from 'lucide-react';
import GroupModal from "../components/CreateGroupModal";
import MembersModal from '../components/MembersModal';

const Groups = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const navigate = useNavigate();

    const fetchGroups = async () => {
        setLoading(true);
        try {
            const res = await api.get('/groups');
            setGroups(res.data);
        } catch (err) {
            console.error('Failed to fetch groups');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const handleJoinGroup = async () => {
        const id = prompt('🎯 Enter the Group ID:\n\nShare the ID with friends to invite them to your circle!');
        if (!id) return;
        try {
            await api.post(`/groups/${id}/join`);
            fetchGroups();
            alert('Enrolled in group successfully!');
        } catch (err) {
            alert(err.response?.data?.error || 'Could not join group. Check the ID.');
        }
    };

    const handleInvite = async (groupId) => {
        const email = prompt('👥 Invite a Friend\n\nEnter their email address to join your circle:');
        if (!email) return;
        try {
            await api.post(`/groups/${groupId}/invite`, { email });
            alert('🎉 Invitation sent!\n\nYour friend will receive an email to join your community circle!');
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to send invite.');
        }
    };

    const handleViewMembers = (group) => {
        setSelectedGroup(group);
        setIsMembersModalOpen(true);
    };

    const handleDeleteGroup = async (groupId) => {
        try {
            const numId = Number(groupId);
            console.log('🗑️ DELETE ATTEMPT:');
            console.log('  Group ID:', groupId, '→ Converted:', numId);
            console.log('  User ID:', user.id);
            
            const response = await api.delete(`/groups/${numId}`);
            console.log('✅ DELETE SUCCESS:', response.data);
            
            setDeleteConfirm(null);
            fetchGroups();
            alert('Group deleted successfully!');
        } catch (err) {
            console.error('❌ DELETE ERROR:');
            console.error('  Status:', err.response?.status);
            console.error('  Data:', err.response?.data);
            console.error('  Message:', err.message);
            alert(err.response?.data?.error || 'Failed to delete group. Check console for details.');
        }
    };

    return (
        <div>
            <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 mb-2">Community Circles</h1>
                    <p className="text-gray-500">Connect with trusted friends and share your inventory.</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={handleJoinGroup}
                        className="bg-white text-gray-600 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 border border-gray-100 hover:bg-gray-50 transition-all"
                    >
                        <LogIn size={20} />
                        Join ID
                    </button>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="btn-primary flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
                    >
                        <Plus size={20} />
                        New Group
                    </button>
                </div>
            </header>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="w-12 h-12 border-4 border-emerald-600/20 border-t-emerald-600 rounded-full animate-spin"></div>
                </div>
            ) : groups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groups.map(group => (
                        <div key={group.id} className="group/card relative">
                            {/* Card Background with gradient border */}
                            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-0 group-hover/card:opacity-100 transition-all duration-300"></div>
                            
                            {/* Main Card */}
                            <div className="relative backdrop-blur-xl rounded-2xl border transition-all duration-300 flex flex-col h-full p-6 bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/40 hover:border-fuchsia-500/50">
                                
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-start gap-3 flex-1">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-600 to-cyan-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg shadow-fuchsia-500/30">
                                            {group.name[0].toUpperCase()}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-bold text-lg text-black dark:text-black truncate">{group.name}</h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">#{group.id}</p>
                                        </div>
                                    </div>
                                    {group.adminId === user.id && (
                                        <span className="px-2.5 py-1 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
                                            Admin
                                        </span>
                                    )}
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1 line-clamp-2">
                                    {group.description || 'No description provided.'}
                                </p>

                                {/* Category & Member Count */}
                                <div className="flex items-center gap-2 mb-6 pb-4 border-t border-gray-200 dark:border-gray-700/50">
                                    <span className="px-3 py-1.5 rounded-lg bg-fuchsia-100 dark:bg-fuchsia-500/20 text-fuchsia-700 dark:text-fuchsia-400 text-[10px] font-bold uppercase tracking-wider mt-4">
                                        {group.category || 'General'}
                                    </span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => navigate(`/groups/${group.id}/pantry`)}
                                        className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-emerald-500/40 transition-all active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <ShoppingBag size={16} />
                                        Pantry
                                    </button>
                                    <button 
                                        onClick={() => handleViewMembers(group)}
                                        className="px-4 py-2.5 rounded-lg bg-gray-200 dark:bg-gray-700/50 text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white transition-all text-sm font-bold"
                                        title="View Members"
                                    >
                                        Members
                                    </button>
                                    <button 
                                        onClick={() => handleInvite(group.id)}
                                        className="p-2.5 rounded-lg bg-gray-200 dark:bg-gray-700/50 text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all"
                                        title="Invite Friend"
                                    >
                                        <Mail size={18} />
                                    </button>
                                    {group.adminId === user.id ? (
                                        <button 
                                            onClick={() => {
                                                console.log('Setting deleteConfirm to:', group.id, 'Type:', typeof group.id);
                                                setDeleteConfirm(Number(group.id));
                                            }}
                                            className="p-2.5 rounded-lg bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/30 hover:text-red-700 dark:hover:text-red-300 transition-all"
                                            title="Delete Group"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 px-4">
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600 to-cyan-600 rounded-3xl blur-2xl opacity-20"></div>
                        <div className="relative w-24 h-24 bg-gradient-to-br from-fuchsia-600/20 to-cyan-600/20 rounded-3xl border border-fuchsia-500/30 flex items-center justify-center backdrop-blur-xl">
                            <Users className="text-fuchsia-400" size={48} />
                        </div>
                    </div>
                    <h2 className="text-3xl font-black text-white mb-3 text-center">No Groups Yet</h2>
                    <p className="text-gray-400 text-center max-w-sm mb-8 leading-relaxed">
                        Create a new group to share your fridge with friends, or join an existing one using an ID.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-fuchsia-500/40 transition-all active:scale-95"
                        >
                            Create Group
                        </button>
                        <button 
                            onClick={handleJoinGroup}
                            className="px-6 py-3 bg-gray-700/50 text-gray-300 font-bold rounded-xl border border-gray-600 hover:bg-gray-600 hover:text-white transition-all"
                        >
                            Join by ID
                        </button>
                    </div>
                </div>
            )}

            <GroupModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onRefresh={fetchGroups} 
            />

            <MembersModal 
                isOpen={isMembersModalOpen} 
                onClose={() => setIsMembersModalOpen(false)} 
                group={selectedGroup} 
            />

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8 space-y-6">
                        <div className="text-center">
                            <div className="bg-red-100 dark:bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="text-red-600 dark:text-red-400" size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Delete Group?</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Are you sure you want to delete this group? This action cannot be undone.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => handleDeleteGroup(deleteConfirm)}
                                className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200 dark:shadow-red-900/40"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Groups;
