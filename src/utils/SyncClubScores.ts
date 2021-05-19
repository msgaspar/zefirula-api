/* eslint-disable no-await-in-loop */
import { inject, injectable } from 'tsyringe';

import { IClubsRepository } from '@modules/clubs/repositories/IClubsRepository';
import { IScoresRepository } from '@modules/clubs/repositories/IScoresRepository';
import { ICartolaProvider } from '@shared/container/providers/CartolaProvider/ICartolaProvider';

@injectable()
export class SyncClubScores {
  constructor(
    @inject('CartolaProvider')
    private cartolaProvider: ICartolaProvider,

    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,

    @inject('ClubsRepository')
    private clubsRepository: IClubsRepository,
  ) {}

  async sync(clubId: string): Promise<void> {
    const currentRound = await this.cartolaProvider.getCurrentRound();
    const clubScores = await this.scoresRepository.findByClubId(clubId);

    for (let round = 1; round < currentRound; round += 1) {
      if (!clubScores.find(scoreItem => scoreItem.round === round)) {
        const { score, captainScore } = await this.cartolaProvider.getScore(
          clubId,
          round,
        );
        await this.scoresRepository.create({ clubId, round, score, captainScore });
      }
    }
  }

  async syncAll(): Promise<void> {
    const currentRound = await this.cartolaProvider.getCurrentRound();
    const clubIds = await this.clubsRepository.getAllClubIds();

    clubIds.forEach(async clubId => {
      const clubScores = await this.scoresRepository.findByClubId(clubId);

      for (let round = 1; round <= currentRound; round += 1) {
        if (!clubScores.find(scoreItem => scoreItem.round === round)) {
          const { score, captainScore } = await this.cartolaProvider.getScore(
            clubId,
            round,
          );
          await this.scoresRepository.create({ clubId, round, score, captainScore });
        }
      }
    });
  }
}
