'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Review } from '../types/movie';

interface ReviewCardProps {
    review: Review;
    index: number;
}

// Return a color class based on rating for sentiment highlighting
function getSentimentColor(rating: number | null) {
    if (!rating) return 'border-gray-500/30 bg-gray-500/5';
    if (rating >= 7) return 'border-green-500/30 bg-green-500/5';
    if (rating >= 5) return 'border-yellow-500/30 bg-yellow-500/5';
    return 'border-red-500/30 bg-red-500/5';
}

function getRatingColor(rating: number | null) {
    if (!rating) return 'text-gray-400 bg-gray-500/20';
    if (rating >= 7) return 'text-green-400 bg-green-500/20';
    if (rating >= 5) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-red-400 bg-red-500/20';
}

export function ReviewCard({ review, index }: ReviewCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`p-5 rounded-xl border backdrop-blur-sm transition-all ${getSentimentColor(review.rating)}`}
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center text-purple-300 font-bold text-sm">
                        {review.author.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-purple-300">{review.author}</span>
                </div>
                {review.rating !== null && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-semibold ${getRatingColor(review.rating)}`}>
                        <Star className="w-3 h-3" />
                        <span>{review.rating}/10</span>
                    </div>
                )}
            </div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed italic">"{review.comment}"</p>
        </motion.div>
    );
}
