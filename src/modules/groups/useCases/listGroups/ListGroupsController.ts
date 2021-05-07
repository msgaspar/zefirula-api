import { Request, Response } from 'express';

import { ListGroupsUseCase } from './ListGroupsUseCase';

class ListGroupsController {
  constructor(private listGroupsUseCase: ListGroupsUseCase) {}

  handle(request: Request, response: Response): Response {
    const all = this.listGroupsUseCase.execute();
    return response.json(all);
  }
}

export { ListGroupsController };
