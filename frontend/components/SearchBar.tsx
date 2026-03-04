'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchBar() {
    const [imdbId, setImdbId] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate IMDb ID format
        const isValid = /^tt\d{7,8}$/.test(imdbId);

        if (!isValid) {
            setError('Invalid IMDb ID format. Example: tt0133093');
            return;
        }

        setError('');
        router.push(`/movie/${imdbId}`);
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="text"
                    value={imdbId}
                    onChange={(e) => setImdbId(e.target.value)}
                    placeholder="Enter IMDb ID (e.g., tt0133093)"
                    className="w-full h-14 pl-6 pr-14 rounded-full theme-card border text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-xl shadow-lg transition-all"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-2 h-10 w-10 flex items-center justify-center rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                >
                    <Search className="w-5 h-5" />
                </button>
            </form>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 dark:text-red-400 text-sm mt-2 text-center font-medium"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
}
