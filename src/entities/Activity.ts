import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("activities")
export default class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column()
  locale: string;

  @Column()
  vacancies: number;

  @Column()
  time: Date;

  static async getDates() {
    return this.find({ select: ["time"] });
  }
}
