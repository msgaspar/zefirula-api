import { inject, injectable } from 'tsyringe';

import { IClubsRepository } from '@modules/clubs/repositories/IClubsRepository';
import { ICartolaProvider } from '@shared/container/providers/CartolaProvider/ICartolaProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  clubId: string;
}

@injectable()
class CreateClubUseCase {
  constructor(
    @inject('ClubsRepository')
    private clubsRepository: IClubsRepository,

    @inject('CartolaProvider')
    private cartolaProvider: ICartolaProvider,
  ) {}

  async execute({ clubId }: IRequest): Promise<void> {
    const clubAlreadyExists = await this.clubsRepository.findById(clubId);

    if (clubAlreadyExists) {
      throw new AppError('Club already registered');
    }

    const { name, cartoleiro, badgeImgUrl } = await this.cartolaProvider.getClubData(
      clubId,
    );

    await this.clubsRepository.create({
      id: clubId,
      name,
      cartoleiro,
      badgeImgUrl,
    });
  }
}

export { CreateClubUseCase };
