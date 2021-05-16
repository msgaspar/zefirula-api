import { getRepository, Repository } from 'typeorm';

import { ICreateClubDTO } from '@modules/clubs/dtos/ICreateClubDTO';
import { Club } from '@modules/clubs/infra/typeorm/entities/Club';
import { IClubsRepository } from '@modules/clubs/repositories/IClubsRepository';

class ClubsRepository implements IClubsRepository {
  private repository: Repository<Club>;

  constructor() {
    this.repository = getRepository(Club);
  }

  async create({
    id,
    name,
    cartoleiro,
    badgeImgUrl,
    leagues = [],
  }: ICreateClubDTO): Promise<Club> {
    const club = this.repository.create({ id, name, cartoleiro, badgeImgUrl, leagues });
    return this.repository.save(club);
  }

  async findById(id: string): Promise<Club> {
    const club = await this.repository.findOne(id, { relations: ['leagues'] });
    return club;
  }

  async save(club: Club): Promise<void> {
    await this.repository.save(club);
  }
}

export { ClubsRepository };
