import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RegisterClubUseCase } from './RegisterClubUseCase';

class RegisterClubController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { clubId } = request.body;
    const { leagueId } = request.params;

    const registerClubUseCase = container.resolve(RegisterClubUseCase);

    await registerClubUseCase.execute({ clubId, leagueId });

    return response.status(201).send();
  }
}

export { RegisterClubController };
