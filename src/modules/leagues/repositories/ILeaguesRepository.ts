import { League } from '@modules/leagues/infra/typeorm/entities/League';

interface ICreateLeagueDTO {
  name: string;
}

interface ILeaguesRepository {
  findByName(name: string): Promise<League>;
  list(): Promise<League[]>;
  create({ name }: ICreateLeagueDTO): Promise<void>;
}

export { ILeaguesRepository, ICreateLeagueDTO };
