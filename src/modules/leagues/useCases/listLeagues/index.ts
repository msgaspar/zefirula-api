import { LeaguesRepository } from '../../repositories/implementations/LeaguesRepository';
import { ListLeaguesController } from './ListLeaguesController';
import { ListLeaguesUseCase } from './ListLeaguesUseCase';

const leaguesRepository = LeaguesRepository.getInstance();

const listLeaguesUseCase = new ListLeaguesUseCase(leaguesRepository);

const listLeaguesController = new ListLeaguesController(listLeaguesUseCase);

export { listLeaguesController };
