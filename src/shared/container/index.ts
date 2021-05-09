import { container } from 'tsyringe';

import { ILeaguesRepository } from '../../modules/leagues/repositories/ILeaguesRepository';
import { LeaguesRepository } from '../../modules/leagues/repositories/implementations/LeaguesRepository';

container.registerSingleton<ILeaguesRepository>('LeaguesRepository', LeaguesRepository);
