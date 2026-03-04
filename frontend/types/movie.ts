export interface Review {
    comment: string;
    rating: number | null;
    author: string;
}

export interface AIInsight {
    type: string;
    text: string;
}

export interface MovieData {
    title: string;
    poster: string | null;
    year: string;
    rating: string;
    cast: string[];
    plot: string;
    reviews: Review[];
    aiSummary: string;
    sentiment: 'Positive' | 'Mixed' | 'Negative';
    insights: AIInsight[];
}
