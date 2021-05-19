import 'reflect-metadata';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import cron from 'node-cron';
import 'express-async-errors';

import createConnection from '@shared/infra/typeorm';

import '../../container';

import { UpdateScoresController } from '@modules/system/useCases/updateScores/UpdateScoresController';

import { AppError } from '../../errors/AppError';
import rateLimiter from './middlewares/rateLimiter';
import { router } from './routes';

createConnection();
const app = express();

app.use(rateLimiter);

app.use(express.json());

app.use(cors());
app.use(router);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

const updateScoresController = new UpdateScoresController();
cron.schedule('0,15,30,45 * * * *', () => {
  updateScoresController.handle();
});

export { app };
