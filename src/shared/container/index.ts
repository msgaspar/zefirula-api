import { container } from 'tsyringe';

import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { ILeaguesRepository } from '../../modules/leagues/repositories/ILeaguesRepository';
import { LeaguesRepository } from '../../modules/leagues/repositories/implementations/LeaguesRepository';

container.registerSingleton<ILeaguesRepository>('LeaguesRepository', LeaguesRepository);

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
