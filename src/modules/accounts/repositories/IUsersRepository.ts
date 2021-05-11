import { User } from '@modules/accounts/infra/typeorm/entities/User';

interface IUsersRepository {
  findByUsername(username: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };
