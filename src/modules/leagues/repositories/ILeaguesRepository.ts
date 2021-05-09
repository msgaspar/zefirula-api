import { League } from '../entities/League';

interface ICreateLeagueDTO {
  name: string;
}

interface ILeaguesRepository {
  findByName(name: string): Promise<League>;
  list(): Promise<League[]>;
  create({ name }: ICreateLeagueDTO): Promise<void>;
}

export { ILeaguesRepository, ICreateLeagueDTO };
