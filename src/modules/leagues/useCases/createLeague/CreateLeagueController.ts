import { Request, Response } from 'express';

import { CreateLeagueUseCase } from './CreateLeagueUseCase';

class CreateLeagueController {
  constructor(private createLeagueUseCase: CreateLeagueUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name } = request.body;

    this.createLeagueUseCase.execute({ name });

    return response.status(201).send();
  }
}

export { CreateLeagueController };
