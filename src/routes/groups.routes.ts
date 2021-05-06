import { Router } from 'express';

import { GroupsRepository } from '../repositories/GroupsRepository';

const groupsRoutes = Router();
const groupsRepository = new GroupsRepository();

groupsRoutes.post('/', (request, response) => {
  const { name } = request.body;

  const group = groupsRepository.create({ name });

  return response.status(201).json({ group });
});

groupsRoutes.get('/', (request, response) => {
  const all = groupsRepository.list();
  return response.json(all);
});

export { groupsRoutes };
