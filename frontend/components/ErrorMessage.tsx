'use client';

import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface ErrorMessageProps {
    message: string;
    showBackButton?: boolean;
}

export function ErrorMessage({ message, showBackButton = true }: ErrorMessageProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 px-4"
        >
            <div className="p-6 rounded-full bg-red-500/10 border border-red-500/30">
                <AlertTriangle className="w-12 h-12 text-red-400" />
            </div>
            <div>
                <h2 className="text-3xl font-bold text-red-400 mb-2">Oops!</h2>
                <p className="text-xl text-[var(--text-secondary)] max-w-md">{message}</p>
            </div>
            {showBackButton && (
                <Link
                    href="/"
                    className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full transition-all hover:scale-105"
                >
                    Try Another Search
                </Link>
            )}
        </motion.div>
    );
}
