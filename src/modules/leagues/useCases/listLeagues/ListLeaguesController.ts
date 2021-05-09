import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListLeaguesUseCase } from './ListLeaguesUseCase';

class ListLeaguesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listLeaguesUseCase = container.resolve(ListLeaguesUseCase);
    const all = await listLeaguesUseCase.execute();
    return response.json(all);
  }
}

export { ListLeaguesController };
