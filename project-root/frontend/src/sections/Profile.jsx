import React, { useState, useEffect } from 'react';
import api from '../tools/api';
import { User, Tag, FileText, Save, CheckCircle } from 'lucide-react';

const Profile = () => {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        bio: '',
        phone: '',
        dietaryTags: 'None'
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const tags = ['None', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher', 'Lactose-Free', 'Nut-Free'];

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/users/profile');
                setProfile(res.data);
            } catch (err) {
                console.error('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');
        try {
            await api.post('/users/profile', {
                bio: profile.bio,
                phone: profile.phone,
                dietaryTags: profile.dietaryTags
            });
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Failed to update profile.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-fuchsia-600/20 border-t-fuchsia-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto">
            <header className="mb-12">
                <h1 className="text-4xl font-black text-gray-900 mb-2">Profile Settings</h1>
                <p className="text-gray-600 text-lg">Customize your preferences and personal information.</p>
            </header>

            <form onSubmit={handleUpdate} className="space-y-8">
                {/* Card 1: User Identity */}
                <div className="glass p-8 border-l-4 border-fuchsia-600 space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-lg bg-fuchsia-600 flex items-center justify-center">
                            <User size={24} className="text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Identity</h2>
                    </div>
                    
                    {/* read-only info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-3">Username</label>
                            <div className="text-gray-900 font-semibold bg-white p-4 rounded-lg border-2 border-fuchsia-200">
                                {profile.username}
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-3">Email Address</label>
                            <div className="text-gray-700 text-sm bg-white p-4 rounded-lg border-2 border-cyan-200 truncate">
                                {profile.email}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2: Contact & Bio */}
                <div className="glass p-8 border-l-4 border-cyan-600 space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-lg bg-cyan-600 flex items-center justify-center">
                            <FileText size={24} className="text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">About You</h2>
                    </div>
                    
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-3">Phone (for WhatsApp)</label>
                        <input 
                            type="text" 
                            className="input-field" 
                            placeholder="+40 7xx xxx xxx"
                            value={profile.phone || ''}
                            onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-3">Bio</label>
                        <textarea 
                            className="input-field min-h-[140px] resize-none"
                            placeholder="Tell friends a bit about yourself... (e.g., cooking interests, dietary info, allergies)"
                            value={profile.bio || ''}
                            onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-2">{profile.bio?.length || 0} characters</p>
                    </div>
                </div>

                {/* Card 3: Dietary Preferences */}
                <div className="glass p-8 border-l-4 border-amber-600 space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-lg bg-amber-600 flex items-center justify-center">
                            <Tag size={24} className="text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Dietary Preferences</h2>
                    </div>
                    
                    <div>
                        <p className="text-sm text-gray-600 mb-4">Select your primary dietary preference:</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {tags.map(tag => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => setProfile({...profile, dietaryTags: tag})}
                                    className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all border-2 ${
                                        profile.dietaryTags === tag 
                                        ? 'bg-gradient-to-br from-fuchsia-600 to-cyan-600 border-fuchsia-600 text-white shadow-lg shadow-fuchsia-200' 
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-fuchsia-300 hover:bg-fuchsia-50/30'
                                    }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer with message and save button */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                    {message && (
                        <div className={`text-sm font-bold flex items-center gap-2 px-4 py-2 rounded-lg ${message.includes('successfully') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                            <CheckCircle size={18} /> {message}
                        </div>
                    )}
                    <button 
                        type="submit" 
                        disabled={saving}
                        className="btn-primary flex items-center justify-center gap-2 px-8 py-3 w-full sm:w-auto shadow-lg hover:shadow-xl transition-all"
                    >
                        <Save size={20} />
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
