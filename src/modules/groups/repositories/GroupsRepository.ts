import { Group } from '../model/Group';
import { IGroupsRepository } from './IGroupsRepository';

interface ICreateCategoryDTO {
  name: string;
}

class GroupsRepository implements IGroupsRepository {
  private groups: Group[];

  constructor() {
    this.groups = [];
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
