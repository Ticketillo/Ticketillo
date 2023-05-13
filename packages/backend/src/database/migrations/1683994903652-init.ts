import { MigrationInterface, QueryRunner } from "typeorm";

export class init1683994903652 implements MigrationInterface {
    name = 'init1683994903652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("address" character varying(255) NOT NULL, "name" character varying(64) NOT NULL, "description" text, "image" text, CONSTRAINT "PK_3122b4b8709577da50e89b68983" PRIMARY KEY ("address"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "address" character varying(64), "name" character varying(64) NOT NULL, "data" text NOT NULL, "creator_address" character varying(255), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_f66dbd83cf1c393f08c4c4af99d" FOREIGN KEY ("creator_address") REFERENCES "user"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_f66dbd83cf1c393f08c4c4af99d"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
