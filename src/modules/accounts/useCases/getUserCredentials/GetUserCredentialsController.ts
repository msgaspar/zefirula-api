import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetUserCredentialsUseCase } from './GetUserCredentialsUseCase';

class GetUserCredentialsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const getUserCredentialsUseCase = container.resolve(GetUserCredentialsUseCase);

    const { name, username } = await getUserCredentialsUseCase.execute(userId);

    return response.json({
      name,
      username,
    });
  }
}

export { GetUserCredentialsController };
