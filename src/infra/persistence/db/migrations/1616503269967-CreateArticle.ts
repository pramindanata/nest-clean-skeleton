import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { TableName } from '../constant';

export class CreateArticle1616503269967 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.ARTICLE,
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'authorId',
            type: 'bigint',
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      TableName.ARTICLE,
      new TableForeignKey({
        columnNames: ['authorId'],
        referencedColumnNames: ['id'],
        referencedTableName: TableName.USER,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(TableName.ARTICLE);
    const authorFK = table!.foreignKeys.find(
      fk => fk.columnNames.indexOf('authorId') !== -1,
    );

    await queryRunner.dropForeignKey(TableName.ARTICLE, authorFK!);
    await queryRunner.dropTable(TableName.ARTICLE);
  }
}
