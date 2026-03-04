'use client';

import { AIInsight } from '../types/movie';
import { GlassCard } from './GlassCard';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, MinusCircle } from 'lucide-react';

interface Props {
    summary: string;
    sentiment: 'Positive' | 'Mixed' | 'Negative';
    insights: AIInsight[];
}

export function AISummaryCard({ summary, sentiment, insights }: Props) {
    const getSentimentColors = () => {
        switch (sentiment) {
            case 'Positive': return 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30';
            case 'Negative': return 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30';
            default: return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30';
        }
    };

    const getSentimentIcon = () => {
        switch (sentiment) {
            case 'Positive': return <CheckCircle className="w-5 h-5" />;
            case 'Negative': return <AlertCircle className="w-5 h-5" />;
            default: return <MinusCircle className="w-5 h-5" />;
        }
    };

    return (
        <GlassCard className="h-full border-t-4 border-t-purple-500 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                        AI Insight Engine
                    </span>
                </h3>
                <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 font-semibold border ${getSentimentColors()}`}>
                    {getSentimentIcon()}
                    {sentiment}
                </div>
            </div>

            <div className="mb-6">
                <h4 className="text-sm uppercase tracking-wider text-[var(--text-secondary)] font-semibold mb-2">Overall Summary</h4>
                <p className="text-lg text-[var(--text-primary)] leading-relaxed">{summary}</p>
            </div>

            <div className="flex-1">
                <h4 className="text-sm uppercase tracking-wider text-[var(--text-secondary)] font-semibold mb-3">Key Takeaways</h4>
                <div className="space-y-3">
                    {insights.map((insight, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`p-3 rounded-xl border ${insight.type === 'Praise'
                                ? 'bg-green-500/10 border-green-500/20 text-green-800 dark:text-green-200'
                                : 'bg-red-500/10 border-red-500/20 text-red-800 dark:text-red-200'
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`mt-0.5 font-bold ${insight.type === 'Praise' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {insight.type === 'Praise' ? '+' : '-'}
                                </div>
                                <p className="text-sm">{insight.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </GlassCard>
    );
}
