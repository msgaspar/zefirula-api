import { inject, injectable } from 'tsyringe';

import { Club } from '@modules/clubs/infra/typeorm/entities/Club';
import { IScoresRepository } from '@modules/clubs/repositories/IScoresRepository';
import { League } from '@modules/leagues/infra/typeorm/entities/League';
import { ILeaguesRepository } from '@modules/leagues/repositories/ILeaguesRepository';
import { IStatusParamsRepository } from '@modules/system/repositories/IStatusParamsRepository';
import { AppError } from '@shared/errors/AppError';

interface IClubLeagueResponse extends Club {
  score?: number;
  captain_score?: number;
}

interface ILeagueResponse extends League {
  round?: number;
  clubs: IClubLeagueResponse[];
}

@injectable()
class GetLeagueUseCase {
  constructor(
    @inject('LeaguesRepository')
    private leaguesRepository: ILeaguesRepository,

    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,

    @inject('StatusParamsRepository')
    private statusParamsRepository: IStatusParamsRepository,
  ) {}

  async execute(id: string, round?: number): Promise<ILeagueResponse> {
    const league = await this.leaguesRepository.findById(id);

    if (!league) {
      throw new AppError('League not found', 404);
    }

    let lastRound: number;
    if (!round) {
      lastRound = Number(await this.statusParamsRepository.getParam('currentRound')) - 1;
    }

    const response = {
      name: league.name,
      id: league.id,
      created_at: league.created_at,
      round: round || lastRound,
      clubs: [],
    };

    response.clubs = league.clubs.map(async club => {
      let [score, captain_score] = [0, 0];
      const clubScore = await this.scoresRepository.get(club.id, round || lastRound);

      if (clubScore) {
        [score, captain_score] = [clubScore.score, clubScore.captain_score];
      }

      return {
        id: club.id,
        name: club.name,
        cartoleiro: club.cartoleiro,
        badgeImgUrl: club.badgeImgUrl,
        score: Math.round(Number(score) * 100) / 100,
        captain_score: Math.round(Number(captain_score) * 100) / 100,
      };
    });

    response.clubs = await Promise.all(response.clubs);
    return response;
  }
}

export { GetLeagueUseCase };
