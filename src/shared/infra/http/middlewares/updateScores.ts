import { Request, Response, NextFunction } from 'express';

import { UpdateScoresController } from '@modules/system/useCases/updateScores/UpdateScoresController';

async function updateScores(
  _request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> {
  const updateScoresController = new UpdateScoresController();

  await updateScoresController.handle();

  next();
}

export { updateScores };
