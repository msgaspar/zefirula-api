import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateScores1621290232701 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'scores',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'club_id',
            type: 'varchar',
          },
          {
            name: 'round',
            type: 'integer',
          },
          {
            name: 'score',
            type: 'numeric',
          },
          {
            name: 'captain_score',
            type: 'numeric',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'scores',
      new TableForeignKey({
        name: 'FKClub',
        referencedTableName: 'clubs',
        referencedColumnNames: ['id'],
        columnNames: ['club_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('scores', 'FKClub');
    await queryRunner.dropTable('scores');
  }
}
