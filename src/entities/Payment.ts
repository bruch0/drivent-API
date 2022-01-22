import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";
  
  @Entity("payments")
  export default class Payment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    ticket: string;
  
    @Column()
    hotel: boolean;

    @Column()
    value: number;

    @Column()
    userId: number;

    static async savePayment(ticket: string, hotel: boolean, value: number, userId: number) {
        const newData = this.create({ticket, hotel, value, userId});
        await newData.save();

        return newData;
    }

    static async getPayment(userId: number) {
        return await this.findOne(userId);
      }
  }