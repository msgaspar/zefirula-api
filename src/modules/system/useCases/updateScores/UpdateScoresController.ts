import { container } from 'tsyringe';

import { UpdateScoresUseCase } from './UpdateScoresUseCase';

class UpdateScoresController {
  async handle(): Promise<void> {
    const updateScoresUseCase = container.resolve(UpdateScoresUseCase);
    await updateScoresUseCase.execute();
  }
}

export { UpdateScoresController };
