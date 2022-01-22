/* eslint-disable */
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1642775528484 implements MigrationInterface {
  name = "CreateTable1642775528484";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "hotel" SET DEFAULT false`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "hotel" DROP DEFAULT`);
  }
}
