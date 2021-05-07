import { IGroupsRepository } from '../repositories/IGroupsRepository';

interface IRequest {
  name: string;
}

class CreateGroupsService {
  constructor(private groupsRepository: IGroupsRepository) {}

  execute({ name }: IRequest): void {
    const groupAlreadyExists = this.groupsRepository.findByName(name);

    if (groupAlreadyExists) {
      throw new Error('Group already exists');
    }

    this.groupsRepository.create({ name });
  }
}

export { CreateGroupsService };
