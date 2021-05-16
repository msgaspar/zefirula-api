import { League } from '@modules/leagues/infra/typeorm/entities/League';

interface ICreateClubDTO {
  id: string;
  name: string;
  cartoleiro: string;
  badgeImgUrl: string;
  leagues?: League[];
}

export { ICreateClubDTO };
