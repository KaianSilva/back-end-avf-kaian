import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class user1640044272258 implements MigrationInterface {
	private tabelaUsers: Table = new Table({
		name: "users",
		columns: [
			{
				name: "uid",
				type: "uuid",
				isPrimary: true,
				isNullable: false,
			},
			{
				name: "name",
				type: "varchar",
				length: "50",
				isNullable: false,
			},
			{
				name: "pass",
				type: "varchar",
				length: "100",
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
		],
	});

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(this.tabelaUsers);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("users");
	}
}
