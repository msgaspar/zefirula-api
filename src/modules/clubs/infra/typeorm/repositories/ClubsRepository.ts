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

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async getAllClubIds(): Promise<string[]> {
    const result = await this.repository.query('select id from clubs');
    return result.map(item => item.id);
  }
}

export { ClubsRepository };
