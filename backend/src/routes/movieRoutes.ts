import { Router } from 'express';
import { getMovieInsights } from '../controllers/movieController';
import { validateImdbId } from '../utils/validator';

const router = Router();

router.get('/movie/:imdbId', validateImdbId, getMovieInsights);

export default router;
