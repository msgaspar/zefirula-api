import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateLeagueUseCase } from './CreateLeagueUseCase';

class CreateLeagueController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createLeagueUseCase = container.resolve(CreateLeagueUseCase);

    await createLeagueUseCase.execute({ name });

    return response.status(201).send();
  }
}

export { CreateLeagueController };
