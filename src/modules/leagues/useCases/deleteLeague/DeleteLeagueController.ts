import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteLeagueUseCase } from './DeleteLeagueUseCase';

class DeleteLeagueController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { leagueId } = request.params;

    const deleteLeagueUseCase = container.resolve(DeleteLeagueUseCase);

    await deleteLeagueUseCase.execute({ leagueId });

    return response.status(204).send();
  }
}

export { DeleteLeagueController };
