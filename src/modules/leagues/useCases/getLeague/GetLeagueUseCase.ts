import { inject, injectable } from 'tsyringe';

import { League } from '@modules/leagues/infra/typeorm/entities/League';
import { ILeaguesRepository } from '@modules/leagues/repositories/ILeaguesRepository';

@injectable()
class GetLeagueUseCase {
  constructor(
    @inject('LeaguesRepository')
    private leaguesRepository: ILeaguesRepository,
  ) {}

  async execute(id: string): Promise<League> {
    return this.leaguesRepository.findById(id);
  }
}

export { GetLeagueUseCase };
