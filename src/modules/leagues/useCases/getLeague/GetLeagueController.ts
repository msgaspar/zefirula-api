import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetLeagueUseCase } from './GetLeagueUseCase';

class GetLeagueController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { leagueId, round } = request.params;

    const getLeagueUseCase = container.resolve(GetLeagueUseCase);

    const league = await getLeagueUseCase.execute(leagueId, Number(round));

    return response.json(league);
  }
}

export { GetLeagueController };
