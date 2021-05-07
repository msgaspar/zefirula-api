import { Group } from '../model/Group';

interface ICreateGroupDTO {
  name: string;
}

interface IGroupsRepository {
  findByName(name: string): Group;
  list(): Group[];
  create({ name }: ICreateGroupDTO): void;
}

export { IGroupsRepository, ICreateGroupDTO };
