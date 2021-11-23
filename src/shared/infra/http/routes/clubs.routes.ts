import { Router } from 'express';

import { CreateClubController } from '@modules/clubs/useCases/createClub/CreateClubController';
import { SearchClubsController } from '@modules/clubs/useCases/searchClubs/SearchClubsController';
import { ResetAllScoresController } from '@modules/system/useCases/resetAllScores/ResetAllScoresController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { updateScores } from '../middlewares/updateScores';

const clubsRoutes = Router();

const createClubController = new CreateClubController();
const searchClubsController = new SearchClubsController();
const resetAllScoresController = new ResetAllScoresController();

clubsRoutes.use(ensureAuthenticated, ensureAdmin);
clubsRoutes.post('/', createClubController.handle);
clubsRoutes.get('/search', updateScores, searchClubsController.handle);
clubsRoutes.delete('/scores', resetAllScoresController.handle);

export { clubsRoutes };
