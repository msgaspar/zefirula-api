import { container } from 'tsyringe';

import './providers';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { ClubsRepository } from '@modules/clubs/infra/typeorm/repositories/ClubsRepository';
import { ScoresRepository } from '@modules/clubs/infra/typeorm/repositories/ScoresRepository';
import { IClubsRepository } from '@modules/clubs/repositories/IClubsRepository';
import { IScoresRepository } from '@modules/clubs/repositories/IScoresRepository';
import { LeaguesRepository } from '@modules/leagues/infra/typeorm/repositories/LeaguesRepository';
import { ILeaguesRepository } from '@modules/leagues/repositories/ILeaguesRepository';
import { StatusParamsRepository } from '@modules/system/infra/typeorm/repositories/StatusParamsRepository';
import { IStatusParamsRepository } from '@modules/system/repositories/IStatusParamsRepository';

container.registerSingleton<ILeaguesRepository>('LeaguesRepository', LeaguesRepository);

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);

container.registerSingleton<IClubsRepository>('ClubsRepository', ClubsRepository);

container.registerSingleton<IStatusParamsRepository>(
  'StatusParamsRepository',
  StatusParamsRepository,
);

container.registerSingleton<IScoresRepository>('ScoresRepository', ScoresRepository);
