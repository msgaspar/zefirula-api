import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ILeaguesRepository } from '../../repositories/ILeaguesRepository';

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
