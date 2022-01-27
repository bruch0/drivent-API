import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateActivityEntity1643308645527 implements MigrationInterface {
    name = "CreateActivityEntity1643308645527"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"activities\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"duration\" integer NOT NULL, \"locale\" character varying NOT NULL, \"vacancies\" integer NOT NULL, \"time\" TIMESTAMP NOT NULL, CONSTRAINT \"PK_7f4004429f731ffb9c88eb486a8\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"user_activity\" (\"activityId\" integer NOT NULL, \"userId\" integer NOT NULL, CONSTRAINT \"PK_bc64ec9945b49e4d457cceedabc\" PRIMARY KEY (\"activityId\", \"userId\"))");
      await queryRunner.query("CREATE INDEX \"IDX_446e1be26a44682e157188c9b5\" ON \"user_activity\" (\"activityId\") ");
      await queryRunner.query("CREATE INDEX \"IDX_c8d8d7cfc6e3433e725339c952\" ON \"user_activity\" (\"userId\") ");
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_6713f297621b99988068dd63fe5\"");
      await queryRunner.query("ALTER TABLE \"bookings\" ALTER COLUMN \"hotelId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_6713f297621b99988068dd63fe5\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"user_activity\" ADD CONSTRAINT \"FK_446e1be26a44682e157188c9b5d\" FOREIGN KEY (\"activityId\") REFERENCES \"activities\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE");
      await queryRunner.query("ALTER TABLE \"user_activity\" ADD CONSTRAINT \"FK_c8d8d7cfc6e3433e725339c952b\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"user_activity\" DROP CONSTRAINT \"FK_c8d8d7cfc6e3433e725339c952b\"");
      await queryRunner.query("ALTER TABLE \"user_activity\" DROP CONSTRAINT \"FK_446e1be26a44682e157188c9b5d\"");
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_6713f297621b99988068dd63fe5\"");
      await queryRunner.query("ALTER TABLE \"bookings\" ALTER COLUMN \"hotelId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_6713f297621b99988068dd63fe5\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("DROP INDEX \"IDX_c8d8d7cfc6e3433e725339c952\"");
      await queryRunner.query("DROP INDEX \"IDX_446e1be26a44682e157188c9b5\"");
      await queryRunner.query("DROP TABLE \"user_activity\"");
      await queryRunner.query("DROP TABLE \"activities\"");
    }
}
