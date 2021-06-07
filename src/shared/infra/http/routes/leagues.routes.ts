import { Router } from 'express';

import { CreateLeagueController } from '@modules/leagues/useCases/createLeague/CreateLeagueController';
import { DeleteLeagueController } from '@modules/leagues/useCases/deleteLeague/DeleteLeagueController';
import { GetLeagueController } from '@modules/leagues/useCases/getLeague/GetLeagueController';
import { ListLeaguesController } from '@modules/leagues/useCases/listLeagues/ListLeaguesController';
import { RegisterClubController } from '@modules/leagues/useCases/registerClub/RegisterClubController';
import { RemoveClubController } from '@modules/leagues/useCases/removeClub/RemoveClubController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { ensureAdmin } from '../middlewares/ensureAdmin';

const leaguesRoutes = Router();

const createLeagueController = new CreateLeagueController();
const listLeaguesController = new ListLeaguesController();
const registerClubController = new RegisterClubController();
const removeClubController = new RemoveClubController();
const getLeagueController = new GetLeagueController();
const deleteLeagueController = new DeleteLeagueController();

leaguesRoutes.use(ensureAuthenticated, ensureAdmin);
leaguesRoutes.post('/', createLeagueController.handle);
leaguesRoutes.get('/', listLeaguesController.handle);
leaguesRoutes.post('/:leagueId', registerClubController.handle);
leaguesRoutes.delete('/:leagueId/:clubId', removeClubController.handle);
leaguesRoutes.get('/:leagueId/', getLeagueController.handle);
leaguesRoutes.get('/:leagueId/:round', getLeagueController.handle);
leaguesRoutes.delete('/:leagueId', deleteLeagueController.handle);

export { leaguesRoutes };
