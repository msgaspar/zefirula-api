import { GroupsRepository } from '../../repositories/implementations/GroupsRepository';
import { ListGroupsController } from './ListGroupsController';
import { ListGroupsUseCase } from './ListGroupsUseCase';

const groupsRepository = GroupsRepository.getInstance();

const listGroupsUseCase = new ListGroupsUseCase(groupsRepository);

const listGroupsController = new ListGroupsController(listGroupsUseCase);

export { listGroupsController };
