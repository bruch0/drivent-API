import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1630436913710 implements MigrationInterface {
    name = "CreateDatabase1630436913710"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"enrollments\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"cpf\" character varying NOT NULL, \"birthday\" character varying NOT NULL, \"phone\" character varying NOT NULL, \"userId\" integer NOT NULL, CONSTRAINT \"UQ_409b735ec0a7fcc6c1a0dab2da2\" UNIQUE (\"cpf\"), CONSTRAINT \"PK_7c0f752f9fb68bf6ed7367ab00f\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"addresses\" (\"id\" SERIAL NOT NULL, \"cep\" character varying NOT NULL, \"street\" character varying NOT NULL, \"city\" character varying NOT NULL, \"number\" character varying NOT NULL, \"state\" character varying NOT NULL, \"neighborhood\" character varying NOT NULL, \"addressDetail\" character varying, \"enrollmentId\" integer NOT NULL, CONSTRAINT \"PK_745d8f43d3af10ab8247465e450\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"sessions\" (\"id\" SERIAL NOT NULL, \"userId\" integer NOT NULL, \"token\" character varying NOT NULL, CONSTRAINT \"PK_3238ef96f18b355b671619111bc\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"settings\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"value\" character varying NOT NULL, CONSTRAINT \"UQ_ca7857276d2a30f4dcfa0e42cd4\" UNIQUE (\"name\"), CONSTRAINT \"PK_0669fe20e252eb692bf4d344975\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"users\" (\"id\" SERIAL NOT NULL, \"email\" character varying NOT NULL, \"password\" character varying NOT NULL, \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_a3ffb1c0c8416b9fc6f907b7433\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"addresses\" ADD CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\" FOREIGN KEY (\"enrollmentId\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"addresses\" DROP CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\"");
      await queryRunner.query("DROP TABLE \"users\"");
      await queryRunner.query("DROP TABLE \"settings\"");
      await queryRunner.query("DROP TABLE \"sessions\"");
      await queryRunner.query("DROP TABLE \"addresses\"");
      await queryRunner.query("DROP TABLE \"enrollments\"");
    }
}
