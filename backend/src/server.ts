import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import movieRoutes from './routes/movieRoutes';
import { errorHandler } from './utils/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/api', movieRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', environment: process.env.NODE_ENV });
});

app.use(errorHandler);

app.listen(config.port, () => {
    console.log(` Server running on port ${config.port}`);
});
