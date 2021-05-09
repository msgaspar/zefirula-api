import { Router } from 'express';

import { CreateLeagueController } from '../modules/leagues/useCases/createLeague/CreateLeagueController';
import { ListLeaguesController } from '../modules/leagues/useCases/listLeagues/ListLeaguesController';

const leaguesRoutes = Router();

const createLeagueController = new CreateLeagueController();
leaguesRoutes.post('/', createLeagueController.handle);

const listLeaguesController = new ListLeaguesController();
leaguesRoutes.get('/', listLeaguesController.handle);

export { leaguesRoutes };
