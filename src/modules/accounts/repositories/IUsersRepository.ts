import { User } from '../entities/User';

interface IUsersRepository {
  findByUsername(username: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };
