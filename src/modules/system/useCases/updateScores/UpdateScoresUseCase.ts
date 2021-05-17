import { inject, injectable } from 'tsyringe';

import { IStatusParamsRepository } from '@modules/system/repositories/IStatusParamsRepository';
import { ICartolaProvider } from '@shared/container/providers/CartolaProvider/ICartolaProvider';

@injectable()
class UpdateScoresUseCase {
  constructor(
    @inject('CartolaProvider')
    private cartolaProvider: ICartolaProvider,

    @inject('StatusParamsRepository')
    private statusParamsRepository: IStatusParamsRepository,
  ) {}

  async execute(): Promise<void> {
    const currentRound = await this.cartolaProvider.getCurrentRound();
    const systemCurrentRound = Number(
      await this.statusParamsRepository.getParam('currentRound'),
    );

    if (currentRound !== systemCurrentRound) {
      console.log('System needs update.');
    } else {
      console.log('System is up to date.');
    }
  }
}

export { UpdateScoresUseCase };
