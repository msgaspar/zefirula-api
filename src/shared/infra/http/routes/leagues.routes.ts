import { Router } from 'express';

import { CreateLeagueController } from '@modules/leagues/useCases/createLeague/CreateLeagueController';
import { ListLeaguesController } from '@modules/leagues/useCases/listLeagues/ListLeaguesController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { ensureAdmin } from '../middlewares/ensureAdmin';

const leaguesRoutes = Router();

const createLeagueController = new CreateLeagueController();
const listLeaguesController = new ListLeaguesController();

leaguesRoutes.use(ensureAuthenticated, ensureAdmin);
leaguesRoutes.post('/', createLeagueController.handle);
leaguesRoutes.get('/', listLeaguesController.handle);

export { leaguesRoutes };
