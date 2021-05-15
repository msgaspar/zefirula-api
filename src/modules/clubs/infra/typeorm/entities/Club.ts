import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('clubs')
class Club {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  cartoleiro: string;

  @Column()
  badgeImgUrl: string;

  @CreateDateColumn()
  created_at: Date;
}

export { Club };
