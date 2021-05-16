import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateLeaguesClubs1621085551219 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'leagues_clubs',
        columns: [
          {
            name: 'club_id',
            type: 'varchar',
          },
          {
            name: 'league_id',
            type: 'uuid',
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
      'leagues_clubs',
      new TableForeignKey({
        name: 'FKLeagueClub',
        referencedTableName: 'leagues',
        referencedColumnNames: ['id'],
        columnNames: ['league_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'leagues_clubs',
      new TableForeignKey({
        name: 'FKClubLeague',
        referencedTableName: 'clubs',
        referencedColumnNames: ['id'],
        columnNames: ['club_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('leagues_clubs', 'FKClubLeague');
    await queryRunner.dropForeignKey('leagues_clubs', 'FKLeagueClub');
    await queryRunner.dropTable('leagues_clubs');
  }
}
