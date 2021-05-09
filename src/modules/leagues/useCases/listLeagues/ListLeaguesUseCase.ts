import { inject, injectable } from 'tsyringe';

import { League } from '../../entities/League';
import { ILeaguesRepository } from '../../repositories/ILeaguesRepository';

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
