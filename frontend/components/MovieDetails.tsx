'use client';

import { MovieData } from '../types/movie';
import { GlassCard } from './GlassCard';
import { AISummaryCard } from './AISummaryCard';
import { ReviewList } from './ReviewList';
import { motion } from 'framer-motion';
import { Star, Calendar } from 'lucide-react';

export function MovieDetails({ movie }: { movie: MovieData }) {
    return (
        <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 text-center"
            >
                <h1 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] mb-4 tracking-tight drop-shadow-lg">
                    {movie.title}
                </h1>
                <div className="flex items-center justify-center gap-6 text-[var(--text-secondary)] font-medium">
                    <span className="flex items-center gap-2">
                        <Calendar className="text-purple-400 w-5 h-5" />
                        {movie.year}
                    </span>
                    <span className="flex items-center gap-2">
                        <Star className="text-yellow-400 w-5 h-5" />
                        {movie.rating} / 10
                    </span>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Left Column - Poster & Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-1 space-y-6"
                >
                    {movie.poster ? (
                        <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                            <img
                                src={movie.poster}
                                alt={`${movie.title} poster`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    ) : (
                        <div className="aspect-[2/3] rounded-2xl theme-card flex items-center justify-center shadow-2xl">
                            <span className="text-gray-500">No poster available</span>
                        </div>
                    )}

                    <GlassCard>
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Cast</h3>
                        <p className="text-[var(--text-secondary)] leading-relaxed">{movie.cast}</p>
                    </GlassCard>
                </motion.div>

                {/* Right Column - Plot, AI Insights */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 space-y-8"
                >
                    <GlassCard>
                        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Plot Summary</h2>
                        <p className="text-lg text-[var(--text-secondary)] leading-relaxed">{movie.plot}</p>
                    </GlassCard>

                    <AISummaryCard
                        summary={movie.aiSummary}
                        sentiment={movie.sentiment}
                        insights={movie.insights || []}
                    />
                </motion.div>
            </div>

            {/* Reviews Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <ReviewList reviews={movie.reviews} />
            </motion.div>
        </div>
    );
}
