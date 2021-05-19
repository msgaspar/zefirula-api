import { getRepository, Repository } from 'typeorm';

import { IStatusParamsRepository } from '@modules/system/repositories/IStatusParamsRepository';

import { SystemStatusParam } from '../entities/SystemStatusParam';

class StatusParamsRepository implements IStatusParamsRepository {
  private repository: Repository<SystemStatusParam>;

  constructor() {
    this.repository = getRepository(SystemStatusParam);
  }

  async getParam(name: string): Promise<string> {
    return (await this.repository.findOne({ name }))?.value;
  }

  async setParam(name: string, value: string): Promise<void> {
    const param = this.repository.create({
      name,
      value,
    });
    await this.repository.save(param);
  }
}

export { StatusParamsRepository };
