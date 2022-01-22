/* eslint-disable */
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1642776089575 implements MigrationInterface {
  name = "CreateTable1642776089575";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payments" ADD "userId" integer NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "userId"`);
  }
}
