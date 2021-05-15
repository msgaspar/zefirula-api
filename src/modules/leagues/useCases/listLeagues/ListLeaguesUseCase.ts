import { inject, injectable } from 'tsyringe';

import { League } from '@modules/leagues/infra/typeorm/entities/League';
import { ILeaguesRepository } from '@modules/leagues/repositories/ILeaguesRepository';

@injectable()
class ListLeaguesUseCase {
  constructor(
    @inject('LeaguesRepository')
    private leaguesRepository: ILeaguesRepository,
  ) {}

  async execute(): Promise<League[]> {
    return this.leaguesRepository.list();
  }
}

export { ListLeaguesUseCase };
