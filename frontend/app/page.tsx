'use client';

import { motion } from 'framer-motion';
import SearchBar from '@/components/SearchBar';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center w-full max-w-3xl px-4 space-y-8"
            >
                <div className="space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-5xl md:text-7xl font-black text-[var(--text-primary)] tracking-tight leading-tight"
                    >
                        AI Movie <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Insight</span> Builder
                    </motion.h1>
                    <p className="text-xl text-[var(--text-secondary)] md:px-10">
                        Uncover the deep sentiment of audience reviews instantly, powered by AI.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="pt-8"
                >
                    <SearchBar />
                </motion.div>
            </motion.div>
        </div>
    );
}
