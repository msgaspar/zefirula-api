import { League } from '../../model/League';
import { ILeaguesRepository } from '../../repositories/ILeaguesRepository';

class ListLeaguesUseCase {
  constructor(private leaguesRepository: ILeaguesRepository) {}

  execute(): League[] {
    return this.leaguesRepository.list();
  }
}

export { ListLeaguesUseCase };