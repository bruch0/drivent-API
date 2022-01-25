import { MigrationInterface, QueryRunner } from "typeorm";

export class PopulateHotels1642985382326 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO hotels
            (name, "roomTypes", "imageUrl")
            VALUES
            ('Driven Resort', 'Single e Double', 'https://www.figma.com/file/86TbwAX92S6xNIHrcd7s8S/image/1a0786cb36007928a6238281e78df947430ba082'),
            ('Driven Palace', 'Single, Double e Triple', 'https://www.figma.com/file/86TbwAX92S6xNIHrcd7s8S/image/5b125a65fde0b93cfb109046dc28030dbed532bd'),
            ('Driven World', 'Single e Double', 'https://www.figma.com/file/86TbwAX92S6xNIHrcd7s8S/image/4e384c22495f5bbbb11d530a43ac8c350e4c5d0f')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM hotels
        `);
  }
}
