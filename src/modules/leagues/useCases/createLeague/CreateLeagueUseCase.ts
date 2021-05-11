import { inject, injectable } from 'tsyringe';

import { ILeaguesRepository } from '@modules/leagues/repositories/ILeaguesRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
}

@injectable()
class CreateLeagueUseCase {
  constructor(
    @inject('LeaguesRepository')
    private leaguesRepository: ILeaguesRepository,
  ) {}

  async execute({ name }: IRequest): Promise<void> {
    const leagueAlreadyExists = await this.leaguesRepository.findByName(name);

    if (leagueAlreadyExists) {
      throw new AppError('League already exists');
    }

    this.leaguesRepository.create({ name });
  }
}

export { CreateLeagueUseCase };
