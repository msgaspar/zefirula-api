import { ILeaguesRepository } from '../../repositories/ILeaguesRepository';

interface IRequest {
  name: string;
}

class CreateLeagueUseCase {
  constructor(private leaguesRepository: ILeaguesRepository) {}

  execute({ name }: IRequest): void {
    const leagueAlreadyExists = this.leaguesRepository.findByName(name);

    if (leagueAlreadyExists) {
      throw new Error('League already exists');
    }

    this.leaguesRepository.create({ name });
  }
}

export { CreateLeagueUseCase };
