import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import { Menu, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 lg:flex">
            {/* Sidebar Component */}
            <NavigationBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content Area */}
            <div className="flex-1 lg:ml-64 transition-all duration-300">
                {/* Mobile Header */}
                <header className="lg:hidden sticky top-0 z-30 bg-white/60 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                    <h1 className="text-3xl font-black text-emerald-600 tracking-tighter" style={{fontFamily: 'Bebas Neue'}}>ANTIWASTE</h1>
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 border border-gray-200 rounded-lg text-gray-500"
                    >
                        <Menu size={24} />
                    </button>
                </header>

                {/* Desktop User Info Header */}
                <div className="hidden lg:flex sticky top-0 z-20 bg-gradient-to-r from-fuchsia-600 to-cyan-600 px-6 py-5 items-center justify-between shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-fuchsia-600 font-bold text-lg shadow-md">
                            {user.username?.[0].toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">{user.username}</p>
                            <p className="text-xs text-white/80">Member</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold text-fuchsia-600 bg-white hover:bg-red-50 hover:text-red-600 transition-all shadow-md hover:shadow-lg"
                        title="Sign Out"
                    >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>

                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
