import { inject, injectable } from 'tsyringe';

import { IClubsRepository } from '@modules/clubs/repositories/IClubsRepository';
import { ILeaguesRepository } from '@modules/leagues/repositories/ILeaguesRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  leagueId: string;
}

@injectable()
class DeleteLeagueUseCase {
  constructor(
    @inject('LeaguesRepository')
    private leaguesRepository: ILeaguesRepository,

    @inject('ClubsRepository')
    private clubsRepository: IClubsRepository,
  ) {}

  async execute({ leagueId }: IRequest): Promise<void> {
    const leagueExists = await this.leaguesRepository.findById(leagueId);

    if (!leagueExists) {
      throw new AppError('League not found');
    }

    leagueExists.clubs.forEach(async ({ id }) => {
      const club = await this.clubsRepository.findById(id);
      if (club.leagues.length <= 1) {
        await this.clubsRepository.delete(id);
      }
    });

    await this.leaguesRepository.delete(leagueId);
  }
}

export { DeleteLeagueUseCase };
