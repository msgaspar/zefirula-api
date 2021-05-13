import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    username: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ username, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByUsername(username);
    const {
      jwt_secret,
      refresh_token_secret,
      token_expiration_time,
      refresh_token_expiration,
      refresh_token_expiration_days,
    } = auth;

    if (!user) {
      throw new AppError('Invalid username or password', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Invalid username or password', 403);
    }

    const token = sign({}, jwt_secret, {
      subject: user.id,
      expiresIn: token_expiration_time,
    });

    const refresh_token = sign(
      {
        username,
      },
      refresh_token_secret,
      {
        subject: user.id,
        expiresIn: refresh_token_expiration,
      },
    );

    const expiration_date = this.dateProvider.addDays(refresh_token_expiration_days);

    await this.usersTokensRepository.create({
      expiration_date,
      refresh_token,
      user_id: user.id,
    });

    return {
      user: {
        name: user.name,
        username: user.username,
      },
      token,
      refresh_token,
    };
  }
}

export { AuthenticateUserUseCase };
