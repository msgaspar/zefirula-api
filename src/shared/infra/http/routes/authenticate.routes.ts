import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { GetUserCredentialsController } from '@modules/accounts/useCases/getUserCredentials/GetUserCredentialsController';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const getUserCredentialsController = new GetUserCredentialsController();

authenticateRoutes.post('/sessions', authenticateUserController.handle);
authenticateRoutes.post('/refresh-token', refreshTokenController.handle);
authenticateRoutes.get(
  '/me',
  ensureAuthenticated,
  ensureAdmin,
  getUserCredentialsController.handle,
);

export { authenticateRoutes };
