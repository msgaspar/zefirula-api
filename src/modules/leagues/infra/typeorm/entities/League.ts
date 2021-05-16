import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Club } from '@modules/clubs/infra/typeorm/entities/Club';

@Entity('leagues')
class League {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @ManyToMany(() => Club)
  @JoinTable({
    name: 'leagues_clubs',
    joinColumns: [{ name: 'league_id' }],
    inverseJoinColumns: [{ name: 'club_id' }],
  })
  clubs: Club[];

  @CreateDateColumn()
  created_at: Date;

  constructor(name: string) {
    this.name = name;

    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { League };
