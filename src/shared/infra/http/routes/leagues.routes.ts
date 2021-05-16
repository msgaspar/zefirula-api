import { Router } from 'express';

import { CreateLeagueController } from '@modules/leagues/useCases/createLeague/CreateLeagueController';
import { ListLeaguesController } from '@modules/leagues/useCases/listLeagues/ListLeaguesController';
import { RegisterClubController } from '@modules/leagues/useCases/registerClub/RegisterClubController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { ensureAdmin } from '../middlewares/ensureAdmin';

const leaguesRoutes = Router();

const createLeagueController = new CreateLeagueController();
const listLeaguesController = new ListLeaguesController();
const registerClubController = new RegisterClubController();

leaguesRoutes.use(ensureAuthenticated, ensureAdmin);
leaguesRoutes.post('/', createLeagueController.handle);
leaguesRoutes.get('/', listLeaguesController.handle);
leaguesRoutes.post('/:leagueId', registerClubController.handle);

export { leaguesRoutes };
