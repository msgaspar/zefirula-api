import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateClubUseCase } from './CreateClubUseCase';

class CreateClubController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { clubId } = request.body;

    const createClubUseCase = container.resolve(CreateClubUseCase);

    await createClubUseCase.execute({ clubId });

    return response.status(201).send();
  }
}

export { CreateClubController };
