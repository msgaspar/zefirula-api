import { Router } from 'express';

import { leaguesRoutes } from './leagues.routes';

const router = Router();

router.use('/leagues', leaguesRoutes);

export { router };
