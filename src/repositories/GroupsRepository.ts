import { Group } from '../model/Group';

interface ICreateCategoryDTO {
  name: string;
}

class GroupsRepository {
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
}

export { GroupsRepository };
