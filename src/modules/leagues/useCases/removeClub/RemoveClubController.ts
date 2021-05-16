import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RemoveClubUseCase } from './RemoveClubUseCase';

class RemoveClubController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { leagueId, clubId } = request.params;

    const removeClubUseCase = container.resolve(RemoveClubUseCase);

    await removeClubUseCase.execute({ clubId, leagueId });

    return response.status(204).send();
  }
}

export { RemoveClubController };
