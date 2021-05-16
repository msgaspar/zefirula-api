import { League } from '@modules/leagues/infra/typeorm/entities/League';

interface ICreateLeagueDTO {
  name: string;
}

interface ILeagueListItem {
  id: string;
  name: string;
  clubs_count: number;
}

interface ILeaguesRepository {
  findByName(name: string): Promise<League>;
  findById(id: string): Promise<League>;
  listAll(): Promise<ILeagueListItem[]>;
  create({ name }: ICreateLeagueDTO): Promise<void>;
}

export { ILeaguesRepository, ICreateLeagueDTO, ILeagueListItem };
