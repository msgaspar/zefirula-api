import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { leaguesRoutes } from './leagues.routes';

const router = Router();

router.use('/leagues', leaguesRoutes);
router.use(authenticateRoutes);

export { router };
