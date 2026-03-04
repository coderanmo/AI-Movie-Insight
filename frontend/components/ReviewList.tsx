'use client';
import { Review } from '../types/movie';
import { ReviewCard } from './ReviewCard';

export function ReviewList({ reviews }: { reviews: Review[] }) {
    if (!reviews || reviews.length === 0) return null;

    return (
        <div className="space-y-4 mt-10">
            <h3 className="text-2xl font-bold text-white mb-6">
                🎭 Audience Reviews
                <span className="ml-3 text-sm font-normal text-gray-400">({reviews.length} reviews)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((review, idx) => (
                    <ReviewCard key={idx} review={review} index={idx} />
                ))}
            </div>
        </div>
    );
}
