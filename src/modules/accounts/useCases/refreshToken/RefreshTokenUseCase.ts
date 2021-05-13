import { verify, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  username: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<string> {
    const { username, sub: userId } = verify(
      token,
      auth.refresh_token_secret,
    ) as IPayload;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      userId,
      token,
    );

    if (!userToken) {
      throw new AppError('Refresh Token does not exist');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ username }, auth.refresh_token_secret, {
      subject: userId,
      expiresIn: auth.refresh_token_expiration,
    });

    const refresh_token_expiration_date = this.dateProvider.addDays(
      auth.refresh_token_expiration_days,
    );

    await this.usersTokensRepository.create({
      expiration_date: refresh_token_expiration_date,
      refresh_token,
      user_id: userId,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
