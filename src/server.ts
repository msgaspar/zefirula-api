import express from 'express';

import { groupsRoutes } from './routes/groups.routes';

const app = express();

app.use(express.json());

app.use('/groups', groupsRoutes);

app.listen(3333, () => console.log('Server is running...'));
