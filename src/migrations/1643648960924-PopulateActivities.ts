import { MigrationInterface, QueryRunner } from "typeorm";

export class PopulateActivities1643648960924 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO activities
        (name, duration, locale, vacancies, time)
        VALUES 
        ('Abertura', 1, 'Auditório Principal', 300, '2022-02-04 9:00:00'),
        ('Web 3.0 - A descentralização da internet', 1, 'Auditório Principal', 300, '2022-02-04 10:00:00'),
        ('O manual do código perfeito', 1, 'Auditório Lateral', 150, '2022-02-04 10:00:00'),
        ('Como montar seu computador: peças essenciais', 1, 'Sala de Workshop', 50, '2022-02-04 10:00:00'),
        ('Pensando TDD', 1, 'Auditório Principal', 300, '2022-02-05 9:00:00'),
        ('A importância do Pomodoro para seu o aprendizado', 2, 'Auditório Lateral', 150, '2022-02-05 10:00:00'),        
        ('Entenda as etapas do seu sono e durma melhor', 2, 'Sala de Workshop', 50, '2022-02-05 9:00:00'),
        ('NFT: Entenda de uma vez por todas o que são e como vivem', 1, 'Auditório Principal', 300, '2022-02-05 10:00:00'),
        ('Instalando o Linux: Passo à passo', 1, 'Auditório Lateral', 150, '2022-02-06 9:00:00'),
        ('Palestra com nutricionista: principais vilões do bodybuilding', 2, 'Sala de Workshop', 50, '2022-02-06 10:00:00'),
        ('Por que os programadores preferem Linux? Papo com dev sênior da Google', 2, 'Auditório Principal', 300, '2022-02-06 9:00:00'),
        ('Growth Mindset: O que é e como usar na sua vida', 1, 'Auditório Lateral', 150, '2022-02-06 10:00:00')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM activities
    `);
  }
}
