import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../tools/api';
import { Refrigerator, Sun, Moon, Mail, Lock } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');
    const navigate = useNavigate();

    const toggleTheme = () => {
        const newDark = !isDark;
        setIsDark(newDark);
        if (newDark) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
            isDark 
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
                : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
        }`}>
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>

            <div className="w-full max-w-md relative z-10">
                {/* Theme Toggle */}
                <button 
                    onClick={toggleTheme}
                    className={`absolute -top-16 right-0 p-3 rounded-xl border transition-all ${
                        isDark 
                            ? 'bg-gray-800/50 border-gray-700 text-amber-500 hover:bg-gray-700' 
                            : 'bg-white/50 border-gray-200 text-indigo-500 hover:bg-white'
                    }`}
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Card */}
                <div className={`backdrop-blur-xl rounded-2xl border transition-all ${
                    isDark
                        ? 'bg-gray-800/40 border-gray-700/50 shadow-2xl shadow-black/50'
                        : 'bg-white/40 border-gray-200/50 shadow-2xl shadow-black/5'
                } p-8 space-y-8`}>
                    
                    {/* Header */}
                    <div className="text-center space-y-3">
                        <div className="flex justify-center">
                            <div className="bg-gradient-to-br from-fuchsia-600 to-cyan-600 p-4 rounded-2xl shadow-lg shadow-fuchsia-500/30">
                                <Refrigerator className="text-white" size={32} />
                            </div>
                        </div>
                        <h1 className={`text-4xl font-black tracking-tight ${
                            isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                            Sign in to your Fridge
                        </h1>
                        <p className={`text-sm font-medium ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            Sign in to manage your fridge & share with community
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm font-medium flex items-center gap-2">
                            <span>⚠️</span>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className={`text-sm font-bold uppercase tracking-wider ${
                                isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                                    isDark ? 'text-gray-500' : 'text-gray-400'
                                }`} />
                                <input 
                                    type="email" 
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all ${
                                        isDark
                                            ? 'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-fuchsia-500 focus:bg-gray-700'
                                            : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-fuchsia-500 focus:bg-white'
                                    } focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20`}
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className={`text-sm font-bold uppercase tracking-wider ${
                                isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                                Password
                            </label>
                            <div className="relative">
                                <Lock size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                                    isDark ? 'text-gray-500' : 'text-gray-400'
                                }`} />
                                <input 
                                    type="password" 
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all ${
                                        isDark
                                            ? 'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-cyan-500 focus:bg-gray-700'
                                            : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-cyan-500 focus:bg-white'
                                    } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>

                        {/* Sign In Button */}
                        <button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white font-bold py-3 rounded-xl hover:shadow-xl hover:shadow-fuchsia-500/40 transition-all active:scale-95 uppercase tracking-wider text-sm mt-6"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <p className={`text-center text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        Don't have an account?{' '}
                        <Link to="/register" className="font-bold bg-gradient-to-r from-fuchsia-600 to-cyan-600 bg-clip-text text-transparent hover:underline">
                            Create one
                        </Link>
                    </p>
                </div>

                {/* Footer Text */}
                <p className={`text-center text-xs mt-6 ${
                    isDark ? 'text-gray-500' : 'text-gray-600'
                }`}>
                    Part of the WasteLess community
                </p>
            </div>
        </div>
    );
};

export default Login;
