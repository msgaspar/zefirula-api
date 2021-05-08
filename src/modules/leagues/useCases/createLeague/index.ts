import { LeaguesRepository } from '../../repositories/implementations/LeaguesRepository';
import { CreateLeagueController } from './CreateLeagueController';
import { CreateLeagueUseCase } from './CreateLeagueUseCase';

const leaguesRepository = LeaguesRepository.getInstance();

const createLeagueUseCase = new CreateLeagueUseCase(leaguesRepository);

const createLeagueController = new CreateLeagueController(createLeagueUseCase);

export { createLeagueController };
