import { inject, injectable } from 'tsyringe';

import {
  ILeagueListItem,
  ILeaguesRepository,
} from '@modules/leagues/repositories/ILeaguesRepository';

@injectable()
class ListLeaguesUseCase {
  constructor(
    @inject('LeaguesRepository')
    private leaguesRepository: ILeaguesRepository,
  ) {}

  async execute(): Promise<ILeagueListItem[]> {
    return this.leaguesRepository.listAll();
  }
}

export { ListLeaguesUseCase };
