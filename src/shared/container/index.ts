import { container } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { LeaguesRepository } from '@modules/leagues/infra/typeorm/repositories/LeaguesRepository';
import { ILeaguesRepository } from '@modules/leagues/repositories/ILeaguesRepository';

import './providers';

container.registerSingleton<ILeaguesRepository>('LeaguesRepository', LeaguesRepository);

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);
