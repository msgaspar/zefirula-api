import { Router } from 'express';

import { GroupsRepository } from '../modules/groups/repositories/GroupsRepository';
import { CreateGroupsService } from '../modules/groups/services/CreateGroupsService';

const groupsRoutes = Router();
const groupsRepository = new GroupsRepository();

groupsRoutes.post('/', (request, response) => {
  const { name } = request.body;

  const createGroupsService = new CreateGroupsService(groupsRepository);
  createGroupsService.execute({ name });

  return response.status(200).send();
});

groupsRoutes.get('/', (request, response) => {
  const all = groupsRepository.list();
  return response.json(all);
});

export { groupsRoutes };
