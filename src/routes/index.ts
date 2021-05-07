import { Router } from 'express';

import { groupsRoutes } from './groups.routes';

const router = Router();

router.use('/groups', groupsRoutes);

export { router };
