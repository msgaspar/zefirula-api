import { getRepository, Repository } from 'typeorm';

import { League } from '../../entities/League';
import { ILeaguesRepository } from '../ILeaguesRepository';

interface ICreateCategoryDTO {
  name: string;
}

class LeaguesRepository implements ILeaguesRepository {
  private repository: Repository<League>;

  constructor() {
    this.repository = getRepository(League);
  }

  async create({ name }: ICreateCategoryDTO): Promise<void> {
    const league = this.repository.create({ name });

    await this.repository.save(league);
  }

  async list(): Promise<League[]> {
    const leagues = await this.repository.find();
    return leagues;
  }

  async findByName(name: string): Promise<League> {
    const league = this.repository.findOne({ name });
    return league;
  }
}

export { LeaguesRepository };
