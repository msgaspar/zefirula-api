import { getRepository, Repository } from 'typeorm';

import { ICreateClubDTO } from '@modules/clubs/dtos/ICreateClubDTO';
import { Club } from '@modules/clubs/infra/typeorm/entities/Club';
import { IClubsRepository } from '@modules/clubs/repositories/IClubsRepository';

class ClubsRepository implements IClubsRepository {
  private repository: Repository<Club>;

  constructor() {
    this.repository = getRepository(Club);
  }

  async create({ id, name, cartoleiro, badgeImgUrl }: ICreateClubDTO): Promise<void> {
    const club = this.repository.create({ id, name, cartoleiro, badgeImgUrl });
    await this.repository.save(club);
  }

  async findById(id: string): Promise<Club> {
    const club = await this.repository.findOne(id);
    return club;
  }
}

export { ClubsRepository };
