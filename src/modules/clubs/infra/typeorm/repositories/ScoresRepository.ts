import { getRepository, Repository } from 'typeorm';

import { ICreateScoreDTO } from '@modules/clubs/dtos/ICreateScoreDTO';
import { IScoresRepository } from '@modules/clubs/repositories/IScoresRepository';

import { Score } from '../entities/Score';

class ScoresRepository implements IScoresRepository {
  private repository: Repository<Score>;

  constructor() {
    this.repository = getRepository(Score);
  }

  async findByClubId(clubId: string): Promise<Score[]> {
    return this.repository.find({ club_id: clubId });
  }

  async create({ clubId, round, score, captainScore }: ICreateScoreDTO): Promise<void> {
    const newScore = this.repository.create({
      club_id: clubId,
      round,
      score,
      captain_score: captainScore,
    });
    await this.repository.save(newScore);
  }
}

export { ScoresRepository };
