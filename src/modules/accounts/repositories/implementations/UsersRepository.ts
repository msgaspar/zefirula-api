import { getRepository, Repository } from 'typeorm';

import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findByUsername(username: string): Promise<User> {
    const user = this.repository.findOne({ username });
    return user;
  }
}

export { UsersRepository };
