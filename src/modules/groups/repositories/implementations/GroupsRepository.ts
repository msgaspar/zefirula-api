import { Group } from '../../model/Group';
import { IGroupsRepository } from '../IGroupsRepository';

interface ICreateCategoryDTO {
  name: string;
}

class GroupsRepository implements IGroupsRepository {
  private groups: Group[];

  private static INSTANCE: GroupsRepository;

  private constructor() {
    this.groups = [];
  }

  public static getInstance(): GroupsRepository {
    if (!GroupsRepository.INSTANCE) {
      GroupsRepository.INSTANCE = new GroupsRepository();
    }
    return GroupsRepository.INSTANCE;
  }

  create({ name }: ICreateCategoryDTO): Group {
    const group = new Group(name);

    this.groups.push(group);

    return group;
  }

  list(): Group[] {
    return this.groups;
  }

  findByName(name: string): Group {
    const group = this.groups.find(group => group.name === name);
    return group;
  }
}

export { GroupsRepository };
