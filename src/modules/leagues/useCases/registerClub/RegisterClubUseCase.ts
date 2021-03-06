import { container, inject, injectable } from 'tsyringe';

import { IClubsRepository } from '@modules/clubs/repositories/IClubsRepository';
import { ILeaguesRepository } from '@modules/leagues/repositories/ILeaguesRepository';
import { ICartolaProvider } from '@shared/container/providers/CartolaProvider/ICartolaProvider';
import { AppError } from '@shared/errors/AppError';
import { SyncClubScores } from '@utils/SyncClubScores';

interface IRequest {
  leagueId: string;
  clubId: string;
}

@injectable()
class RegisterClubUseCase {
  constructor(
    @inject('ClubsRepository')
    private clubsRepository: IClubsRepository,

    @inject('LeaguesRepository')
    private leaguesRepository: ILeaguesRepository,

    @inject('CartolaProvider')
    private cartolaProvider: ICartolaProvider,
  ) {}

  async execute({ leagueId, clubId }: IRequest): Promise<void> {
    const league = await this.leaguesRepository.findById(leagueId);

    if (!league) {
      throw new AppError('League not found');
    }

    let club = await this.clubsRepository.findById(clubId);

    if (club?.leagues.some(l => l.id === league.id)) {
      throw new AppError('Club is already registered in this league');
    }

    if (!club) {
      const { name, cartoleiro, badgeImgUrl } = await this.cartolaProvider.getClubData(
        clubId,
      );

      club = await this.clubsRepository.create({
        id: clubId,
        name,
        cartoleiro,
        badgeImgUrl,
      });

      const syncClubScores = container.resolve(SyncClubScores);
      await syncClubScores.sync(clubId);
    }

    club.leagues.push(league);

    await this.clubsRepository.save(club);
  }
}

export { RegisterClubUseCase };
