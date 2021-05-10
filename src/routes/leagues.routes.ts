import { Router } from 'express';

import { CreateLeagueController } from '../modules/leagues/useCases/createLeague/CreateLeagueController';
import { ListLeaguesController } from '../modules/leagues/useCases/listLeagues/ListLeaguesController';

const leaguesRoutes = Router();

const createLeagueController = new CreateLeagueController();
const listLeaguesController = new ListLeaguesController();

leaguesRoutes.post('/', createLeagueController.handle);
leaguesRoutes.get('/', listLeaguesController.handle);

export { leaguesRoutes };
