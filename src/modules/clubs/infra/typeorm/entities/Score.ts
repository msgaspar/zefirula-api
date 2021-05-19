import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Club } from './Club';

@Entity('scores')
class Score {
  @PrimaryColumn()
  id: string;

  @Column()
  club_id: string;

  @ManyToOne(() => Club)
  @JoinColumn({ name: 'club_id', referencedColumnName: 'id' })
  club: Club;

  @Column()
  round: number;

  @Column()
  score: number;

  @Column()
  captain_score: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Score };
