import { MigrationInterface, QueryRunner } from "typeorm";

export class init1658015503586 implements MigrationInterface {
    name = "init1658015503586";

    public async up(_queryRunner: QueryRunner): Promise<void> {}

    public async down(_queryRunner: QueryRunner): Promise<void> {}
}
