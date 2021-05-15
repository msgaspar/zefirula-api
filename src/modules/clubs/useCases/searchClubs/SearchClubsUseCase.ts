import { inject, injectable } from 'tsyringe';

import {
  ICartolaProvider,
  ICartolaSearchResult,
} from '@shared/container/providers/CartolaProvider/ICartolaProvider';

@injectable()
class SearchClubsUseCase {
  constructor(
    @inject('CartolaProvider')
    private cartolaProvider: ICartolaProvider,
  ) {}

  async execute(query: string): Promise<ICartolaSearchResult[]> {
    const clubs = await this.cartolaProvider.searchClubs(query);
    return clubs;
  }
}

export { SearchClubsUseCase };
