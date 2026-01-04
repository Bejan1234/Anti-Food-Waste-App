import React from 'react';
import { Clock, Sparkles, Trash2, User, Heart } from 'lucide-react';

const ProductCard = ({ product, onToggleAvailable, onDelete, onClaim, mode = 'mine' }) => {
    const isExpiringSoon = () => {
        if (!product.expirationDate) return false;
        const days = Math.ceil((new Date(product.expirationDate) - new Date()) / (1000 * 60 * 60 * 24));
        return days <= 3 && days >= 0;
    };

    const isExpired = () => {
        if (!product.expirationDate) return false;
        return new Date(product.expirationDate) < new Date();
    };

    return (
        <div className={`glass p-6 flex items-center gap-6 transition-all hover:shadow-xl border-l-4 w-full relative group rounded-lg ${
            isExpired() ? 'border-l-red-600 shadow-lg shadow-red-100 dark:shadow-red-900/20' : isExpiringSoon() ? 'border-l-amber-500 shadow-lg shadow-amber-100 dark:shadow-amber-900/20' : 'border-l-fuchsia-600 shadow-lg shadow-fuchsia-100 dark:shadow-fuchsia-900/20'
        }`}>
            {/* Product Image */}
            {product.image && (
                <img src={product.image} alt={product.name} className="w-28 h-28 rounded-lg object-cover bg-white shadow-md flex-shrink-0" />
            )}

            {/* Product Details */}
            <div className="flex-1 min-w-0 flex flex-col gap-2">
                <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-50 text-lg line-clamp-2" title={product.name}>{product.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{product.brand || 'No brand'}</p>
                </div>

                {/* Owner Badge for Explore */}
                {mode === 'explore' && product.User && (
                    <div className="flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-full bg-gradient-to-r from-fuchsia-600 to-cyan-600 shadow-lg shadow-fuchsia-200 dark:shadow-fuchsia-900/40">
                        <User size={12} className="text-white" />
                        <span className="text-[10px] font-bold text-white">{product.User.username}</span>
                    </div>
                )}

                {/* Claimed Info */}
                {product.description?.match(/Claimed( from)?: /) && (
                    <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-700/50 w-fit">
                        <span className="text-gray-500 dark:text-gray-400 text-[8px] uppercase tracking-wider">Shared by</span>
                        <div className="text-xs font-semibold text-gray-800 dark:text-gray-100 mt-0.5">
                            {product.description.split('.')[0].replace(/Claimed( from)?: /, '').split(' | ')[0]}
                        </div>
                    </div>
                )}

                {/* Category and Date Badges */}
                <div className="flex flex-wrap gap-2 items-center">
                    <div className="flex items-center gap-2 text-[9px] font-bold px-3 py-1 rounded-lg bg-gradient-to-r from-fuchsia-100 to-pink-100 dark:from-fuchsia-500/10 dark:to-pink-500/10 text-fuchsia-700 dark:text-fuchsia-400 uppercase tracking-wider">
                        <Sparkles size={11} />
                        {product.category || 'General'}
                    </div>
                    <div className={`flex items-center gap-2 text-[9px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider ${
                        isExpired() ? 'bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-500/10 dark:to-orange-500/10 text-red-700 dark:text-red-400' : isExpiringSoon() ? 'bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-500/10 dark:to-orange-500/10 text-amber-700 dark:text-amber-600' : 'bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-500/10 dark:to-blue-500/10 text-cyan-700 dark:text-cyan-400'
                    }`}>
                        <Clock size={11} />
                        {product.expirationDate ? new Date(product.expirationDate).toLocaleDateString() : 'No date'}
                    </div>
                    
                    {/* Status Badge - Separate */}
                    {isExpired() && (
                        <div className="flex items-center gap-1.5 text-[9px] font-bold px-3 py-1 rounded-full bg-red-600 text-white uppercase tracking-wider animate-pulse shadow-lg shadow-red-300 dark:shadow-red-900/60 border-2 border-red-400 dark:border-red-500/50 ml-2">
                            <span>🔴</span>
                            Expired
                        </div>
                    )}
                    {isExpiringSoon() && !isExpired() && (
                        <div className="flex items-center gap-1.5 text-[9px] font-bold px-3 py-1 rounded-full bg-amber-500 text-white uppercase tracking-wider animate-pulse shadow-lg shadow-amber-300 dark:shadow-amber-900/60 border-2 border-amber-300 dark:border-amber-500/50 ml-2">
                            <span>⚠️</span>
                            Expiring Soon
                        </div>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 flex-shrink-0">
                {mode === 'mine' ? (
                    <>
                        {isExpired() ? (
                            <div className="px-3 py-2 rounded-lg bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 text-xs font-bold text-center border-2 border-red-300 dark:border-red-500/30">
                                ❌ Expired - Cannot Share
                            </div>
                        ) : (
                            <button 
                                onClick={() => onToggleAvailable(product.id)} 
                                className={`px-3 py-2 rounded-lg transition-all duration-200 text-xs font-bold flex items-center gap-1.5 ${product.isAvailable ? 'bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white shadow-md shadow-fuchsia-200 dark:shadow-fuchsia-900/40 hover:shadow-lg hover:shadow-fuchsia-300 dark:hover:shadow-fuchsia-900/50' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-500/10 border border-gray-200 dark:border-gray-600'}`}
                                title={product.isAvailable ? "Stop sharing" : "Share in market"}
                            >
                                <Heart size={14} />
                                {product.isAvailable ? '✨ Visible in Market' : 'Share'}
                            </button>
                        )}
                        <button 
                            onClick={() => onDelete(product.id)} 
                            className="p-1.5 rounded-lg bg-red-100 dark:bg-red-500/10 text-red-500 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/20 transition-colors duration-200 flex items-center justify-center"
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>
                        {product.isAvailable && !isExpired() && (
                            <div className="flex gap-1 pt-2 border-t border-gray-200 dark:border-gray-700 justify-center">
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}`} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors duration-200 font-semibold flex items-center justify-center" title="Share on Facebook">
                                    <svg size={14} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                                </a>
                                <a href={`https://www.instagram.com/?url=${encodeURIComponent(window.location.origin)}`} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-500/10 text-pink-600 dark:text-pink-400 transition-colors duration-200 font-semibold flex items-center justify-center" title="Share on Instagram">
                                    <svg size={14} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/></svg>
                                </a>
                            </div>
                        )}
                        {!product.isAvailable && product.description?.includes(' | Phone: ') && (
                            <a 
                                href={`https://wa.me/${product.description.split(' | Phone: ')[1].split('.')[0].replace(/\s+/g, '')}?text=${encodeURIComponent('Hi, I claimed your ' + product.name + ' on AntiWaste and would like to arrange pickup!')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="py-2 bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-fuchsia-200 dark:hover:shadow-fuchsia-900/40 transition-all duration-200"
                            >
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.407 3.481 2.241 2.242 3.48 5.226 3.481 8.408-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.3 1.656zm6.29-4.115l.356.212c1.453.864 3.124 1.319 4.839 1.32h.01c5.728 0 10.39-4.661 10.393-10.39 0-2.779-1.082-5.391-3.048-7.357-1.966-1.966-4.577-3.048-7.356-3.048-5.729 0-10.391 4.661-10.393 10.39 0 1.832.481 3.622 1.391 5.21l.232.404-.97 3.543 3.635-.954z"/></svg>
                                Pickup
                            </a>
                        )}
                    </>
                ) : (
                    <>
                        {product.User?.phone && (
                            <a 
                                href={`https://wa.me/${product.User.phone.replace(/\s+/g, '')}?text=${encodeURIComponent('Hi ' + product.User.username + ', I saw your ' + product.name + ' on AntiWaste and I am interested!')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="py-2 border-2 border-fuchsia-200 dark:border-fuchsia-500/30 text-fuchsia-600 dark:text-fuchsia-400 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-500/5 transition-colors duration-200"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.407 3.481 2.241 2.242 3.48 5.226 3.481 8.408-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.3 1.656zm6.29-4.115l.356.212c1.453.864 3.124 1.319 4.839 1.32h.01c5.728 0 10.39-4.661 10.393-10.39 0-2.779-1.082-5.391-3.048-7.357-1.966-1.966-4.577-3.048-7.356-3.048-5.729 0-10.391 4.661-10.393 10.39 0 1.832.481 3.622 1.391 5.21l.232.404-.97 3.543 3.635-.954z"/></svg>
                                Chat
                            </a>
                        )}
                        <button 
                            onClick={() => onClaim(product.id)}
                            className="btn-primary py-2 text-xs flex items-center justify-center gap-2 shadow-lg shadow-fuchsia-100 dark:shadow-fuchsia-900/40"
                        >
                            Claim
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
