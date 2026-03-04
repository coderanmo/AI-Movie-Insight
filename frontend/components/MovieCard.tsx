'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Calendar, Users } from 'lucide-react';
import { MovieData } from '../types/movie';

interface MovieCardProps {
    movie: MovieData;
}

export function MovieCard({ movie }: MovieCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="theme-card rounded-2xl overflow-hidden backdrop-blur-md shadow-xl border"
        >
            {/* Poster */}
            <div className="relative h-64 w-full">
                {movie.poster ? (
                    <Image
                        src={movie.poster}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-[var(--text-secondary)]">
                        No Poster
                    </div>
                )}
                {/* Rating badge */}
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-lg text-yellow-400 font-bold text-sm">
                    <Star className="w-3 h-3" /> {movie.rating}
                </div>
            </div>

            {/* Info */}
            <div className="p-4 space-y-2">
                <h3 className="text-lg font-bold text-[var(--text-primary)] truncate">{movie.title}</h3>
                <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {movie.year}</span>
                    {movie.cast && (
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {movie.cast.length} cast</span>
                    )}
                </div>
                <Link
                    href={`/movie/${movie.title}`}
                    className="block mt-3 text-center py-2 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white text-sm font-medium transition-colors"
                >
                    View Insights →
                </Link>
            </div>
        </motion.div>
    );
}
