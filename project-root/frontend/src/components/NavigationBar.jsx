import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Refrigerator, Sparkles, Users, X, Settings, Moon, Sun } from 'lucide-react';

const NavigationBar = ({ isOpen, onClose }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    const navItems = [
        { name: 'My Fridge', path: '/dashboard', icon: Refrigerator },
        { name: 'Explore Market', path: '/explore', icon: Sparkles },
        { name: 'Friend Groups', path: '/groups', icon: Users },
    ];

    return (
        <>
            {/* mobile overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                ></div>
            )}

            {/* sidebar content */}
            <aside className={`fixed inset-y-0 left-0 w-64 sidebar glass rounded-none border-r border-white/20 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* header */}
                    <div className="p-4 flex justify-between items-center border-b border-gray-200/70 gap-3">
                        <h1 className="text-4xl font-black text-fuchsia-600 tracking-tight" style={{fontFamily: 'Bebas Neue'}}>ANTIWASTE</h1>
                        <div className="flex items-center gap-2">
                            {/* theme toggle */}
                            <button 
                                onClick={toggleTheme}
                                className="p-2 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100 dark:hover:bg-white/5 transition-all border border-gray-200/50"
                                title="Toggle theme"
                            >
                                {isDark ? <Sun size={16} className="text-amber-500" /> : <Moon size={16} className="text-fuchsia-500" />}
                            </button>
                            {/* settings */}
                            <NavLink 
                                to="/profile" 
                                className={({ isActive }) => `p-2 rounded-lg transition-all ${isActive ? 'text-fuchsia-600 bg-fuchsia-50' : 'text-gray-400 hover:bg-gray-100'}`}
                                title="Settings"
                            >
                                <Settings size={16} />
                            </NavLink>
                            {/* close on mobile */}
                            <button onClick={onClose} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* navigation */}
                    <nav className="flex-1 px-2.5 space-y-1 mt-4">
                        {navItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => { if(window.innerWidth < 1024) onClose(); }}
                                    className={({ isActive }) => `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold transition-all ${
                                        isActive 
                                        ? 'bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white shadow-lg shadow-fuchsia-300 dark:shadow-fuchsia-900/40' 
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-500/10 hover:text-fuchsia-600 dark:hover:text-fuchsia-400'
                                    }`}
                                >
                                    <IconComponent size={22} />
                                    <span>{item.name}</span>
                                </NavLink>
                            );
                        })}
                    </nav>


                </div>
            </aside>
        </>
    );
};

export default NavigationBar;
