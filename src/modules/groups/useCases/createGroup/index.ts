import { GroupsRepository } from '../../repositories/implementations/GroupsRepository';
import { CreateGroupController } from './CreateGroupController';
import { CreateGroupUseCase } from './CreateGroupUseCase';

const groupsRepository = GroupsRepository.getInstance();

const createGroupUseCase = new CreateGroupUseCase(groupsRepository);

const createGroupController = new CreateGroupController(createGroupUseCase);

export { createGroupController };
