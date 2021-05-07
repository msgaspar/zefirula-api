import { Router } from 'express';

import { createGroupController } from '../modules/groups/useCases/createGroup';
import { listGroupsController } from '../modules/groups/useCases/listGroups';

const groupsRoutes = Router();

groupsRoutes.post('/', (request, response) => {
  return createGroupController.handle(request, response);
});

groupsRoutes.get('/', (request, response) => {
  return listGroupsController.handle(request, response);
});

export { groupsRoutes };
