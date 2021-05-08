import { v4 as uuidv4 } from 'uuid';

class League {
  id?: string;
  name: string;
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
