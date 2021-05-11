import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateLeagueController } from '../modules/leagues/useCases/createLeague/CreateLeagueController';
import { ListLeaguesController } from '../modules/leagues/useCases/listLeagues/ListLeaguesController';

const leaguesRoutes = Router();

const createLeagueController = new CreateLeagueController();
const listLeaguesController = new ListLeaguesController();

leaguesRoutes.use(ensureAuthenticated);
leaguesRoutes.post('/', createLeagueController.handle);
leaguesRoutes.get('/', listLeaguesController.handle);

export { leaguesRoutes };
