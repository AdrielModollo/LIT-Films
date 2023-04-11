import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Movies1681242687515 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "movies",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()"
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "description",
                    type: "text"
                },
                {
                    name: "year",
                    type: "int"
                },
                {
                    name: "author",
                    type: "varchar"
                },
                {
                    name: "genre",
                    type: "varchar"
                },
                {
                    name: "available",
                    type: "boolean",
                    default: true
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "deletedAt",
                    type: "timestamp",
                    isNullable: true
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("movies");
    }
}




