import 'reflect-metadata';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import createConnection from '@shared/infra/typeorm';

import '../../container';

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

export { app };
