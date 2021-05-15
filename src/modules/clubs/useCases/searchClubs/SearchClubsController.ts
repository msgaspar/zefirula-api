import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SearchClubsUseCase } from './SearchClubsUseCase';

class SearchClubsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const q = request.query.q as string;

    const searchClubsUseCase = container.resolve(SearchClubsUseCase);

    const clubs = await searchClubsUseCase.execute(q);

    return response.json(clubs);
  }
}

export { SearchClubsController };
