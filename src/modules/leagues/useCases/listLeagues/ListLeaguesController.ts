import { Request, Response } from 'express';

import { ListLeaguesUseCase } from './ListLeaguesUseCase';

class ListLeaguesController {
  constructor(private listLeaguesUseCase: ListLeaguesUseCase) {}

  handle(request: Request, response: Response): Response {
    const all = this.listLeaguesUseCase.execute();
    return response.json(all);
  }
}

export { ListLeaguesController };
