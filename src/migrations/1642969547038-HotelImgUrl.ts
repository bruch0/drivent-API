/* eslint-disable */
import { MigrationInterface, QueryRunner } from "typeorm";

export class HotelImgUrl1642969547038 implements MigrationInterface {
  name = "HotelImgUrl1642969547038";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "hotels" ADD "imageUrl" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "imageUrl"`);
  }
}
