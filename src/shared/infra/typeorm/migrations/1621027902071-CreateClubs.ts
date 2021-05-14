import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClubs1621027902071 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clubs',
        columns: [
          {
            name: 'id',
            type: 'varchar(10)',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cartoleiro',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'badgeImgUrl',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clubs');
  }
}
