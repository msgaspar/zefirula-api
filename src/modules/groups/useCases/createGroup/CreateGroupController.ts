import { Request, Response } from 'express';

import { CreateGroupUseCase } from './CreateGroupUseCase';

class CreateGroupController {
  constructor(private createGroupUseCase: CreateGroupUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name } = request.body;

    this.createGroupUseCase.execute({ name });

    return response.status(201).send();
  }
}

export { CreateGroupController };
