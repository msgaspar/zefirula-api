import { Router } from 'express';

import { createLeagueController } from '../modules/leagues/useCases/createLeague';
import { listLeaguesController } from '../modules/leagues/useCases/listLeagues';

const leaguesRoutes = Router();

leaguesRoutes.post('/', (request, response) => {
  return createLeagueController.handle(request, response);
});

leaguesRoutes.get('/', (request, response) => {
  return listLeaguesController.handle(request, response);
});

export { leaguesRoutes };
