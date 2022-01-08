import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class messages1640045012374 implements MigrationInterface {
	private tableMessages: Table = new Table({
		name: "messages",
		columns: [
			{
				name: "uid",
				type: "uuid",
				isPrimary: true,
				isNullable: false,
			},
			{
				name: "title",
				type: "varchar",
				length: "100",
				isNullable: false,
			},
            {
				name: "description",
				type: "varchar",
				length: "200",
				isNullable: false,
			},
            {
				name: "created_at",
				type: "timestamp",
				isNullable: false,
			},
            {
				name: "updated_at",
				type: "timestamp",
				isNullable: false,
			},
            {
				name: "user_uid",
				type: "uuid",
				isNullable: false,
			}
		],
	});

	public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.tableMessages);

        await queryRunner.createForeignKey("messages", new TableForeignKey({
            columnNames: ["user_uid"],
            referencedColumnNames: ["uid"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));

    }

	public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('messages');
    }
}
