import { ICreateClubDTO } from '../dtos/ICreateClubDTO';
import { Club } from '../infra/typeorm/entities/Club';

interface IClubsRepository {
  create(data: ICreateClubDTO): Promise<Club>;
  save(club: Club): Promise<void>;
  findById(id: string): Promise<Club>;
  delete(id: string): Promise<void>;
  getAllClubIds(): Promise<string[]>;
}

export { IClubsRepository };
