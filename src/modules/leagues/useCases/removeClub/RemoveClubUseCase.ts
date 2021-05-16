import { inject, injectable } from 'tsyringe';

import { IClubsRepository } from '@modules/clubs/repositories/IClubsRepository';
import { ILeaguesRepository } from '@modules/leagues/repositories/ILeaguesRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  leagueId: string;
  clubId: string;
}

@injectable()
class RemoveClubUseCase {
  constructor(
    @inject('LeaguesRepository')
    private leaguesRepository: ILeaguesRepository,

    @inject('ClubsRepository')
    private clubsRepository: IClubsRepository,
  ) {}

  async execute({ leagueId, clubId }: IRequest): Promise<void> {
    const leagueExists = await this.leaguesRepository.findById(leagueId);

    if (!leagueExists) {
      throw new AppError('League not found');
    }

    const clubExists = await this.clubsRepository.findById(clubId);

    if (!clubExists) {
      throw new AppError('Club not found');
    }

    const clubRegistered = clubExists.leagues.find(league => league.id === leagueId);

    if (!clubRegistered) {
      throw new AppError('Club is not registered in this league');
    }

    if (clubExists.leagues.length <= 1) {
      await this.clubsRepository.delete(clubId);
    } else {
      clubExists.leagues = clubExists.leagues.filter(league => league.id !== leagueId);
      await this.clubsRepository.save(clubExists);
    }
  }
}

export { RemoveClubUseCase };
