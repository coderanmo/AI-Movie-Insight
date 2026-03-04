import axios from 'axios';
import { MovieData } from '../types/movie';

// Assuming backend runs on 5000 in dev
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const getMovieDetails = async (imdbId: string): Promise<MovieData> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/movie/${imdbId}`);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.error) {
            throw new Error(error.response.data.error);
        }
        throw new Error('Failed to fetch movie data. Please try again.');
    }
};
