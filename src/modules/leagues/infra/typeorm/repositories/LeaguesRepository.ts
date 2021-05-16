import { getRepository, Repository } from 'typeorm';

import { League } from '@modules/leagues/infra/typeorm/entities/League';
import {
  ILeagueListItem,
  ILeaguesRepository,
} from '@modules/leagues/repositories/ILeaguesRepository';

interface ICreateLeagueDTO {
  name: string;
}

class LeaguesRepository implements ILeaguesRepository {
  private repository: Repository<League>;

  constructor() {
    this.repository = getRepository(League);
  }

  async create({ name }: ICreateLeagueDTO): Promise<void> {
    const clubs = [];
    const league = this.repository.create({ name, clubs });

    await this.repository.save(league);
  }

  async listAll(): Promise<ILeagueListItem[]> {
    const list = await this.repository.query(
      'SELECT leagues.id, leagues.name, count(leagues_clubs.league_id) AS clubs_count FROM leagues LEFT JOIN leagues_clubs ON (leagues.id = leagues_clubs.league_id) GROUP BY leagues.id',
    );
    return list;
  }

  async findByName(name: string): Promise<League> {
    const league = await this.repository.findOne({ name });
    return league;
  }

  async findById(id: string): Promise<League> {
    const league = await this.repository.findOne(id, { relations: ['clubs'] });
    return league;
  }
}

export { LeaguesRepository };
