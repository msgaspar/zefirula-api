import { ICreateClubDTO } from '../dtos/ICreateClubDTO';

interface IClubsRepository {
  create(data: ICreateClubDTO): Promise<void>;
}

export { IClubsRepository };
