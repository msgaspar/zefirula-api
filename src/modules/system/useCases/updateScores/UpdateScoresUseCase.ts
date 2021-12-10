import { container, inject, injectable } from 'tsyringe';

import { IStatusParamsRepository } from '@modules/system/repositories/IStatusParamsRepository';
import { ICartolaProvider } from '@shared/container/providers/CartolaProvider/ICartolaProvider';
import { SyncClubScores } from '@utils/SyncClubScores';

@injectable()
class UpdateScoresUseCase {
  constructor(
    @inject('CartolaProvider')
    private cartolaProvider: ICartolaProvider,

    @inject('StatusParamsRepository')
    private statusParamsRepository: IStatusParamsRepository,
  ) {}

  async execute(): Promise<void> {
    // const currentRound = await this.cartolaProvider.getCurrentRound();
    // const systemCurrentRound = Number(
    //   await this.statusParamsRepository.getParam('currentRound'),
    // );
    // const marketStatus = await this.cartolaProvider.getMarketStatus();

    // if (currentRound !== systemCurrentRound) {
    const syncClubScores = container.resolve(SyncClubScores);
    await syncClubScores.syncAll();
    // await this.statusParamsRepository.setParam('currentRound', currentRound.toString());
    // }
  }
}

export { UpdateScoresUseCase };
