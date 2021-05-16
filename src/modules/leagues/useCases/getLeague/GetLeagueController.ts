import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetLeagueUseCase } from './GetLeagueUseCase';

class GetLeagueController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { leagueId } = request.params;

    const getLeagueUseCase = container.resolve(GetLeagueUseCase);

    const league = await getLeagueUseCase.execute(leagueId);

    return response.json(league);
  }
}

export { GetLeagueController };
