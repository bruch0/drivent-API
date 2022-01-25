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

  static async savePayment(ticket: string, hotel: boolean, value: number, userId: number) {
    const newData = this.create({ ticket, hotel, value, userId });
    await newData.save();

    return newData;
  }
}
