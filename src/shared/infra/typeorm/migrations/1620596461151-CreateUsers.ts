import { hash } from 'bcrypt';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class CreateUsers1620596461151 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'isAdmin',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    const hashedAdminPassword = await hash('admin', 8);

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users')
      .values({
        id: uuidv4(),
        name: 'Admin',
        username: 'admin',
        password: hashedAdminPassword,
        isAdmin: true,
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
