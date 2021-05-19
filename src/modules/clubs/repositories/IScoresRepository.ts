import { ICreateScoreDTO } from '../dtos/ICreateScoreDTO';
import { Score } from '../infra/typeorm/entities/Score';

interface IScoresRepository {
  findByClubId(clubId: string): Promise<Score[]>;
  create(data: ICreateScoreDTO): Promise<void>;
  get(clubId: string, round: number): Promise<Score>;
}

export { IScoresRepository };
