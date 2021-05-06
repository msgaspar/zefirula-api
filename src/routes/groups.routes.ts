import { Router } from 'express';

const groupsRoutes = Router();

const groups = [];

groupsRoutes.post('/groups', (request, response) => {
  const { name } = request.body;

  groups.push(name);

  return response.status(201).send();
});

export { groupsRoutes };
