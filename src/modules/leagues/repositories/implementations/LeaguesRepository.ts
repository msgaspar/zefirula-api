import { League } from '../../model/League';
import { ILeaguesRepository } from '../ILeaguesRepository';

interface ICreateCategoryDTO {
  name: string;
}

class LeaguesRepository implements ILeaguesRepository {
  private leagues: League[];

  private static INSTANCE: LeaguesRepository;

  private constructor() {
    this.leagues = [];
  }

  public static getInstance(): LeaguesRepository {
    if (!LeaguesRepository.INSTANCE) {
      LeaguesRepository.INSTANCE = new LeaguesRepository();
    }
    return LeaguesRepository.INSTANCE;
  }

  create({ name }: ICreateCategoryDTO): League {
    const league = new League(name);

    this.leagues.push(league);

    return league;
  }

  list(): League[] {
    return this.leagues;
  }

  findByName(name: string): League {
    const league = this.leagues.find(league => league.name === name);
    return league;
  }
}

export { LeaguesRepository };
