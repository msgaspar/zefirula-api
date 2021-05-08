import { League } from '../model/League';

interface ICreateLeagueDTO {
  name: string;
}

interface ILeaguesRepository {
  findByName(name: string): League;
  list(): League[];
  create({ name }: ICreateLeagueDTO): void;
}

export { ILeaguesRepository, ICreateLeagueDTO };
