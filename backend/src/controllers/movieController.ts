import { Request, Response, NextFunction } from 'express';
import { fetchMovieData } from '../services/movieService';
import { fetchAudienceReviews } from '../services/reviewService';
import { generateSentimentAnalysis } from '../services/aiService';

export const getMovieInsights = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const imdbId = req.params.imdbId as string;

    try {
        // 1. Fetch from OMDb API
        const movieData = await fetchMovieData(imdbId);

        // 2. Fetch/Scrape Reviews
        const reviews = await fetchAudienceReviews(imdbId);

        // 3. AI Sentiment Generation
        const aiAnalysis = await generateSentimentAnalysis(reviews);

        const responsePayload = {
            title: movieData.Title,
            poster: movieData.Poster !== 'N/A' ? movieData.Poster : null,
            year: movieData.Year,
            rating: movieData.imdbRating,
            cast: movieData.Actors ? movieData.Actors.split(', ') : [],
            plot: movieData.Plot,
            reviews: reviews,
            aiSummary: aiAnalysis.summary,
            sentiment: aiAnalysis.sentiment,
            insights: aiAnalysis.insights
        };

        res.json(responsePayload);
    } catch (error) {
        next(error); // Pass to global error middleware
    }
};
