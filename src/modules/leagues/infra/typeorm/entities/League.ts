import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('leagues')
class League {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  constructor(name: string) {
    this.name = name;

    if (!this.id) {
      this.id = uuidv4();
    }

    this.created_at = new Date();
  }
}

export { League };
