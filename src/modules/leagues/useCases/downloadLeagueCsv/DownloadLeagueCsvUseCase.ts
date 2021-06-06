import { Parser } from 'json2csv';
import { inject, injectable } from 'tsyringe';

import { IScoresRepository } from '@modules/clubs/repositories/IScoresRepository';
import { ILeaguesRepository } from '@modules/leagues/repositories/ILeaguesRepository';
import { IStatusParamsRepository } from '@modules/system/repositories/IStatusParamsRepository';
import { AppError } from '@shared/errors/AppError';

interface IDownloadCsvResponse {
  csv: string;
  fileName: string;
}

@injectable()
class DownloadLeagueCsvUseCase {
  constructor(
    @inject('LeaguesRepository')
    private leaguesRepository: ILeaguesRepository,

    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,

    @inject('StatusParamsRepository')
    private statusParamsRepository: IStatusParamsRepository,
  ) {}

  async execute(leagueId: string, round: number): Promise<IDownloadCsvResponse> {
    const league = await this.leaguesRepository.findById(leagueId);

    if (!league) {
      throw new AppError('League not found', 404);
    }

    const lastRound =
      Number(await this.statusParamsRepository.getParam('currentRound')) - 1;

    if (round > lastRound || round < 1) {
      throw new AppError('Invalid round');
    }

    const clubScores = league.clubs.map(async club => {
      const { score, captain_score } = await this.scoresRepository.get(club.id, round);

      return {
        id: club.id,
        name: club.name,
        cartoleiro: club.cartoleiro,
        score: (Math.round(Number(score) * 100) / 100).toLocaleString('pt-br'),
        scoreWithoutCaptain: (
          Math.round((Number(score) - Number(captain_score)) * 100) / 100
        ).toLocaleString('pt-br'),
      };
    });

    const data = await Promise.all(clubScores);

    const parser = new Parser({
      fields: [
        {
          label: 'ID',
          value: 'id',
        },
        {
          label: 'Equipe',
          value: 'name',
        },
        {
          label: 'Cartoleiro',
          value: 'cartoleiro',
        },
        {
          label: 'Pontos',
          value: 'score',
        },
        {
          label: 'Pontos sem capitão',
          value: 'scoreWithoutCaptain',
        },
      ],
    });

    const csv = parser.parse(data);
    const fileName = `${league.name.replace(/\s/g, '')}-rodada${round}`;

    return { csv, fileName };
  }
}

export { DownloadLeagueCsvUseCase };
