import { container, inject, injectable } from 'tsyringe';

import { IScoresRepository } from '@modules/clubs/repositories/IScoresRepository';
import { SyncClubScores } from '@utils/SyncClubScores';

@injectable()
class ResetAllScoresUseCase {
  constructor(
    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,
  ) {}

  async execute(): Promise<void> {
    await this.scoresRepository.deleteAll();
    console.log('erased');

    const syncClubScores = container.resolve(SyncClubScores);
    await syncClubScores.syncAll();
  }
}

export { ResetAllScoresUseCase };
