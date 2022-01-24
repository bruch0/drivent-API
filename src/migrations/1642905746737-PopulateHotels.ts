import { MigrationInterface, QueryRunner } from "typeorm";

export class PopulateHotels1642905746737 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO hotels
            (name, "roomTypes")
            VALUES
            ('plaza', 'single'),
            ('1 estrela e meia', 'uma ou duas pessoas')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM hotels
      `);
  }
}
