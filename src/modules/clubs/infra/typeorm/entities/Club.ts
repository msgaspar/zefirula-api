import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('clubs')
class Club {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  cartoleiro: string;

  @Column()
  badgeImageUrl: string;
}

export { Club };
