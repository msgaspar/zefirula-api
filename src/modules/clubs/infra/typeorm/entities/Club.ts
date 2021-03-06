import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { League } from '@modules/leagues/infra/typeorm/entities/League';

import { Score } from './Score';

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

  @ManyToMany(() => League)
  @JoinTable({
    name: 'leagues_clubs',
    joinColumns: [{ name: 'club_id' }],
    inverseJoinColumns: [{ name: 'league_id' }],
  })
  leagues: League[];

  @OneToMany(() => Score, score => score.club)
  scores: Score[];

  @CreateDateColumn()
  created_at: Date;
}

export { Club };
