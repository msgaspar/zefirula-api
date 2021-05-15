import { Router } from 'express';

import { CreateClubController } from '@modules/clubs/useCases/createClub/CreateClubController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const clubsRoutes = Router();

const createClubController = new CreateClubController();

clubsRoutes.use(ensureAuthenticated, ensureAdmin);
clubsRoutes.post('/', createClubController.handle);

export { clubsRoutes };
