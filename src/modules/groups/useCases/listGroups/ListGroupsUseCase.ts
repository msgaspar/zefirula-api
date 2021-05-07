import { Group } from '../../model/Group';
import { IGroupsRepository } from '../../repositories/IGroupsRepository';

class ListGroupsUseCase {
  constructor(private groupsRepository: IGroupsRepository) {}

  execute(): Group[] {
    return this.groupsRepository.list();
  }
}

export { ListGroupsUseCase };
