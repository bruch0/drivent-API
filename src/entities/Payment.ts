import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("payments")
export default class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  hotel: boolean;

  @Column()
  ticket: string;

  @Column()
  value: number;

  @Column()
  userId: number;

  static async findByUserId(userId: number) {
    return await this.findOne({ where: { userId } });
  }
}
