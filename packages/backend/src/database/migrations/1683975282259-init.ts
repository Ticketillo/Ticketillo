import { MigrationInterface, QueryRunner } from "typeorm";

export class init1683975282259 implements MigrationInterface {
    name = 'init1683975282259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("address" character varying(255) NOT NULL, "name" character varying(64) NOT NULL, "description" text, "image" text, CONSTRAINT "PK_3122b4b8709577da50e89b68983" PRIMARY KEY ("address"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "address" character varying(255) NOT NULL, "name" character varying(64) NOT NULL, "data" text NOT NULL, "user" character varying(255), CONSTRAINT "PK_5848b0c7f896ea2ff4b4bc8294a" PRIMARY KEY ("id", "address"))`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_408fe1d464208fd095ce623df37" FOREIGN KEY ("user") REFERENCES "user"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_408fe1d464208fd095ce623df37"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
