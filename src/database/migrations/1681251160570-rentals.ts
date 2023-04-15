import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class rentals1681251160570 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "rentals",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()"
                },
                {
                    name: "movie_id",
                    type: "integer"
                },
                {
                    name: "user_id",
                    type: "uuid"
                },
                {
                    name: "rental_date",
                    type: "timestamp",
                    default: "now()"
                }
            ]
        }));

        await queryRunner.createForeignKey("rentals", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "SET NULL"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("rentals");

        const foreignKeyUser = table.foreignKeys.find(fk => fk.columnNames.indexOf("user_id") !== -1);
        await queryRunner.dropForeignKey("rentals", foreignKeyUser);

        await queryRunner.dropTable("rentals");
    }

}
