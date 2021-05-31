import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetAllScoresUseCase } from './ResetAllScoresUseCase';

class ResetAllScoresController {
  async handle(request: Request, response: Response): Promise<Response> {
    const resetScoresUseCase = container.resolve(ResetAllScoresUseCase);
    await resetScoresUseCase.execute();
    return response.status(204).send();
  }
}

export { ResetAllScoresController };
