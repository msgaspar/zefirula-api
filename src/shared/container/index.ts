import { container } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { LeaguesRepository } from '@modules/leagues/infra/typeorm/repositories/LeaguesRepository';
import { ILeaguesRepository } from '@modules/leagues/repositories/ILeaguesRepository';

container.registerSingleton<ILeaguesRepository>('LeaguesRepository', LeaguesRepository);

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
