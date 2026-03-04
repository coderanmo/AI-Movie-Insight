import { Request, Response, NextFunction } from 'express';

export const validateImdbId = (req: Request, res: Response, next: NextFunction): void => {
    const imdbId = req.params.imdbId as string;
    const imdbIdRegex = /^tt\d{7,8}$/;

    if (!imdbIdRegex.test(imdbId)) {
        res.status(400).json({ error: 'Invalid IMDb ID format. Example: tt0133093' });
        return;
    }

    next();
};
